// Linda's

//Note from Carl: Moved this file to page.tsx below layout since we need 1 for the default page. 


import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";
import { prisma } from "@/lib/prisma";
import HomePage from "./(content)/home/components/home-page";
import { IUser } from "@/types/user/user";

export default async function Page() {

    let userInfo = null as IUser | null;

    const session = await getServerSession(authOptions);

    // If signed in, try to get their info to pass down
    if (session?.user?.email) {
        try {

            //From Carl: added these so it sets and passed userInfo if it's there. 
            //I had forgot to add the params to homepage, so not problem there.
            const userDoc = await prisma.user.findUnique({
                where: { email: session.user.email }
            }) as IUser;

            if (userDoc) {
                userInfo = userDoc;
            }
            
            
        } catch (e) {
            console.log('Error with db: ', e);
        }
    }

    //return <HomePage userInfo={userInfo} />;
    //TEMP - once Connor's page is ready, uncomment above and delete below
    return <HomePage userInfo={userInfo}/>
} 