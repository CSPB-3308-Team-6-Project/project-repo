'use server'

import { ITracker } from "@/types/tracker/tracker";
import { ITrackerPost } from "@/types/tracker/tracker-post";
import { IUser } from "@/types/user/user";
import ReportsPage from "./(conner)/reports-page";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth/auth";
import { href } from "@/lib/url-helper";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Page() {
    let userInfo = null as IUser | null
    let trackerInfo = [] as ITracker[];
    let trackerPosts = [] as ITrackerPost[];

    //Linda, same as for other pages, get the session using getServerSession()
    //First check if the user is valid in the db, if not, send them home or to the login screen using router from next/navigation
    //If user exists, check their trackerIDs and query the tracker table with the IDs from the user's array. 
    //Then use the tracker posts within that to populate the trackerPosts.
    //Pass all 3 as Reports may need all three


    ////FROM CARL 3/27: ///////////////////////////////////////////////////////////////////////
    // Linda, like I said, this is perfect, but I am going to pass Stephanie everything without checking for User perms so she can test her stuff.
    // And once Ledy gets the sign-in/register stuff set up, we will begin to check for the data by user like you have.
    ///////////////////////////////////////////////////////////////////////////////////////////

    try {

        const session = await getServerSession(authOptions);

        // If not signed in, send to login
        if (!session?.user?.email) {
            redirect(href('/login'));
        }

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
                where: { id: { in: userDoc.trackerIDs } }
            }) as ITracker;

            if (trackerDoc) {
                trackerInfo.push(trackerDoc);
            }
        }

        // Step 3: posts are already on the tracker object
        if (trackerInfo.length > 0) {
            for (const tracker of trackerInfo) {
                if (tracker.trackerPostIDs && tracker.trackerPostIDs.length > 0) {
                    const posts = await prisma.trackerPost.findMany({
                        where: { id: { in: tracker.trackerPostIDs } }
                    }) as ITrackerPost[];
                    trackerPosts.push(...posts);
                }
            }
        }


    } catch (e) {
        console.log('Error with db: ', e);
    }

    return <ReportsPage userInfo={userInfo} trackers={trackerInfo} trackerPosts={trackerPosts} />
}