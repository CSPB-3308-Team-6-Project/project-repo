'use server' //this is a backend page, and API calls are handled indirectly through the server

import { ITracker } from '@/types/tracker/tracker';
import { prisma } from '../../../../../lib/prisma'
import { revalidatePath } from 'next/cache';
// Prisma generate issue is causing the line below to error. Fix later?
//import { Emotion } from '../../../../lib/generated/prisma/client'

export async function createEntry({ rating, emotion, date, email, trackers }: { rating: number; emotion: string, date: Date, email: string | null, trackers: ITracker[] | null }) {

    if (!rating || !emotion || rating < 1 || rating > 10 || !email || email.trim() === '') {
        console.log('createEntry error: Missing required fields')
        return { success: false }
    }

    try {

        const user = await prisma.user.findUnique({ where: { email } })

        if (!user) {
            console.log('createEntry error: No user found with email', email)
            return { success: false }
        }

        let moodTracker: ITracker | undefined;
        
        // If trackers are passed (from tracking list page), use them
        if (trackers && trackers.length > 0) {
            moodTracker = trackers.find(tracker => tracker.title === 'Mood Tracker');
        } 
        // Otherwise, fetch trackers from DB if user has any (from homepage or when trackers not passed)
        else if (user.trackerIDs && user.trackerIDs.length > 0) {
            const userTrackers = await prisma.tracker.findMany({
                where: { id: { in: user.trackerIDs } },
            })
            moodTracker = userTrackers.find(tracker => tracker.title === 'Mood Tracker') as ITracker | undefined;
        }

        // If Mood Tracker doesn't exist, create it
        if (!moodTracker) {
            const newMoodTracker = await prisma.tracker.create({
                data: {
                    title: 'Mood Tracker',
                    trackerPostIDs: [] as string[],
                },
            })
            if (!newMoodTracker) {
                console.log('createEntry error: Failed to create new tracker for user', email)
                return { success: false }
            }
            // Add the new tracker to user's trackerIDs
            await prisma.user.update({
                where: { email },
                data: { trackerIDs: [...user.trackerIDs, newMoodTracker.id] },
            })
            moodTracker = newMoodTracker as ITracker
        }

        const newTracker = await prisma.trackerPost.create({
            data: {
                rating: rating,
                emotion: emotion as any,  // must match your Emotion enum (but for now any)
                ...(date ? { recordedAt: new Date(date) } : {})
            },
        })

        if (!newTracker) {
            console.log('createEntry error: Failed to create new tracker post for user', email)
            return { success: false }
        }

        moodTracker.trackerPostIDs.push(newTracker.id)
        await prisma.tracker.update({
            where: { id: moodTracker.id },
            data: { trackerPostIDs: moodTracker.trackerPostIDs },
        })

        revalidatePath('/tracking')

        return { success: true }
    } catch (error) {
        console.log('createEntry error:', error)
        return { success: false }
    }
}
