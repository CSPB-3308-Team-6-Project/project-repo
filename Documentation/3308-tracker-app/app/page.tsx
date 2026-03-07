import HomePage from './(content)/home/components/home-page';
//import type { IUser} from '@/types/user/user';

export default async function Home() {

    // const session = await getServerSession()
    // let userInfo: IUser | null = null

    //Fake user data - replace with session data when auth set up
//TODO: Uncomment and pass to HomePage once Connor updates component    
    // const fakeUser: IUser = {
    //     id: 1,
    //     name: "Linda",
    //     email: "lima7804@colorado.edu",
    //     cuID: "lima7804",
    //     trackerIDs: [],
    //     createdAt: new Date(),
    // }
    //Example of a Server Action

// TODO: Pass userInfo to HomePage once Conner updates the component to accept props
    // //this utilizes server sessions which reduces our need for API routes
    // //I imagine we will do API RESTful so as to be in line with class expectations
    // if (session?.user?.email) {
    //   try {
    //     const userDoc = await prisma.user.findUnique({
    //       where: { email: session.user.email }
    //     }) as IUser;
    //     userInfo = userDoc ? userDoc : null
    //   } catch (e) {
    //     console.log('Error with db: ', e)
    //   }
    // }
  
    return <HomePage />
}