import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";
import TestAuthPage from "./components/test-auth-page";
import { prisma } from "@/lib/prisma";
import { IUser } from "@/types/user/user";


export default async function TestAuth() {

    const session = await getServerSession(authOptions)

    if (!session || !session?.user || !session?.user?.email) {
        return <TestAuthPage userEmail={''} />
    }

    if (session?.user?.email) {
        try {

            const userDoc = await prisma.user.findUnique({
                where: { email: session.user.email }
            }) as IUser;
            
            if (!userDoc) {
                return <TestAuthPage userEmail={''} />
            }

            return <TestAuthPage userEmail={userDoc.email} />

        } catch (e) {
            console.log('Error with db: ', e)
        }
    }

}