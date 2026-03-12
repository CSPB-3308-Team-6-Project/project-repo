'use server'

import { prisma } from '../../../../lib/prisma'
// Prisma generate issue is causing the line below to error. Fix later?
//import { Emotion } from '../../../../lib/generated/prisma/client'

export async function createEntry({ val, emotion }: { val: number; emotion: string }) {
    try {
        await prisma.trackerPost.create({
            data: {
                val,
                emotion: emotion as any,  // must match your Emotion enum (but for now any)
            },
        })
        return { success: true }
    } catch (error) {
        return { success: false }
    }
}
