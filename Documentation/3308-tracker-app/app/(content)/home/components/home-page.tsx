'use client'

import { IUser } from "@/types/user/user"

export default function HomePage({ userInfo }: { userInfo: IUser | null }) {
    return (
        <>
            <p>Homepage</p>
            <p>{userInfo ? userInfo.name : 'No name'}</p>
        </>
    )
}