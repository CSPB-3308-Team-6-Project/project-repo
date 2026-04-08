'use client'
import { useState } from 'react'
import { Modal, Button, Select, NumberInput, Stack, Text } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { createEntry } from '../actions'

export function LogMoodModal() {
  const [opened, { open, close }] = useDisclosure(false)
  const [state, setState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [emotion, setEmotion] = useState('')
  const [rating, setRating] = useState<string | number>('')

  const handleCreate = async () => {
    setState('loading')
    try {
      const result = await createEntry({ rating: Number(rating), emotion })
      setState(result.success ? 'success' : 'error')
    } catch {
      setState('error')
    }
  }

  const handleClose = () => {
    close()
    setState('idle')
    setEmotion('')
    setRating('')
  }

  return (
    <>
      <Button onClick={open}>Go to Log Mood</Button>

      <Modal opened={opened} onClose={handleClose} title="Log a Mood" centered>
        {state === 'success' ? (
          <Stack>
            <Text c="green">Mood logged successfully!</Text>
            <Button onClick={handleClose}>OK</Button>
          </Stack>
        ) : (
          <Stack>
            <Select
              label="Emotion"
              placeholder="Select a mood"
              value={emotion}
              onChange={(val) => setEmotion(val ?? '')}
              data={['Angry', 'Excited', 'Lonely', 'Restful']}
            />
            <NumberInput
              label="Rating (1–10)"
              min={1}
              max={10}
              value={rating}
              onChange={setRating}
            />
            {state === 'error' && <Text c="red">Failed to log mood. Try again.</Text>}
            <Button onClick={handleCreate} loading={state === 'loading'} disabled={state === 'loading'}>
              Submit
            </Button>
          </Stack>
        )}
      </Modal>
    </>
  )
}
