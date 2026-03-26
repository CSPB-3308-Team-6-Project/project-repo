'use server' //this is a backend page, and API calls are handled indirectly through the server

import { prisma } from '../../../../../lib/prisma'
// Prisma generate issue is causing the line below to error. Fix later?
//import { Emotion } from '../../../../lib/generated/prisma/client'

export async function createEntry({ val, emotion, date }: { val: number; emotion: string, date: string }) {
    try {
        await prisma.trackerPost.create({
            data: {
                val,
                emotion: emotion as any,  // must match your Emotion enum (but for now any)
                recordedAt: new Date(date)
            },
        })
        return { success: true }
    } catch (error) {
        console.log('createEntry error:', error)
        return { success: false }
    }
}
