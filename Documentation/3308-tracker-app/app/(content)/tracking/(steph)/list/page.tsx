'use client' //this is a client component page

import { useState, useEffect } from 'react'
import { createEntry } from '../create/actions' // Import server action for creating an entry
import { updateEntry, deleteEntry, getEntries } from './actions';

export default function MoodListPage() {
  //useState is a react hook that create a stateful variable. It takes an initial value and returns the current value and a function to update it
  const [entries, setEntries] = useState<{ id: string; val: number; emotion: string; recordedAt: Date }[]>([])
  const [newDate, setNewDate] = useState('')
  const [newEmotion, setNewEmotion] = useState('')
  const [newVal, setNewVal] = useState('')
  const [editingID, setEditingID] = useState<string | null>(null)
  const [editDate, setEditDate] = useState('')
  const [editEmotion, setEditEmotion] = useState('')
  const [editVal, setEditVal] = useState('')
  const [state, setState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  // load Entries- call getEntries(), updates entries state
  const loadEntries = async() => {
    const result = await getEntries()
    if (result.success) {
      setEntries(result.data)
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
      const result = await createEntry({ date: newDate, emotion: newEmotion, val: Number(newVal) })
      console.log('createEntry results:', result)
      if (result.success) {
        //clear three form fields
        setNewDate('')
        setNewEmotion('')
        setNewVal('')
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
    setEditVal(String(entry.val))
    setEditEmotion(entry.emotion)
  }
  // handle Save- calls updateEntry(), clears edit state, reloads entries
  const handleSave = async () => {
    if (!editingID) return //stops function if no editing ID
    setState('loading')
    try {
      const result = await updateEntry({ id: editingID, val: Number(editVal), emotion: editEmotion, date: editDate })
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

  // Return statement will render the new entry form and the entries list
  return (
    <div>
      <h1>My Emotion Tracker</h1>
    <div>
      <h2>New Entry</h2>
      <input type="date" value={newDate} onChange={(e) => setNewDate(e.target.value)} />
      <select value={newEmotion} onChange={(e) => setNewEmotion(e.target.value)}>
        <option value="">Select a mood</option>
        <option value="Angry">Angry</option>
        <option value="Excited">Excited</option>
        <option value="Lonely">Lonely</option>
        <option value="Restful">Restful</option>
      </select>
      <input type="number" min={1} max={10} value={newVal} onChange={(e) => setNewVal(e.target.value)} />
      <button onClick={handleCreate} disabled={state === 'loading'}>Create</button>
    </div>
    <div>
      <h2>Edit Entry</h2>
      {entries.map((entry) => (
        <div key={entry.id}>
          {editingID === entry.id ? (
            <>
            <input type="date" value={editDate} onChange={(e) => setEditDate(e.target.value)} />
            <select value={editEmotion} onChange={(e) => setEditEmotion(e.target.value)}>
              <option value="">Select a mood</option>
              <option value="Angry">Angry</option>
              <option value="Excited">Excited</option>
              <option value="Lonely">Lonely</option>
              <option value="Restful">Restful</option>
            </select>
            <input type="number" min={1} max={10} value={editVal} onChange={(e) => setEditVal(e.target.value)} />
            <button onClick={handleSave} disabled={state === 'loading'}>Save</button>
          </>
          ) : (
            <>
              <p>{new Date(entry.recordedAt).toISOString().split('T')[0]}</p>
              <p>{entry.emotion}</p>
              <p>{entry.val}</p>
              <button onClick={() => handleEdit(entry)}>Edit</button>
              <button onClick={() => handleDelete(entry.id)}>Delete</button>
            </>
          )}
        </div>
      ))}
      </div>
    </div>
  )
}