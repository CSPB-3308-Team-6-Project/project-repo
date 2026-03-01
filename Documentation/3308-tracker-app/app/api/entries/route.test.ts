// Tests
// Directly calles the exported POST function
// returns 200 with { success: true, message: 'Entry created' } for a valid POST body
// returns 400 with { success: false, error: 'Missing required fields' } for an empty POST body

import { POST } from './route'

const makeRequest = (body: object) =>
    new Request('http://localhost/api/entries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
    })

describe('POST /api/entries', () => {
    it('returns 200 with success message for valid POST body', async () => {
        const request = makeRequest({ title: 'Test Entry', content: 'This is a test entry.' })
        const response = await POST(request)
        expect(response.status).toBe(200)
        const data = await response.json()
        expect(data).toEqual({ success: true, message: 'Entry created' })
    })

    it('returns 400 with error message for empty POST body', async () => {
        const request = makeRequest({})
        const response = await POST(request)
        expect(response.status).toBe(400)
        const data = await response.json()
        expect(data).toEqual({ success: false, error: 'Missing required fields' })
    })
})

// The tests for the POST function in the route file ensure that the API endpoint behaves correctly when receiving valid and invalid POST requests. 
// The first test checks that a valid request with a title and content returns a 200 status code and a success message. 
// The second test verifies that an empty request body results in a 400 status code and an appropriate error message. 
// These tests help ensure that the API endpoint is robust and handles different scenarios as expected.
