# Prisma and Supabase

## Setup

- Go into your project, if you haven't set it up, go to ./running-app-with-jupyter.md and do that first
- Create an .env
  - You will have both a .env and a .env.local
- Add both of these to the .env:

```
DATABASE_URL="postgresql://postgres.upykzizdesiqqhvoircc:[password]@aws-0-us-west-2.pooler.supabase.com:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://postgres.upykzizdesiqqhvoircc:[password]@aws-0-us-west-2.pooler.supabase.com:5432/postgres"
```
  - For security sake, I'm not posting the password here directly but it's easy to get for all of us. It's:
    - cuboulderCCCCYYYY
    - CCCC is the four digits for our class
    - YYYY is this year
    - Make sure to replace the brackets too so it's:
      - postgres.upykzizdesiqqhvoircc:cuboulderCCCCYYYY@aw

- Run "npx prisma db push"
- Run "npx prisma generate"
- These commands should make sure to config your local files with what is in the database

## Working with Prisma

- If you look in prisma/prisma.config.ts, you'll see I have done a few basic models for us to get the database started.
- Now, go to types/user/user.ts. These types MUST match the types in the prisma models.
  - We use the types in types/ for our app related types. What I mean by this is anytime we are querying the database, we must use these types to relate them to the database since there is no type handover.
  - You can see an example of this a bit further down in my server actions section.
- ANYTIME we update the models in prisma or the type in types/ we MUST update the other to reflect otherwise it creates issues.
- Anytime we do make these changes, do "npx prisma db push" and "npx prisma generate" to update this.
  - Maybe text the group if you are updating the models so that we can refresh our local copies if we are working on these at the same time.

## Extra Details
- We are using prisma as our ORM and Supabase as our database.
- We can use server actions or RESTful API routes to access the database and manipulate the data as we see fit. Here is an example of a server action:

```
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
```
