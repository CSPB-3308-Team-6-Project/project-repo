// Tests
// renders an h1 with "Mood List"
// renders a page description
// renders a list of mood entries
// renders the emotion and value for each entry
// renders an Edit button for each entry
// renders a Delete button for each entry
// renders a link to create a new entry
// renders a message when there are no entries

vi.mock('./actions', () => ({
    deleteEntry: vi.fn().mockResolvedValue({ success: true }),
}))

import { render, screen } from '@/app/test-utils'
import MoodListPage from '../tracking-page'
import userEvent from '@testing-library/user-event'

describe('MoodListPage', () => {
    it('renders a heading', () => {
        render(<MoodListPage userInfo={null} trackerInfo={null} trackerPosts={[]} />)
        expect(screen.getByRole('heading', { name: 'Mood List' })).toBeInTheDocument()
    })
    it('renders a page description', () => {
        render(<MoodListPage userInfo={null} trackerInfo={null} trackerPosts={[]} />)
        expect(screen.getByText(/logged moods/i)).toBeInTheDocument()
    })
    it('renders a list of mood entries', () => {
        render(<MoodListPage userInfo={null} trackerInfo={null} trackerPosts={[]} />)
        expect(screen.getAllByRole('listitem').length).toBeGreaterThan(0)
    })
    it('renders the emotion for each entry', () => {
        render(<MoodListPage userInfo={null} trackerInfo={null} trackerPosts={[]} />)
        expect(screen.getByText(/excited/i)).toBeInTheDocument()
    })
    it('renders the value for each entry', () => {
        render(<MoodListPage userInfo={null} trackerInfo={null} trackerPosts={[]} />)
        expect(screen.getByText(/3/)).toBeInTheDocument()
    })
    it('renders an Edit button for each entry', () => {
        render(<MoodListPage userInfo={null} trackerInfo={null} trackerPosts={[]} />)
        expect(screen.getAllByRole('button', { name: /edit/i }).length).toBeGreaterThan(0)
    })
    it('renders a Delete button for each entry', () => {
        render(<MoodListPage userInfo={null} trackerInfo={null} trackerPosts={[]} />)
        expect(screen.getAllByRole('button', { name: /delete/i }).length).toBeGreaterThan(0)
    })
    it('renders a link to create a new entry', () => {
        render(<MoodListPage userInfo={null} trackerInfo={null} trackerPosts={[]} />)
        expect(screen.getByRole('link', { name: /create/i })).toBeInTheDocument()
    })
    it('clicking Delete calls the delete action with the correct id', async () => {
        const { deleteEntry } = await import('./actions')
        const user = userEvent.setup()
        render(<MoodListPage userInfo={null} trackerInfo={null} trackerPosts={[]} />)
        const deleteButtons = screen.getAllByRole('button', { name: /delete/i })
        await user.click(deleteButtons[0])
        expect(deleteEntry).toHaveBeenCalled()
    })
})
