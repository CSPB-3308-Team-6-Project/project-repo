import { IUser } from "@/types/user/user";

export default function RegisterPage({ userInfo }: { userInfo: IUser | null }) {
    console.log(`Just putting this here to clear the warning: `, userInfo)
    return (
        <div>
            Some info for your register page
        </div>
    )
}