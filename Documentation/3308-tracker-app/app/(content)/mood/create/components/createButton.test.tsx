// Test renders with the default label "Create entry"
// Test renders with a custom label when label prop is passed
// Test calls the onClick handler when clicked
// Renders as disabled when the disabled prop is true

import { render, screen } from '@/app/test-utils'
import userEvent from '@testing-library/user-event'
import { CreateButton } from './createButton'

describe('CreateButton', () => {
    it('renders with the default label', () => {
        render(<CreateButton />)
        expect(screen.getByRole('button', { name: 'Create entry' })).toBeInTheDocument()
    })

    it('renders with a custom label', () => {
        render(<CreateButton label="Create new entry" />)
        expect(screen.getByRole('button', { name: 'Create new entry' })).toBeInTheDocument()
    })

    it('calls the onClick handler when clicked', async () => {
        const user = userEvent.setup()
        const handleClick = vi.fn()

        render(<CreateButton onClick={handleClick} />)
        await user.click(screen.getByRole('button', { name: 'Create entry' }))
        expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('does not call onClick handler when disabled', async () => {
        const user = userEvent.setup()
        const handleClick = vi.fn()

        render(<CreateButton onClick={handleClick} disabled />)
        await user.click(screen.getByRole('button', { name: 'Create entry' }))
        expect(handleClick).not.toHaveBeenCalled()
    })
})