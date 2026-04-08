'use server'

import { prisma } from "@/lib/prisma";
import { IUser } from "@/types/user/user"

export async function SignOutAttempt(userEmail: string) {

    if (!userEmail) {
        console.log('No user email, cannot sign out');
        return { status: 'invalid params', message: 'No user email, cannot sign out' }
    }

    try {
        const verifyUser = await prisma.user.findUnique({
            where: { email: userEmail }
        }) as IUser;

        if (!verifyUser) {
            console.log('User not found, cannot sign out');
            return { status: 'no user', message: 'User not found, cannot sign out' }
        }

        return { status: 'Success', message: 'Sign out successful' }
    } catch (e: any) {
        console.log('Error with sign out: ', e)
        return { status: 'error', message: `Err catch: , ${e.toString()}` }
    }
}