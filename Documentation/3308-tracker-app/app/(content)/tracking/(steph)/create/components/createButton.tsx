'use client'
import { useState } from 'react'
import { Modal, Button, Select, NumberInput, Stack, Text, LoadingOverlay } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { createEntry } from '../actions'
import { useForm } from '@mantine/form'
import { DatePickerInput } from '@mantine/dates';
import { ITracker } from '@/types/tracker/tracker'
import { IUser } from '@/types/user/user'
import { colors } from '@/lib/color-scheme';

export function LogMoodModal({  trackers, userInfo, buttonWidth, size }: { trackers: ITracker[] | null, userInfo: IUser | null, buttonWidth: string, size: '' | 'lg' }) {

  const [opened, { open, close }] = useDisclosure(false)
  const [state, setState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const logForm = useForm({
    mode: 'uncontrolled',
    initialValues: {
      date: new Date(),
      emotion: '',
      rating: 0,
    },
    validate: {
      date: (value) => (!value ? 'Date is required' : null),
      emotion: (value) => (!value ? 'Emotion is required' : null),
      rating: (value) => (value < 1 || value > 10 ? 'Rating must be between 1 and 10' : null),
    },
  })

  const handleCreate = async () => {
    setState('loading')
    logForm.clearErrors()

    if (!userInfo) {
      setState('error')
      console.log('No user email found in session')
      return
    }

    const validate = logForm.validate()
    if (validate.hasErrors) {
      logForm.setErrors(validate.errors)
      setState('idle')
      return
    }

    const values = logForm.getValues()

    if (!values) {
      setState('idle')
      return
    }

    try {
      const result = await createEntry({ rating: values.rating, emotion: values.emotion, date: values.date, email: userInfo?.email, trackers: trackers })
      if (!result || !result.success) {
        console.log('Failed to create entry', result.success)
        setState('error')
        return
      }

      setState('success')
      handleClose()
    } catch (e: any) {
      console.log('Failed to create entry', e)
      setState('error')
    }
  }

  const handleClose = () => {
    close()
    setState('idle')
    logForm.reset()
  }

  return (
    <>
      <Button onClick={open} color={colors.buttonSubmit} w={buttonWidth} size={size}>Log Mood</Button>

      <Modal opened={opened} onClose={handleClose} title="Log a Mood" centered styles={{
        content: { backgroundColor: colors.card },
        header: { backgroundColor: colors.card },
        title: { color: colors.textPrimary }
      }}>
        <>
          <LoadingOverlay visible={state === 'loading'} />
          {state === 'success' ? (
            <Stack>
              <Text c="green">Mood logged successfully!</Text>
              <Button onClick={handleClose} color={colors.buttonSubmit}>OK</Button>
            </Stack>
          ) : (
            <Stack>
              <DatePickerInput
                label="Date"
                key={'date-picker'}
                {...logForm.getInputProps('date')}
                styles={{
                  input: { backgroundColor: colors.input, color: colors.textPrimary, borderColor: colors.inputBorder },
                  label: { color: colors.label }
                }}
              />
              <Select
                label="Emotion"
                placeholder="Select a mood"
                key={'emotion-select'}
                data={['Angry', 'Excited', 'Lonely', 'Restful']}
                {...logForm.getInputProps('emotion')}
                styles={{
                  input: { backgroundColor: colors.input, color: colors.textPrimary, borderColor: colors.inputBorder },
                  label: { color: colors.label }
                }}
              />
              <NumberInput
                label="Rating (1–10)"
                min={1}
                max={10}
                key={'rating-input'}
                {...logForm.getInputProps('rating')}
                styles={{
                  input: { backgroundColor: colors.input, color: colors.textPrimary, borderColor: colors.inputBorder },
                  label: { color: colors.label }
                }}
              />
              {state === 'error' && <Text c="red">Failed to log mood. Try again.</Text>}
              <Button onClick={handleCreate} loading={state === 'loading'} disabled={state === 'loading' || !logForm.getDirty()} color={colors.buttonSubmit}>
                Submit
              </Button>
            </Stack>
          )}
        </>
      </Modal>
    </>
  )
}
