'use server'

import { prisma } from "@/lib/prisma";
import { IUser } from "@/types/user/user";

export async function TestUserAuth({ userToSet }: { userToSet: IUser }) {

    if (!userToSet) {
        return { worked: false, message: 'No User sent' }
    }

    try {
        const userDoc = await prisma.user.findUnique({
            where: { email: userToSet.email }
        }) as IUser;

        if (userDoc) {
            return {worked: false, message: 'User already exists'}
        }

        const newUser = await prisma.user.create({
            data: userToSet
        })

        if (!newUser) {
            return {worked: false, message: 'Error creating user'}
        }

        return {worked: true, message: 'Success'}

    } catch (e: any) {
        console.log('Error with db: ', e)
        return {worked: false, message: `Err catch: , ${e.toString()}`}
    }
}