//Lindas

import { ITracker } from "@/types/tracker/tracker";
import { ITrackerPost } from "@/types/tracker/tracker-post";
import { IUser } from "@/types/user/user";
import TrackingPage from "./(steph)/tracking-page";

export default async function Page() {

    let userInfo = null as IUser | null
    let trackerInfo = null as ITracker | null;
    let trackerPosts = [] as ITrackerPost[];

    //Linda, same as for other pages, get the session using getServerSession()
    //First check if the user is valid in the db, if not, send them home or to the login screen using router from next/navigation
    //If user exists, check their trackerIDs and query the tracker table with the IDs from the user's array. 
    //Then use the tracker posts within that to populate the trackerPosts.
    //Pass all 3 as Reports may need all three

    return <TrackingPage userInfo={userInfo} trackerInfo={trackerInfo} trackerPosts={trackerPosts} />
}