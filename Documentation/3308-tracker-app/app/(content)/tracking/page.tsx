//Lindas

import { ITracker } from "@/types/tracker/tracker";
import { ITrackerPost } from "@/types/tracker/tracker-post";
import { IUser } from "@/types/user/user";
import TrackingPage from "./(steph)/tracking-page";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { href } from "@/lib/url-helper";

export default async function Page() {

    let userInfo = null as IUser | null
    let trackerInfo = null as ITracker | null;
    let trackerPosts = [] as ITrackerPost[];

    //Linda, same as for other pages, get the session using getServerSession()
    //First check if the user is valid in the db, if not, send them home or to the login screen using router from next/navigation
    //If user exists, check their trackerIDs and query the tracker table with the IDs from the user's array. 
    //Then use the tracker posts within that to populate the trackerPosts.
    //Pass all 3 as Reports may need all three
    const session = await getServerSession(authOptions);

    // If not signed in, send to login
    if (!session?.user?.email) {
        redirect(href('/login'));
    }

    try {
        // Step 1: get the user
        const userDoc = await prisma.user.findUnique({
            where: { email: session.user.email! }
        }) as IUser;

        if (!userDoc) {
            redirect(href('/login'));
        }

        userInfo = userDoc;

        // Step 2: use the user's trackerIDs to find their tracker
        if (userDoc.trackerIDs && userDoc.trackerIDs.length > 0) {
            const trackerDoc = await prisma.tracker.findFirst({
                where: { id: { in: userDoc.trackerIDs } },
                include: { trackerPosts: true }
            }) as ITracker;

            if (trackerDoc) {
                trackerInfo = trackerDoc;

                // Step 3: posts are already on the tracker object
                if (trackerDoc.trackerPosts && trackerDoc.trackerPosts.length > 0) {
                    trackerPosts = trackerDoc.trackerPosts;
                }
            }
        }

        //From Carl: Very well done! (Copied note from reports page)
        //There is concept in engineering called "never nesting", 
        //where you don't nest if statements within eachother.
        //Also, you could maybe add some console logs in case 
        //but outside those minor details, great job here

    } catch (e) {
        console.log('Error with db: ', e);
    }

    return <TrackingPage userInfo={userInfo} trackerInfo={trackerInfo} trackerPosts={trackerPosts} />
}