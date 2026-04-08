// Linda's

//Note from Carl: Moved this file to page.tsx below layout since we need 1 for the default page. 


import { getServerSession } from "next-auth/next";
import { prisma } from "@/lib/prisma";
import HomePage from "./(content)/home/components/home-page";
import { IUser } from "@/types/user/user";
import { authOptions } from "@/lib/auth/auth";

export default async function Page() {

    const session = await getServerSession(authOptions);

    // If signed in, try to get their info to pass down
    try {
        if (!session || !session?.user || !session?.user?.email) {
            return <HomePage userInfo={null} />
        }

        //From Carl: added these so it sets and passed userInfo if it's there. 
        //I had forgot to add the params to homepage, so not problem there.
        const userDoc = await prisma.user.findUnique({
            where: { email: session.user.email }
        }) as IUser;

        if (!userDoc) {
            return <HomePage userInfo={null} />
        }

        return <HomePage userInfo={userDoc} />


    } catch (e) {
        console.log('Error with db: ', e);
        return <HomePage userInfo={null} />
    }

} 