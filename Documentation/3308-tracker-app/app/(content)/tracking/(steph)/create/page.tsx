// CreateEntryPage
// - client component
// - manages state: idle | loading | success | error
// - renders heading and description
// - renders CreateButton
// - clicking CreateButton triggers entry creation logic
// - displays success or error message

'use client' //required at the top of any interactive component
import { href } from '../../../../../lib/url-helper';

import { useState } from 'react'
import { CreateButton } from './components/createButton'
import Link from 'next/link'
import { createEntry } from './actions' // Import server action for creating an entry
export default function CreateEntryPage() {
    const [state, setState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
    const [emotion, setEmotion] = useState('')
    const [val, setVal] = useState('')

    const handleCreate = async () => {
        setState('loading')
        try {
            const result = await createEntry({ rating: Number(val), emotion: emotion })
            if (result.success) {
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
            <p>Create a new mood entry.</p>
            <label htmlFor="emotion">Emotion:</label>
            <select id="emotion" name="emotion" value={emotion} onChange={(e) => setEmotion(e.target.value)}>
                <option value="">Select a mood</option>
                <option value="Angry">Angry</option>
                <option value="Excited">Excited</option>
                <option value="Lonely">Lonely</option>
                <option value="Restful">Restful</option>
            </select>

            <label htmlFor="value">Value:</label>
            <input id="value" name="val" type="number" value={val} onChange={(e) => setVal(e.target.value)} />
            <CreateButton onClick={handleCreate} disabled={state === 'loading'} loading={state === 'loading'} />
            {state === 'success' && <p>Entry created successfully</p>}
            {state === 'error' && <p>Failed to create entry</p>}
            <Link href={href('/')}>
                Homepage
            </Link>
        </div>
    )
}
    