"use server"

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { IUser } from "@/types/user/user";
import signOut from "next-auth/next";

export async function CheckUser(email: string) {
    if (!email || email === '') {
        await signOut(authOptions)
        return false
    }

    try {
        const userDoc = await prisma.user.findUnique({
            where: { email: email }
        }) as IUser;

        if (!userDoc) {
            await signOut(authOptions)
            return false
        }

        return true;

    } catch (e) {
        console.log('Error with db: ', e);
        await signOut(authOptions)
        return false;
    }
}