'use client' //this is a client component page

import { useState, useEffect } from 'react'
import { Title, Stack, Group, Card, Button, TextInput, NumberInput, Select, Text} from '@mantine/core'
// Import server action for creating an entry, edit entry, delete entry, and get entries. These functions are defined in actions.ts and handle API calls to the backend
import { createEntry, updateEntry, deleteEntry, getEntries } from './actions';

export default function MoodListPage() {
  //useState is a react hook that create a stateful variable. It takes an initial value and returns the current value and a function to update it
  const [entries, setEntries] = useState<{ id: string; rating: number; emotion: string; recordedAt: Date }[]>([])
  const [newDate, setNewDate] = useState('')
  const [newEmotion, setNewEmotion] = useState('')
  const [newRating, setNewRating] = useState('')
  const [editingID, setEditingID] = useState<string | null>(null)
  const [editDate, setEditDate] = useState('')
  const [editEmotion, setEditEmotion] = useState('')
  const [editRating, setEditRating] = useState('')
  const [state, setState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [sortBy, setSortBy] = useState<'date' | 'emotion' | 'rating'>('date')

  // load Entries- call getEntries(), updates entries state
  const loadEntries = async() => {
    const result = await getEntries()
    if (result.success) {
      setEntries(result.data.map((entry: any) => ({
        id: entry.id,
        rating: entry.rating,
        emotion: entry.emotion,
        recordedAt: entry.recordedAt
      })))
    }
  }
  // useEffect runs code AFTER the component renders. The empty array [] means only run when the page loads, not on every re-render. Ensures no infinite loop
  useEffect(() => {
    loadEntries()
  }, [])
  // handle Create- call createEntry(), then reloads entries
  const handleCreate = async () => {
    setState('loading')
    try {
      const result = await createEntry({ date: newDate, emotion: newEmotion, rating: Number(newRating) })
      console.log('createEntry results:', result)
      if (result.success) {
        //clear three form fields
        setNewDate('')
        setNewEmotion('')
        setNewRating('')
        loadEntries()
        setState('success')
      } 
      else {
        setState('error')
      }
    } 
    catch (error) {
      setState('error')
    }
  }
  // handle Edit- sets editingID and populates edit fields with entry's current values
  const handleEdit = (entry: any) => {
    setEditingID(entry.id)
    setEditDate(new Date(entry.recordedAt).toISOString().split('T')[0])
    setEditRating(String(entry.rating))
    setEditEmotion(entry.emotion)
  }
  // handle Save- calls updateEntry(), clears edit state, reloads entries
  const handleSave = async () => {
    if (!editingID) return //stops function if no editing ID
    setState('loading')
    try {
      const result = await updateEntry({ id: editingID, rating: Number(editRating), emotion: editEmotion, date: editDate })
      if (result.success) {
        //clear three form fields
        setEditingID(null)
        loadEntries()
        setState('success')
      } 
      else {
        setState('error')
      }
    } 
    catch (error) {
      setState('error')
    }
  }
  // handle Delete- calls window.confirm, then calls deleteEntry and reloads entries
  const handleDelete = async (id: string) => {
    const confirmed = window.confirm('Are you sure you want to delete this entry?')
    if (confirmed) {
      await deleteEntry(id)
      await loadEntries()
    }
  }

  const sortedEntries = [...entries].sort((a, b) => {
    if (sortBy === 'date') return new Date(b.recordedAt).getTime() - new Date(a.recordedAt).getTime()
    if (sortBy === 'emotion') return a.emotion.localeCompare(b.emotion)
    if (sortBy === 'rating') return b.rating - a.rating
    return 0
  })


  // Return statement will render the new entry form and the entries list
  return (
    <div>
        <Title order={1} mb="md">My Emotion Tracker</Title>

        <Card shadow="sm" padding="lg" withBorder mb="xl">
            <Title order={3} mb="md">New Entry</Title>
            <Stack>
                <TextInput
                    type="date"
                    label="Date"
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                />
                <Select
                    label="Emotion"
                    placeholder="Select a mood"
                    value={newEmotion}
                    onChange={(val) => setNewEmotion(val ?? '')}
                    data={['Angry', 'Excited', 'Lonely', 'Restful']}
                />
                <NumberInput
                    label="Rating (1-10)"
                    min={1}
                    max={10}
                    value={newRating}
                    onChange={(val) => setNewRating(String(val))}
                />
                <Button onClick={handleCreate} disabled={state === 'loading'}>
                    Create
                </Button>
            </Stack>
        </Card>

        <Group justify="space-between" mb="md">
        <Title order={3}>Your Entries</Title>
          <Select
            label="Sort by"
            value={sortBy}
            onChange={(val) => setSortBy(val as 'date' | 'emotion' | 'rating')}
            data={[
              { value: 'date', label: 'Date' },
              { value: 'emotion', label: 'Emotion' },
              { value: 'rating', label: 'Intensity' },
          ]}
            w={150}
          />
        </Group>

        <Stack>
            {sortedEntries.map((entry) => (
                <Card key={entry.id} shadow="sm" padding="lg" withBorder>
                    {editingID === entry.id ? (
                        <Stack>
                            <TextInput
                                type="date"
                                label="Date"
                                value={editDate}
                                onChange={(e) => setEditDate(e.target.value)}
                            />
                            <Select
                                label="Emotion"
                                placeholder="Select a mood"
                                value={editEmotion}
                                onChange={(val) => setEditEmotion(val ?? '')}
                                data={['Angry', 'Excited', 'Lonely', 'Restful']}
                            />
                            <NumberInput
                                label="Rating (1-10)"
                                min={1}
                                max={10}
                                value={editRating}
                                onChange={(val) => setEditRating(String(val))}
                            />
                            <Button onClick={handleSave} disabled={state === 'loading'}>
                                Save
                            </Button>
                        </Stack>
                    ) : (
                        <Group justify="space-between">
                            <Stack gap={4}>
                                <Text fw={600}>{entry.emotion}</Text>
                                <Text c="dimmed" size="sm">{new Date(entry.recordedAt).toISOString().split('T')[0]}</Text>
                                <Text size="sm">Rating: {entry.rating} / 10</Text>
                            </Stack>
                            <Group>
                                <Button variant="outline" onClick={() => handleEdit(entry)}>Edit</Button>
                                <Button color="red" variant="outline" onClick={() => handleDelete(entry.id)}>Delete</Button>
                            </Group>
                        </Group>
                    )}
                </Card>
            ))}
        </Stack>
    </div>
)
}