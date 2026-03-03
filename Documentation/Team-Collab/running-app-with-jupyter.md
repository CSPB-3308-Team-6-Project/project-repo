# Running App 

## With Jupyter (MAIN)

- Open Jupyterhub, and clone our repo into your files.
- cd into the app so for me it's 3308/team-project/project-repo/Documentation/3308-tracker-app/
- Now, open new launcher and click VC Code IDE
- It should take you to a new window for VS Code and it should have your folders on the right.
- In the root of the folder, add a file ".env.local". It'll be on the same level with the config files.
- In the .env.local add "NEXT_ASSET_PREFIX=https://coding.csel.io/user/<YOUR_NAME>/codeserver/proxy/3000"
    - Remove <YOUR_NAME> and replace it with your cuid.
    - Mine for example: NEXT_ASSET_PREFIX=https://coding.csel.io/user/case9539/codeserver/proxy/3000
    - Save
- In the .env.local file add NEXT_PUBLIC_BASE_PATH=https://coding.csel.io/user/<YOUR_NAME>/codeserver/proxy/3000
    - It's the same as above
    - I'm keeping these seperate despite having the same path because one is for assets, the other is for file routing
- Open a new terminal (Ctrl + `)
- do npm install (this will install the deps from the project)
- Now do npm run build, this will take a second to build
- Finally do npm run start. It should prompt you to "open browser" in lower right.
- You can close this and use npm run dev to see changes a bit quicker without having to rebuild it every time.

### Notes

- There is a downside, anytime you make a change with npm run start and want to see this change, you must do:
- Ctrl+C to stop the server
- npm run build
- npm run start

- To avoid the issue above, do npm run dev

- You have to do this because of the fact you're using a proxy with Jupyter (what we went over in class this week)
- If you want to be able to see the changes as you make them (after you save a file), the only way I've figured out how to do this is by downloading VS Code and doing it locally.
- This comes with a few extra steps like downloading npm and setting npm to path, which I can help with if you want.

## With Sandbox

- Go to codesandbox.io
- Sign up for an account
- Create project with React/Tailwind, Next.js, just React, or all, your choice
- Play around with the HTML/CSS
- You can attach codesandbox to github and work out of here, but it is spotty and I've seen it fail while working on it
