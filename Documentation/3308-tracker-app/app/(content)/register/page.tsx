//Lindas page
//get user

import { IUser } from "@/types/user/user";
import RegisterPage from "./(ledy)/register-page";

export default async function Page() {

  let userInfo = null as IUser | null
  //Linda get the server session using getServerSession, check the db for the user and pass the info it's there
  
  return <RegisterPage userInfo={userInfo}/>
}