//Linda's page

import RegisterPage from "./(ledy)/register-page";
import { redirect } from "next/navigation";
import { href } from "@/lib/url-helper";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth/auth";

export default async function Page() {

  // Simple session check - no database query needed
  // The root layout already fetched the user info
  const profileUrl = href('/profile');
  const session = await getServerSession(authOptions);

  // If already signed in, redirect to profile
  if (session?.user?.email) {
    redirect(profileUrl);
  }

  return <RegisterPage />

}