# Next Auth

- We will use next auth for our authorization. It does a lot of nice things that make our lives easy.
- To call it on the front end (any UI component with 'use client' at the top)
    - use the hook in the component:
      ```
      import { useSession } from "next-auth/react"
      ....
      const { data: session} = useSession();
      ```
    - [More info](https://next-auth.js.org/getting-started/example#frontend---add-react-hook)
- To call it on the backend (any async component or server component NOT labeled 'use client')
    - use the server specific hook since "hooks" are technically frontend:
      ```
      import { authOptions } from './api/auth/[...nextauth]/route';
      ....
      const session = await getServerSession(authOptions);
      ```
    - [More info](https://next-auth.js.org/getting-started/example#backend---api-route)
