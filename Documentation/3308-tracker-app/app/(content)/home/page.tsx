// Linda's
//import { IUser } from "@/types/user/user";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";
import { prisma } from "@/lib/prisma";
import HomePage from "./components/home-page";

export default async function Page() {
    //let userInfo = null as IUser | null;

    const session = await getServerSession(authOptions);

    // If signed in, try to get their info to pass down
    if (session?.user?.email) {
        try {
            // const userDoc = await prisma.user.findUnique({
            //     where: { email: session.user.email }
            // }) as IUser;

            // if (userDoc) {
            //     userInfo = userDoc;
            //}
            await prisma.user.findUnique({
                where: { email: session.user.email }
            });
            
        } catch (e) {
            console.log('Error with db: ', e);
        }
    }

    //return <HomePage userInfo={userInfo} />;
    //TEMP - once Connor's page is ready, uncomment above and delete below
    return <HomePage />
}