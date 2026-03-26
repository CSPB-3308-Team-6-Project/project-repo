'use client' //required at the top of any interactive component

import { Button } from '@mantine/core'

// Defines the shape of the props in TypeScript.
// All props are optional, with default values provided for label, disabled, and loading.
interface CreateButtonProps {
    onClick?: () => void
    label?: string
    disabled?: boolean
    loading?: boolean
}

// Use built in Mantine Button component to create a reusable CreateButton component 
// that accepts props for onClick, label, disabled, and loading states. The button will 
// display the provided label or default to "Create entry" if no label is given. 
// It will also handle disabled and loading states appropriately.
export function CreateButton({
    onClick, 
    label = 'Create entry', // Default label if none is provided
    disabled = false, 
    loading = false,
}: CreateButtonProps) {
    return (
        <Button onClick={onClick} disabled={disabled} loading={loading}>
            {label}
        </Button>
    )
}