//Linda's

import { IUser } from "@/types/user/user";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";
import { prisma } from "@/lib/prisma";
import LoginPage from "@/app/(content)/login/(ledy)/login-page";
import { redirect } from "next/navigation";
import { href } from "@/lib/url-helper";

export default async function Page() {
  // user

  let userInfo = null as IUser | null;

  //Linda get the server session using getServerSession, check the db for the user and pass the info it's there
  //If the user is already signed in (aka the session exists, move them to the profile)
  const session = await getServerSession(authOptions); //checks if user is logged in and returns session with user email

  //If already signed in, send to profile
  if (session?.user?.email) {
    try{
      //looks up user by email and stores in userInfo
      const userDoc = await prisma.user.findUnique({
        where: { email: session.user. email }
      }) as IUser;

      //if already logged in, sends to profile
      if (userDoc) {
        redirect(href('/profile'));
      }
    } catch (e) {
      console.log('Error with db: ', e);
    }
  }
  //if not logged in, returns login page
  return <LoginPage userInfo={userInfo} />;
}



 