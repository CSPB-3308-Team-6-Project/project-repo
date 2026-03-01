// use client at top
// state should be one of idle, loading, success, or error
// renders a heading "Create New Entry"
// renders a CreateButton component
// clicking the CreateButton sends a POST request to /api/entries with a sample title and content
// displays a success message when the POST request is successful

'use client' //required at the top of any interactive component

import { useState } from 'react'
import { CreateButton } from '../components/createButton'
export default function CreateEntryPage() {
    const [state, setState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
    const handleCreate = async () => {
        setState('loading')
        try {
            const response = await fetch('/api/entries', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title: 'Sample Title', content: 'Sample Content' }),
            })
            const data = await response.json()
            if (data.success) {
                setState('success')
            } else {
                setState('error')
            }
        } catch (error) {
            setState('error')
        }
    }
    return (
        <div>
            <h1>Create New Entry</h1>
            <CreateButton onClick={handleCreate} disabled={state === 'loading'} loading={state === 'loading'} />
            {state === 'success' && <p>Entry created successfully</p>}
            {state === 'error' && <p>Failed to create entry</p>}
        </div>
    )
}