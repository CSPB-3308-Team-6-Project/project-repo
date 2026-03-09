# ROADMAP Draft

---

### In an effort to make sure we are fully on track of our many moving pieces, and on time with the quick turnaround of the semester, I am writing down a draft of a Roadmap for us. We can update/discuss this during our meeting on 3/11.

---

## PAGES

### Subject to change upon discussion but this is what I thought would be a good set up. (Note I have questions in the line items for y'all to consider)

- Homepage
  - Optionally keep about information here
  - Optionally keep "How to info" here
- Profile
  - Edit email/name
  - Change password/Forgot password?
    - This would be a modern idea and would give a more robust app, but could be more of a final though
  - Reports maybe? If not doing it's own page
- List
  - Shows a list of reported logs (feelings/moods)
    - Each list item to either have EDIT/DELETE button assigned
    - OR on click of an item, go to an EDIT log page where EDIT/DELETE button are (probably this one is cleaner)
  - Create/Log button here
    - Could add a Log button to the homepage/nav?
- Reports
  - Simple graphs and stats
  - Could be moved into Profile for a more layered UI experience?
- Meet the team
  - Simple blurbs about the team
- About/How to
  - Make a new page with About info or "how to" info?

---

## NAV

### Also subject to change

- User signed in
  - Homepage
  - Profile
  - List
  - Reports
  - Meet the team
  - About/How to
  - Sign out?
    - Should the sign out be explicit in the nav or hidden in profile?
   
- User not signed in
  - Homepage
  - Register
  - Sign in
  - Meet the team
  - About/How to

---

## TIMELINE

### Week of 3/9
  - Get routes to DB (User register, edit, etc.) moving
  - Get basic pages set up
    - Decide on soldified pages for the app during 3/11 meeting (see above for a general idea/questions)
  - Skeleton of UI going
  - Milestone 4 due 3/12

### Week of 3/16
  - Get all routes working
  - Auth works (sign-in/sign-out/register)
    - Carl needs to get Auth working prior to this being able to work right
  - Move forms and pages into their respective
  - No milestone due this week

### Week of 3/23
  - Finish DB routes
  - Decide what other schemas to add for users to track
    - Since routes should be up and running for our first one, and SQL design is due this week, we should be able to update the schemas/routes if we want to add more tracking options like Monthly Cycle, Pets, etc. If not, totally fine too
  - UI Polishing
    - Make sure themes align
    - Make sure there are no desktop/mobile misalignments
    - All pages work
  - Milestone 5 due 3/26

### Milestone 6 - Individual Interviews 4/9

### Project Presentation 4/16
  - From 3/26 - 4/16, we can use this time to make sure everything works and we are happy with the app.
  - I don't forsee him making us turn in prior to this date, but I will update this if we find out different.
    

---

## WORK-DIVISION

### Check the Projects board for more in depth details about your specific tasks. Below is just a running, high-level, rundown of the tasks per person.

1. Conner
  - UI design
  - Making sure Nav works
  - If we decide to hide buttons, make sure dropdowns/drawers work.
  - Help Ledy with Graphs/Calendar view if we decide to have that
2. Ledy
  - User registration/edit/delete
  - Edit Password
    - This can be passed off to Carl if you feel the graphs/stats are going to take up too much of your time
  - Graphs/stats for reports page
    - Use mantine, it will make it a lot easier
    - Start with just one graph/stat or calendar view with log details by date (up to you). Expand as you see fit
3. Stephanie
  - Tracker create/edit/delete
  - If we add more tracking options on, make sure that the create/edit/delete are dynamic to where it won't matter what is passed
  - Testing
4. Linda
  - All GET server actions for each page that needs it.
  - Own the schemas and types
    - Make sure they are updated and match the types within the app.
  - Help Conner with his UI tests
  - Help Ledy with Graphs/Stats if she needs it
  - Help Stephanie with any Schema issues/questions
5. Carl
  - Admin work/documentation
  - Auth work
  - Forgot Password/Edit Password if Ledy doesn't have bandwidth
  - Configs
  - General help
