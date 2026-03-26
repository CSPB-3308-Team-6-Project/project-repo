//Linda's

import { IUser } from "@/types/user/user";
import ProfilePage from "@/app/(content)/profile/(ledy)/profile-page"
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";
import { prisma } from "@/lib/prisma";

export default async function Page() {
  // user

  let userInfo = null as IUser | null;

  //Linda get the server session using getServerSession, check the db for the user and pass the info it's there
  const session = await getServerSession(authOptions); //checks if user is logged in and returns session with user email

  //if not logged in, returns null
  if (!session || !session?.user || !session?.user?.email) {
    return <ProfilePage userInfo={null} />;
  }

  if (session?.user?.email) {
    try{
      //looks up user by email and stores in userInfo
      const userDoc = await prisma.user.findUnique({
        where: { email: session.user. email }
      }) as IUser;

      //From Carl: Perfect, no changes I can see right now
      if (userDoc) {
        userInfo = userDoc;
      }
    } catch (e) {
      console.log('Error with db: ', e);
    }
  }
  // passes full user object
  return <ProfilePage userInfo={userInfo}/>
}

