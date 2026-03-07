import { Emotion } from '@/lib/generated/prisma/enums'

export interface ITrackerPost {
    _id: string,
    val: number, //intensity 1-10
    emotion: Emotion,
    recordedAt: Date //timestamp
}