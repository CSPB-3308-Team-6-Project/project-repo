# Items to Research and Familiarize with

## Stack

1. Next.js/(maybe Vercel)
    - These don't worry about.
    - The only aspect of Next.js you need to understand is how the app routing works but I will explain this later
        - Tip for later: When using router or pathname, choose the "next/navigation" option

2. React
    - [Use their site as a starting point](https://react.dev/learn)
        - This is the absolute best place to start because they have interactive lessons on each page
    - [Sandbox.io](https://codesandbox.io/)
        - Go to "Create" in upper right, then frontend, then either do React or React+Tailwind if you want to play around with both
     
3. Tailwind
    - [Tailwind site](https://tailwindcss.com/docs/color)
        - In here just familiarize yourself with the terminology. When you create an HTML component, you'll use it's classname and enter in text that tailwind reads as css
        - Normally we would have to make a css sheet and link it to everything but this makes it way easier.
        - There is A LOT of terminology to learn there so I would focus on:
            -     flex flex-row/flex-col, justify-items/justify-between/etc, items-center/items-start/etc, colors, width, height, text prompts and font prompts.
            - I will help with anything you don't understand.
        - Example:
            - Below would display "Start" and "End" in a row seperated on either side of the page
```
<div className="flex flex-row justify-between items-center w-full">
  <p>Start</p>
  <p>End</p>
</div>
```

4. HTML
    - Honestly, go through the React [tutorial prompts above (or here)](https://react.dev/learn) because you'll learn basic HTML peripherally
        - This will be the best since you'll learn HTML and React
    - [HTML Tutorial](https://www.w3schools.com/html/)
        - If you want more robust HTML learning

5. PostgreSQL and Prisma
    - Don't worry about this now. I will do some research and figure out the best way to learn these over the next week.
    - Stay tuned for updates

6. Mantine
    - [Our UI provider](https://mantine.dev/core/checkbox/)
        - Just stick to the components tab or maybe extensions.
        - These are pre-made components for us to plug and play
