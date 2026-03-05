import HomePage from './(content)/home/components/home-page';

export default async function Home() {

    // const session = await getServerSession()
    // let userInfo: IUser | null = null
    //Example of a Server Action

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