// Tests
// renders an h1 with "Create New Entry"
// renders a CreateButton component

vi.mock('./actions', () => ({
    createEntry: vi.fn().mockResolvedValue({ success: true }),
}))

import { render, screen, waitFor } from '@/app/test-utils'
import CreateEntryPage from './page'
import userEvent from '@testing-library/user-event'

describe('CreateEntryPage', () => {
    it('renders the page with a heading and a CreateButton', () => {
        render(<CreateEntryPage />)
        expect(screen.getByRole('heading', { name: 'Create New Entry' })).toBeInTheDocument()
        expect(screen.getByRole('button', { name: 'Create entry' })).toBeInTheDocument()
    })
    it('renders a page description', () => {
        render(<CreateEntryPage />)
        expect(screen.getByText('Create a new mood entry.')).toBeInTheDocument()
    })
    it('CreateButton is enabled on initial render', () => {
        render(<CreateEntryPage />)
        const button = screen.getByRole('button', { name: 'Create entry' })
        expect(button).toBeEnabled()
    })
    it('disables the CreateButton while loading after click', async () => {
        const { createEntry } = await import('./actions')
        vi.mocked(createEntry).mockReturnValue(new Promise(() => {})) //never resolves to simulate loading state
        const user = userEvent.setup()
        render(<CreateEntryPage />)
        const button = screen.getByRole('button', { name: 'Create entry' })
        await user.click(button)
        expect(button).toBeDisabled()
    })
    it('renders an emotion input', () => {
        render(<CreateEntryPage />)
        expect(screen.getByLabelText(/emotion/i)).toBeInTheDocument()
    })
    it('allows the user to type an emotion', async () => {
        const user = userEvent.setup()
        render(<CreateEntryPage />)
        const input = screen.getByLabelText(/emotion/i)
        await user.type(input, 'Excited')
        expect(input).toHaveValue('Excited')
    })
    it('renders a value input', () => {
        render(<CreateEntryPage />)
        expect(screen.getByLabelText(/value/i)).toBeInTheDocument()
    })
    it('allows the user to type a value', async () => {
        const user = userEvent.setup()
        render(<CreateEntryPage />)
        const input = screen.getByLabelText(/value/i)
        await user.type(input, '3')
        expect(input).toHaveValue(3)
    })
    it('renders a link back to the Homepage', () => {
        render(<CreateEntryPage />)
        expect(screen.getByRole('link', { name: 'Homepage' })).toBeInTheDocument()
    })
    it('sends the emotion and value entered by the user when Create is clicked', async () => {
        const { createEntry } = await import('./actions')
        const user = userEvent.setup()
        render(<CreateEntryPage />)
        
        await user.type(screen.getByLabelText(/emotion/i), 'Angry')
        await user.type(screen.getByLabelText(/value/i), '5')
        await user.click(screen.getByRole('button', { name: 'Create entry' }))
        
        await waitFor(() =>
            expect(createEntry).toHaveBeenCalledWith({ emotion: 'Angry', val: 5 })
    )
})
})

// The CreateEntryPage component renders the create mood entry page.
// The current tests verify that the page heading and CreateButton render correctly.