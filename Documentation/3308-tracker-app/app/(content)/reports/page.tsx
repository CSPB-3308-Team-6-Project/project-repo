import { ITracker } from "@/types/tracker/tracker";
import { ITrackerPost } from "@/types/tracker/tracker-post";
import { IUser } from "@/types/user/user";
import ReportsPage from "./(conner)/reports-page";
//import { authOptions } from "@/app/api/auth/[...nextauth]/route";
//import { getServerSession } from "next-auth/next";
//import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
//import { href } from "@/lib/url-helper";

export default async function Page() {
    let userInfo = null as IUser | null
    let trackerInfo = null as ITracker[] | null;
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



    ////////////////////////////////////////////////////////////////////////
    // JUST TESTING GET FOR STEPHANIE. /////////////////////////////////////
    // WE WILL MAKE THIS MORE DYNAMIC ONCE REGISTER AND SIGN IN ARE SET UP//
    ////////////////////////////////////////////////////////////////////////

    try {
        //for reports testing for Conner, we are just going to get all tracker and trackerPosts for now
        const trackerDocs = await prisma.tracker.findMany() as ITracker[];

        if (trackerDocs.length > 0) {
            trackerInfo = trackerDocs;

            // Step 2: Collect all trackerPost IDs across every tracker
            const allTrackerPostIds = trackerDocs.flatMap(tracker => tracker.trackerPostIDs ?? []) as string[];

            // Step 3: Query the trackerPost table for those IDs
            if (allTrackerPostIds.length > 0) {
                trackerPosts = await prisma.trackerPost.findMany({
                where: {
                    id: { in: allTrackerPostIds },
                },
                });
            }
        }
        


    ///////////////////////////////////////////////////////////////////////////////////////
    ///////THIS IS WHERE THE TRUE GET WILL BEGIN ONCE SIGN IN AND REGISTER ARE SET UP//////
    ///////////////////////////////////////////////////////////////////////////////////////
    //const session = await getServerSession(authOptions);

    // // If not signed in, send to login
    // if (!session?.user?.email) {
    //     redirect(href('/login'));
    // }

    // try {
    //     // Step 1: get the user
    //     const userDoc = await prisma.user.findUnique({
    //         where: { email: session.user.email }
    //     }) as IUser;

    //     if (!userDoc) {
    //         redirect(href('/login'));
    //     }

    //     userInfo = userDoc;

    //     // Step 2: use the user's trackerIDs to find their tracker
    //     if (userDoc.trackerIDs && userDoc.trackerIDs.length > 0) {
    //         const trackerDoc = await prisma.tracker.findFirst({
    //             where: { id: { in: userDoc.trackerIDs } },
    //             include: { trackerPosts: true }
    //         }) as ITracker;

    //         if (trackerDoc) {
    //             trackerInfo = trackerDoc;
    
    //             // Step 3: posts are already on the tracker object
    //             if (trackerDoc.trackerPosts && trackerDoc.trackerPosts.length > 0) {
    //                 trackerPosts = trackerDoc.trackerPosts;
    //             }
    //         }
    //     }

    //     //From Carl: Very well done!
    //     //There is concept in engineering called "never nesting", 
    //     //where you don't nest if statements within eachother.
    //     //Also, you could maybe add some console logs in case 
    //     //but outside those minor details, great job here
        

    } catch (e) {
        console.log('Error with db: ', e);
    }

    return <ReportsPage userInfo={userInfo} trackerInfo={trackerInfo} trackerPosts={trackerPosts} />
}