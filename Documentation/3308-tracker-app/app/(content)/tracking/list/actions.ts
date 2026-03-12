'use server'

import { prisma } from '../../../../lib/prisma'

export async function deleteEntry(id: string) {
    try {
        await prisma.trackerPost.delete({ where: { id } })
        return { success: true }
    } catch (error) {
        return { success: false }
    }
}