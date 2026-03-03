import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import HomePage from "./components/home-page";
import { IUser } from '@/types/user/user';

export async function Page() {
    const session = await getServerSession()
    let userInfo: IUser | null = null
    

    //this utilizes server sessions which reduces our need for API routes
    //I imagine we will do API RESTful so as to be in line with class expectations
    if (session?.user?.email) {
      try {
        const userDoc = await prisma.user.findUnique({
          where: { email: session.user.email }
        }) as IUser;
        userInfo = userDoc ? userDoc : null
      } catch (e) {
        console.log('Error with db: ', e)
      }
    }
  
    return <HomePage userInfo={userInfo} />
  }