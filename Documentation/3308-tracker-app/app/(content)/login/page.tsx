'use server'

//Linda's

import { getServerSession } from "next-auth/next";
import LoginPage from "@/app/(content)/login/(ledy)/login-page";
import { redirect } from "next/navigation";
import { href } from "@/lib/url-helper";
import { authOptions } from "@/lib/auth/auth";

export default async function Page() {

  // Simple session check - no database query needed
  // The root layout already fetched the user info
  const profileUrl = href('/profile');
  const session = await getServerSession(authOptions);

  // If already signed in, send to profile
  if (session?.user?.email) {
    redirect(profileUrl);
  }

  // If not logged in, returns login page
  return <LoginPage />;
}