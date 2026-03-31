
//Lindas page
//get user

import { IUser } from "@/types/user/user";
import RegisterPage from "./(ledy)/register-page";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { href } from "@/lib/url-helper";

export default async function Page() {

  let userInfo = null as IUser | null
  //Linda get the server session using getServerSession, check the db for the user and pass the info it's there
  const session = await getServerSession(authOptions);

  // If already signed in, no need to register - send to profile
  if (session?.user?.email) {
    try {
      const userDoc = await prisma.user.findUnique({
          where: { email: session.user.email }
      }) as IUser;

      if (userDoc) {
        redirect(href('/profile'));
      }

      //From Carl: Perfect from what I can see right now

    } catch (e) {
      console.log('Error with db: ', e);
    }
  }
  return <RegisterPage userInfo={userInfo}/>

}