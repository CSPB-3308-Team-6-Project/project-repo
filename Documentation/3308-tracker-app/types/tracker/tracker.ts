import { ITrackerPost } from './tracker-post'

export interface ITracker {
    id: string,
    title: string,
    trackerPosts:  ITrackerPost[],
}