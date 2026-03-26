//Linda's

import { IUser } from "@/types/user/user";
import ProfilePage from "@/app/(content)/profile/(ledy)/profile-page"

export default async function Page() {
  // user

  let userInfo = null as IUser | null;

  //Linda get the server session using getServerSession, check the db for the user and pass the info it's there
  //If the user is already signed in (aka the session exists, move them to the profile)



  return <ProfilePage userInfo={userInfo}/>
}

