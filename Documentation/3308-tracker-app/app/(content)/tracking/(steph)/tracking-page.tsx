'use client' //this is a client component page

import { useState } from 'react'
import { Title, Stack, Group, Card, Button, TextInput, NumberInput, Select, Text, ScrollArea } from '@mantine/core'
// Import server action for creating an entry, edit entry, delete entry, and get entries. These functions are defined in actions.ts and handle API calls to the backend
import { updateEntry, deleteEntry } from './list/actions';
import { ITracker } from '@/types/tracker/tracker';
import { ITrackerPost } from '@/types/tracker/tracker-post';
import { IUser } from '@/types/user/user';
import { LogMoodModal } from './create/components/createButton';
import { Emotion } from '@/lib/generated/prisma/enums';
import { colors } from '@/lib/color-scheme';

export default function TrackingPage({ userInfo, trackerInfo, trackerPosts }: { userInfo: IUser | null, trackerInfo: ITracker[] | null, trackerPosts: ITrackerPost[] }) {
  console.log('trackerInfo:', trackerInfo);
  //useState is a react hook that create a stateful variable. It takes an initial value and returns the current value and a function to update it
  //const [entries, setEntries] = useState<{ id: string; rating: number; emotion: string; recordedAt: Date }[]>([])
  const [editingPost, setEditingPost] = useState<ITrackerPost | null>(null)
  const [state, setState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [sortBy, setSortBy] = useState<'date' | 'emotion' | 'rating'>('date')

  // load Entries- call getEntries(), updates entries state
  // const loadEntries = async () => {
  //   const result = await getEntries()
  //   if (result.success) {
  //     setEntries(result.data.map((entry: any) => ({
  //       id: entry.id,
  //       rating: entry.rating,
  //       emotion: entry.emotion,
  //       recordedAt: entry.recordedAt
  //     })))
  //   }
  // }
  // useEffect runs code AFTER the component renders. The empty array [] means only run when the page loads, not on every re-render. Ensures no infinite loop
  // useEffect(() => {
  //   loadEntries()
  // }, [])
  // handle Create- call createEntry(), then reloads entries

  // handle Edit- sets editingID and populates edit fields with entry's current values
  const handleEdit = (entry: any) => {
    setEditingPost({
      id: entry.id,
      rating: entry.rating,
      emotion: entry.emotion,
      recordedAt: entry.recordedAt
    })
  }
  // handle Save- calls updateEntry(), clears edit state, reloads entries
  const handleSave = async () => {
    if (!editingPost) return //stops function if no editing ID
    setState('loading')
    try {
      const result = await updateEntry({ id: editingPost.id, rating: Number(editingPost.rating), emotion: editingPost.emotion, date: editingPost.recordedAt })
      if (result.success) {
        //clear three form fields
        setEditingPost(null)
        //loadEntries()
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
    if (!userInfo) {
      window.alert('You must be logged in to delete an entry.')
      return
    }
    const confirmed = window.confirm('Are you sure you want to delete this entry?')
    if (confirmed) {
      await deleteEntry(id)
      //await loadEntries()
    }
  }

  // const sortedEntries = [...entries].sort((a, b) => {
  //   if (sortBy === 'date') return new Date(b.recordedAt).getTime() - new Date(a.recordedAt).getTime()
  //   if (sortBy === 'emotion') return a.emotion.localeCompare(b.emotion)
  //   if (sortBy === 'rating') return b.rating - a.rating
  //   return 0
  // })


  // Return statement will render the new entry form and the entries list
  return (

    <div className='gap-4 h-full overflow-hidden flex flex-col justify-start items-center rounded-md p-1 w-full'>

      <Group justify="space-between" mb="md" w={'100%'}>
        <div className='flex flex-row justify-between items-end px-4 w-full'>
          <div className='flex flex-col justify-end items-start gap-2'>
            <Title order={3} className='underline' c={colors.textPrimary}>Your Entries</Title>
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
              styles={{
                input: { backgroundColor: colors.input, color: colors.textPrimary, borderColor: colors.inputBorder },
                label: { color: colors.label }
              }}
            />
          </div>

          <LogMoodModal trackers={trackerInfo} userInfo={userInfo} buttonWidth={''} size={''} />
        </div>
      </Group>

      <Stack w={'100%'} align="center">
        <ScrollArea h={'65dvh'} w={'100%'} type="auto" scrollbarSize={8} classNames={{ root: 'w-full', viewport: 'w-full' }}>
          <div 
            className='gap-4 z-3 flex flex-col justify-start items-center rounded-md p-4 w-full min-h-[65dvh]' 
            style={{ 
              backgroundColor: colors.sectionInner,
              boxShadow: `inset 0 4px 12px rgba(0, 0, 0, 0.6), inset 0 -4px 12px rgba(0, 0, 0, 0.6), inset 0 0 0 1px ${colors.divider}`,
              border: `1px solid ${colors.divider}`
            }}
          >
            {(trackerPosts && trackerPosts.length > 0) ? trackerPosts.sort((a, b) => {
              if (sortBy === 'date') return new Date(b.recordedAt).getTime() - new Date(a.recordedAt).getTime()
              if (sortBy === 'emotion') return a.emotion.localeCompare(b.emotion)
              if (sortBy === 'rating') return b.rating - a.rating
              return 0
            }).map((entry) => (
              <Card key={entry.id} shadow="sm" padding="lg" withBorder w={'100%'} h={'fit-content'} className="flex flex-col justify-between" bg={colors.card}>
                {editingPost?.id === entry.id ? (
                  <Stack>
                    <TextInput
                      type="date"
                      label="Date"
                      value={editingPost.recordedAt.toISOString().split('T')[0]}
                      onChange={(e) => {
                        if (editingPost) {
                          setEditingPost({
                            ...editingPost,
                            recordedAt: new Date(e.target.value)
                          })
                        }
                      }}
                      styles={{
                        input: { backgroundColor: colors.input, color: colors.textPrimary, borderColor: colors.inputBorder },
                        label: { color: colors.label }
                      }}
                    />
                    <Select
                      label="Emotion"
                      placeholder="Select a mood"
                      value={editingPost.emotion}
                      onChange={(val) => {
                        if (editingPost) {
                          if (val && val in Emotion) {
                            setEditingPost({
                              ...editingPost,
                              emotion: val as Emotion
                            })
                          }
                        }
                      }}
                      data={['Angry', 'Excited', 'Lonely', 'Restful']}
                      styles={{
                        input: { backgroundColor: colors.input, color: colors.textPrimary, borderColor: colors.inputBorder },
                        label: { color: colors.label }
                      }}
                    />
                    <NumberInput
                      label="Rating (1-10)"
                      min={1}
                      max={10}
                      value={editingPost.rating}
                      onChange={(val) => setEditingPost({
                        ...editingPost,
                        rating: val ? Number(val) : 0
                      })}
                      styles={{
                        input: { backgroundColor: colors.input, color: colors.textPrimary, borderColor: colors.inputBorder },
                        label: { color: colors.label }
                      }}
                    />
                    <Button onClick={handleSave} disabled={state === 'loading'} color={colors.buttonSubmit}>
                      Save
                    </Button>
                  </Stack>
                ) : (
                  <Group justify="space-between">
                    <Stack gap={4}>
                      <Text fw={600} c={colors.textPrimary}>{entry.emotion}</Text>
                      <Text c={colors.textSecondary} size="sm">{new Date(entry.recordedAt).toISOString().split('T')[0]}</Text>
                      <Text size="sm" c={colors.textPrimary}>Rating: {entry.rating} / 10</Text>
                    </Stack>
                    <Group>
                      <Button variant="outline" onClick={() => handleEdit(entry)} color={colors.buttonEdit}>Edit</Button>
                      <Button color={colors.buttonDelete} variant="outline" onClick={() => handleDelete(entry.id)}>Delete</Button>
                    </Group>
                  </Group>
                )}
              </Card>
            )) : (
              <Text c={colors.textSecondary} pt="md">No entries yet. Log your mood to see it here!</Text>
            )}
          </div>
        </ScrollArea>
      </Stack>
    </div>
  )
}


// <Title order={1} mb="md">My Emotion Tracker</Title>

//         <Card shadow="sm" padding="lg" withBorder mb="xl">
//             <Title order={3} mb="md">New Entry</Title>
//             <Stack>
//                 <TextInput
//                     type="date"
//                     label="Date"
//                     value={newDate}
//                     onChange={(e) => setNewDate(e.target.value)}
//                 />
//                 <Select
//                     label="Emotion"
//                     placeholder="Select a mood"
//                     value={newEmotion}
//                     onChange={(val) => setNewEmotion(val ?? '')}
//                     data={['Angry', 'Excited', 'Lonely', 'Restful']}
//                 />
//                 <NumberInput
//                     label="Rating (1-10)"
//                     min={1}
//                     max={10}
//                     value={newRating}
//                     onChange={(val) => setNewRating(String(val))}
//                 />
//                 <Button onClick={handleCreate} disabled={state === 'loading'}>
//                     Create
//                 </Button>
//             </Stack>
//         </Card>