// exports an async POST function
// reads JSON body with await request.json()
// validates that title and content fields are present
// returns success or failure message based on validation

import { NextResponse } from 'next/server'
export async function POST(request: Request) {
    try {
        const { title, content } = await request.json() // Read the JSON body of the request

        // Validate that both title and content are present
        if (!title || !content) {
            return NextResponse.json(
                { success: false, error: 'Missing required fields' },
                { status: 400 }
            )
        }
        // Here you would typically save the entry to a database

        // Return a success response if validation passes
        return NextResponse.json({ success: true, message: 'Entry created' }, { status: 200 })
    } catch (error) {
        // Handle any unexpected errors
        return NextResponse.json(
            { success: false, error: 'An error occurred while processing the request' },
            { status: 500 }
        )
    }
}