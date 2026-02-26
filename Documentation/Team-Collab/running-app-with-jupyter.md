# Running App 

## With Jupyter

- Open Jupyterhub, and clone our repo into your files.
- Now, open new launcher and click VC Code IDE
- It should take you to a new window for VS Code and it should have your folders on the right.
- cd into the app so for me it's 3308/team-project/project-repo/Documentation/3308-tracker-app/
- Open a new terminal (Ctrl + `)
- do npm install (this will install the deps from the project)
- Now do npm run build, this will take a second to build
- Finally do npm run start. It should prompt you to "open browser" in lower right.

### Notes

- There is a downside, anytime you make a change and want to see this change, you must do:
- Ctrl+C to stop the server
- npm run build
- npm run start

- You have to do this because of the fact you're using a proxy with Jupyter (what we went over in class this week)
- If you want to be able to see the changes as you make them (after you save a file), the only way I've figured out how to do this is by downloading VS Code and doing it locally.
- This comes with a few extra steps like downloading npm and setting npm to path, which I can help with if you want.

## With Sandbox

- Go to codesandbox.io
- Sign up for an account
- Create project with React/Tailwind, Next.js, just React, or all, your choice
- Play around with the HTML/CSS
- You can attach codesandbox to github and work out of here, but it is spotty and I've seen it fail while working on it
