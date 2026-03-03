# Running App 

## With Jupyter (MAIN)


- Open Jupyterhub, and clone our repo into your files.
- cd into the app so for me it's 3308/team-project/project-repo/Documentation/3308-tracker-app/
- Now, open new launcher and click VC Code IDE
- It should take you to a new window for VS Code and it should have your folders on the right.

### YOU WILL ONLY NEED TO DO THESE ONCE:

- In the root of the folder, add a file ".env.local". It'll be on the same level with the config files.
- In the .env.local add "NEXT_ASSET_PREFIX=https://coding.csel.io/user/<YOUR_NAME>/codeserver/proxy/3000"
    - Remove <YOUR_NAME> and replace it with your cuid.
    - Mine for example: NEXT_ASSET_PREFIX=https://coding.csel.io/user/case9539/codeserver/proxy/3000
    - Save
- In the .env.local file add NEXT_PUBLIC_BASE_PATH=https://coding.csel.io/user/<YOUR_NAME>/codeserver/proxy/3000
    - It's the same as above
    - I'm keeping these seperate despite having the same path because one is for assets, the other is for file routing
- In the .env.local file add "NEXTAUTH_SECRET=<ASK_CARL_FOR_SECRET>" to it without quotes
    - Ask Carl for this code.
    - DO NOT SHARE THIS SECRET with anyone but us or the prof. Do not push it to git or post it anywhere as web scrapers will pick it up and expose our auth
    - This secret is so when you're coding, you use authOptions, it checks this secret to make sure you're auth'd to use the auth commands.
- Open a new terminal (Ctrl + `)
- do npm install (this will install the deps from the project)
- Now do npm run build, this will take a second to build. This is just to make sure everything installed right
- You can begin the app with npm run dev or npm run start. I recommend using npm run dev to see changes a bit quicker without having to rebuild it every time.

### Everytime you log in:

- Pull from main to get repo up to speed
- Finally do npm run start. It should prompt you to "open browser" in lower right.

### When you're done for the day or committing to Github:

- Run npm run build to make sure it passes without build errors
- Either create a branch and push
- Or if you're sure you only touched your own files, push to main. Not advised to avoid merge conflicts but okay if working on your own stuff
- If you need to stash changes you've made before pulling from main (like if you forgot to pull or changes were made while you were coding):
    - git stash push -m "some message to help declare your stash"
    - git pull origin main
    - Assuming git pull origin main ran without issues, do: git stash pop
        - else: Fix conflicts if easy, or ask Carl if need help. Then git stash pop
    - After git stash pop, fix your merges if any
    - git add .
    - git commit -m 'Some message for your commit'
- If you want to create a new branch (preferred for most things)
    - git checkout -b branch-name
    - git push origin branch-name


### Notes

- You MUST create your .env.local and add the variables I added above in order to run it properly locally. This file will only be yours. DO NOT remove it from the .gitignore or it'll upload your personal and it will mess it up for others in their local when they pull. We have to do this because of the fact you're using a proxy with Jupyter (what we went over in class this week)
- There is a downside, anytime you make a change and you're running with npm run start (instead of npm run dev) and want to see this change, you must do:
        - Ctrl+C to stop the server
        - npm run build
        - npm run start
- To avoid the issue above, do npm run dev for testing
- If you want to be able to see the changes a bit smoother (after you save a file), the only way I've figured out how to do this is by downloading VS Code and doing it locally.
        - This comes with a few extra steps like downloading npm and setting npm to path, which I can help with if you want.

## With Sandbox

- Go to codesandbox.io
- Sign up for an account
- Create project with React/Tailwind, Next.js, just React, or all, your choice
- Play around with the HTML/CSS
- You can attach codesandbox to github and work out of here, but it is spotty and I've seen it fail while working on it
