'use server' //this is a backend page, and API calls are handled indirectly through the server

import { prisma } from '../../../../lib/prisma'

export async function getEntries() {
    try {
        // fetch all entries, order by newest date first(descending)
        const entries = await prisma.trackerPost.findMany({
            orderBy: { recordedAt: 'desc' }
        })
        return { success: true, data: entries}
    }
    catch (error) {
        return { success: false, data: [] }
    }
}

export async function updateEntry({id, val, emotion, date}: {
    id: string
    val: number
    emotion: string
    date: string
}) {
    try {
        await prisma.trackerPost.update({
            // where tells prisma which row to update
            where: { id },
            // data tells prisma what to change. fields below are updated
            data: {
                val,
                emotion: emotion as any, //work around prisma enum import issue
                recordedAt: new Date(date), // user types a string, so this line converts to Date object
            }
        })
        return { success: true }
    }
    catch (error) {
        return { success: false }
    }
}


export async function deleteEntry(id: string) {
    try {
        await prisma.trackerPost.delete({ where: { id } })
        return { success: true }
    } catch (error) {
        return { success: false }
    }
}