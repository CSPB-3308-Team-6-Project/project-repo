import { Emotion } from '@prisma/client'

export interface ITrackerPost {
    id: string,
    rating: number, //intensity 1-10 -> val
    emotion: Emotion,
    recordedAt: Date //timestamp
}