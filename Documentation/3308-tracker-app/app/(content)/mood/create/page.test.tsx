// Tests (mock fetch with vi.stubGlobal)
// renders an h1 with "Create New Entry"
// renders a CreateButton component
// clicking the CreateButton sends a POST request to /api/entries with the correct body
// displays a success message when the POST request is successful

import { render, screen, waitFor } from '@/app/test-utils'
import userEvent from '@testing-library/user-event'
import CreateEntryPage from './page'
describe('CreateEntryPage', () => {
    beforeEach(() => {
        // Mock the global fetch function to intercept API calls
        vi.stubGlobal('fetch', vi.fn())
    })
    afterEach(() => {
        // Restore the original fetch function after each test
        vi.restoreAllMocks()
    })
    it('renders the page with a heading and a CreateButton', () => {
        render(<CreateEntryPage />)
        expect(screen.getByRole('heading', { name: 'Create New Entry' })).toBeInTheDocument()
        expect(screen.getByRole('button', { name: 'Create entry' })).toBeInTheDocument()
    })

    it('sends a POST request with the correct body when the CreateButton is clicked', async () => {
        const user = userEvent.setup()
        render(<CreateEntryPage />) 
        await user.click(screen.getByRole('button', { name: 'Create entry' }))
        expect(fetch).toHaveBeenCalledWith('/api/entries', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: 'Sample Title', content: 'Sample Content' }),
        })
    })

    it('displays a success message when the POST request is successful', async () => {
        const user = userEvent.setup()
        // Mock the fetch response to simulate a successful API call
        vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
            json: vi.fn().mockResolvedValue({ success: true, message: 'Entry created successfully' }),
        }))
        render(<CreateEntryPage />) 
        await user.click(screen.getByRole('button', { name: 'Create entry' }))
        await waitFor(() => expect(screen.getByText('Entry created successfully')).toBeInTheDocument())
    })
})

// The CreateEntryPage component is a simple page that allows users to create a new entry. 
// It includes a heading, a CreateButton, and handles the logic for sending a POST request to the API 
// when the button is clicked. The tests ensure that the component renders correctly, sends the correct 
// data to the API, and displays a success message upon successful creation of an entry.