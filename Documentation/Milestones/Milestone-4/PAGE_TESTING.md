# PAGE_TESTING.md
This document defines the **pages** Health & Emotion Tracker will implement and what is required to (1) render them correctly and (2) test them consistently.

At least **5 independent pages** are included below. For each page, provide:

- Page Title
- Page Description (include a mockup or hand drawn image of the page)
- Parameters needed for the page
- Data needed to render the page
- Link destinations for the page
- List of tests for verifying the rendering of the page

---

## Conventions Used in This Document
### Parameter Types
- **Route params**: values embedded in the URL path (e.g.,
`/groups/:groupId`)
- **Query params**: values after `?` in the URL (e.g., `?
tab=tasks`)
- **State params**: values passed through navigation state
(optional; avoid for critical data)
### Data Types
- **Auth state**: current user identity + session token
- **API data**: data fetched from backend services
- **UI state**: transient values like form fields, selected
filters, toggles
### Mockups
Each page includes a **low-fidelity mockup** (ASCII wireframe).
Teams may replace these with hand-drawn screenshots later.

---

## 1) Landing Page
### Page Title
Home
### Page Description
Purpose: Introduce Health & Emotion Tracker and display links to app functionalities.Provide a short feature summary so the purpose is clear before authentication.
### Parameters
- **Route params**: n/a
- **Query params**: n/a
- **State params**: n/a
### Data
- **Auth state**: Page is accessible to all users. The nav menu's options will depend on if the user is signed in or not. (Sign in and Register/Sign out and Profile)
- **API data**: n/a
- **UI state**: Nav UI buttons will change in the nav depending on it the user is signed in or not.
### Link Destinations

### List of Tests


---

## 2) Profile Page
### Page Title
Profile
### Page Description
Purpose: Existing users can view their account profile and edit information such as password and email.
### Parameters
- **Route params**: n/a
- **Query params**: n/a
- **State params**: n/a
### Data
- **Auth state**: User must be authenticated- the page is only accessible to existing users
- **API data**: n/a
- **UI state**:
### Link Destinations
link
### List of Tests
tests

---

## 3) Reports Page
### Page Title
Reports
### Page Description
Purpose: Existing users can view summary statistics and trends for their mood logging
### Parameters
- **Route params**:
- **Query params**:
- **State params**:
### Data
- **Auth state**: user must be authenticated- the page is only accessible to existing users
- **API data**:
- **UI state**:
### Link Destinations
link
### List of Tests
tests

---

## 4) Create Mood Page
### Page Title
Create Mood
### Page Description
Purpose: Existing users can log an emotion and its associated intensity. The page renders an emotion text input, a numeric intensity value, and a submit button. Once the record is submitted, a success or error message is displayed.
### Parameters
- **Route params**: n/a
- **Query params**: n/a
- **State params**: n/a
### Data
- **Auth state**: user must be authenticated- the page is only accessible to existing users
- **API data**: POST via server action `createEntry({ emotion, val })` writes a new 'trackerPost' record to the database
- **UI state**: `emotion` (string, text input), `val` (number, number input), page status (`idle | loading | success | error`)
### Link Destinations
- Homepage -> `/`
### List of Tests
1. Renders an h1 with "Create New Entry"
2. Renders a page description with "Create a new mood entry."
3. Renders a "Create entry" button
4. The "Create entry" button is enabled on initial render
5. The "Create entry" button is disabled while loading (after click, before response)
6. Renders an emotion text input labeled "Emotion"
7. Allows the user to type into the emotion input
8. Renders a numeric value input labeled "Value"
9. Allows the user to type into the value input
10. Renders a link back to the Homepage
11. Calls `createEntry` with the correct `{ emotion, val }` payload when the button is clicked

---

## 5) Mood List Page
### Page Title
Mood List
### Page Description
Purpose: Existing users can view their entire history of emotion logging, with the option to edit or delete individual logs.
### Parameters
- **Route params**:
- **Query params**:
- **State params**:
### Data
- **Auth state**: user must be authenticated- the page is only accessible to existing users
- **API data**: GET list of mood entries (trackerPost records). DELETE via server action `deleteEntry(id)` - removes a record from the database by id.
- **UI state**: list of rendered mood entries
### Link Destinations
- Create Mood -> `/mood/create`
### List of Tests
1. Renders an h1 with "Mood List"
2. Renders a page description containing "logged moods"
3. Renders a list of mood entries (at least one list item)
4. Renders the emotion label for each entry (e.g., "Excited")
5. Renders the intensity value for each entry (e.g., "3")
6. Renders an Edit button for each entry
7. Renders a Delete button for each entry
8. Renders a link to create a new entry
9. Clicking Delete calls `deleteEntry` with the correct entry id

---

## 6) Register Page
### Page Title
Register
### Page Description
Purpose: This page allows a new user to create a profile by entering their basic account information. 
### Parameters
- **Route params**:
- **Query params**:
- **State params**: Form input values for name, email, password, and cuID
### Data
- **Auth state**: None- accessible to new users
- **API data**: None at the moment. This page uses a server action instead of an API route for form submission.
- **UI state**: Empty form fields on initial render then user input values in the fields before submission

### Link Destinations
Register button → createUser → redirect to /profile

### List of Tests
1. Register page loads
2. Form fields appear on screen
3. Fields are empty on initial load
4. User can type in fields
5. Register button appears
6. Submit button appears
7. Submitting valid data calls create server action
8. Successful submission redirects correctly






---
---
everything below is from the sample for reference and should be deleted once we populate the required information above.

---
---
# PAGE_TESTING.md

This document defines the **pages** StudySync will implement and what is required to (1) render them correctly and (2) test them consistently.

At least **5 independent pages** are included below.

---

## Conventions Used in This Document

### Parameter Types
- **Route params**: values embedded in the URL path (e.g., `/groups/:groupId`)
- **Query params**: values after `?` in the URL (e.g., `?tab=tasks`)
- **State params**: values passed through navigation state (optional; avoid for critical data)

### Data Types
- **Auth state**: current user identity + session token
- **API data**: data fetched from backend services
- **UI state**: transient values like form fields, selected filters, toggles

### Mockups
Each page includes a **low-fidelity mockup** (ASCII wireframe). Teams may replace these with hand-drawn screenshots later.

---

# 1) Landing Page

## Page Title
Landing Page (Welcome)

## Page Description
Purpose: Introduce StudySync and allow users to log in or create an account. Provide a short feature summary so the purpose is clear before authentication.

**Mockup (low-fidelity):**
```
+------------------------------------------------------+
| StudySync                                            |
| "Coordinate study sessions, tasks, and progress."    |
|------------------------------------------------------|
| [ Log In ]   [ Sign Up ]                             |
|------------------------------------------------------|
| Features                                             |
|  • Availability overlap                              |
|  • Shared tasks with owners + due dates              |
|  • Progress overview per group                       |
+------------------------------------------------------+
```

## Parameters Needed for the Page
- Route params: none
- Query params: optional `?redirect=/path` (if user was sent here from a protected page)

## Data Needed to Render the Page
- Minimal static content (app name, tagline, feature list)
- Auth state (to redirect logged-in users)
- Optional: A/B test or announcement banner content (static config)

## Link Destinations for the Page
- **Log In** → `/login`
- **Sign Up** → `/signup`
- (Optional) Learn more / About → `/about` (if implemented)

## Tests for Verifying Rendering of the Page
1. **Renders key UI elements**
   - App title displays
   - Log In and Sign Up buttons are visible and clickable
2. **Redirect behavior for authenticated users**
   - If user is logged in, navigating to `/` redirects to `/dashboard`
3. **Redirect query param**
   - Visiting `/?redirect=/groups/123` and clicking Log In should preserve redirect intent (either via query or state)

---

# 2) Login Page

## Page Title
Log In

## Page Description
Purpose: Authenticate returning users.

**Mockup (low-fidelity):**
```
+-------------------------------------------+
| StudySync | Log In                        |
|-------------------------------------------|
| Email:    [____________________]          |
| Password: [____________________]          |
| [ Log In ]                                |
|-------------------------------------------|
| Forgot password?   Create account         |
+-------------------------------------------+
```

## Parameters Needed for the Page
- Query params: optional `?redirect=/path` (post-login redirect)
- Route params: none

## Data Needed to Render the Page
- UI state: email, password, validation errors, loading state
- API: auth endpoint response (token, user profile summary)
- Auth state storage: token persistence (e.g., localStorage) and in-memory auth context

## Link Destinations for the Page
- Submit success → `/dashboard` (or `redirect` target if provided)
- Create account → `/signup`
- Forgot password → `/reset-password` (optional)

## Tests for Verifying Rendering of the Page
1. **Form elements render**
   - Email input, password input, Log In button visible
2. **Validation**
   - Empty submit shows validation messages
3. **Auth success flow**
   - Successful login stores token and navigates to `/dashboard` (or redirect)
4. **Auth failure flow**
   - Invalid credentials display error banner/message and remain on page

---

# 3) Dashboard Page

## Page Title
Dashboard

## Page Description
Purpose: Provide a snapshot of the user’s groups, upcoming sessions, and tasks.

**Mockup (low-fidelity):**
```
+------------------------------------------------------+
| Top Nav: [Dashboard] [Groups] [Availability] [Tasks] |
+------------------------------------------------------+
| My Groups                 | Upcoming Sessions        |
|---------------------------+--------------------------|
| • CS Project Team         | Tue 6–7pm (CS Project)   |
| • Math Study Group        | Thu 5–6pm (Math)         |
|                           |                          |
+---------------------------+--------------------------+
| My Tasks Due                                          |
|------------------------------------------------------|
| [ ] Finish UI mockups (Group A) - Fri                |
| [ ] Review API design (Group B) - Sun                |
+------------------------------------------------------+
```

## Parameters Needed for the Page
- Route params: none
- Query params (optional):
  - `?group=GROUP_ID` to pre-filter task list
  - `?view=compact|full` to toggle layout (optional)

## Data Needed to Render the Page
- Auth state: current user id
- API data:
  - `GET /api/groups?memberId=...` → list of groups
  - `GET /api/sessions/upcoming?memberId=...` → upcoming sessions (optional if sessions are tracked)
  - `GET /api/tasks?assigneeId=...&status!=complete` → tasks assigned to user
- UI state:
  - selected group filter (optional)

## Link Destinations for the Page
- Group name click → `/groups/:groupId`
- “View all tasks” → `/tasks`
- “Update availability” → `/availability`
- “Create group” → `/groups/new` (optional)

## Tests for Verifying Rendering of the Page
1. **Protected route**
   - Unauthenticated user is redirected to `/login`
2. **Group list renders**
   - If API returns groups, they appear in “My Groups”
3. **Tasks list renders**
   - Tasks show checkbox + title + due date
4. **Empty states**
   - If no groups, show message and CTA (e.g., “Create or join a group”)
   - If no tasks, show “No tasks due” message
5. **Navigation links**
   - Clicking a group navigates to correct `/groups/:groupId`

---

# 4) Group Page

## Page Title
Group Page (Collaboration Space)

## Page Description
Purpose: Provide a central view for a single group: membership, shared tasks, and availability overlap.

**Mockup (low-fidelity):**
```
+------------------------------------------------------+
| Top Nav ...                                          |
+------------------------------------------------------+
| Group: CS Project Team   Members: Alice, Ben, ...    |
|------------------------------------------------------|
| Overlap (common times)                               |
|  • Thu 5–6pm                                         |
|  • Tue 6–7pm                                         |
|------------------------------------------------------|
| Tasks                                                |
| [ ] UI Prototype (Alice) - Fri                       |
| [ ] DB Schema (Ben) - Sun                            |
|------------------------------------------------------|
| [Add Task]   [View Availability]                     |
+------------------------------------------------------+
```

## Parameters Needed for the Page
- Route params:
  - `groupId` (required) from `/groups/:groupId`
- Query params (optional):
  - `?tab=overview|tasks|availability` (if using a tabbed view)

## Data Needed to Render the Page
- Auth state: current user id (to show permissions/actions)
- API data:
  - `GET /api/groups/:groupId` → group name, description, members
  - `GET /api/availability/overlap?groupId=...` → computed overlap slots
  - `GET /api/tasks?groupId=...` → group tasks
- UI state:
  - selected tab (if applicable)
  - task filter (status, assignee) (optional)

## Link Destinations for the Page
- Member profile click (optional) → `/users/:userId`
- Add task → `/groups/:groupId/tasks/new` (or open modal)
- View tasks → `/tasks?groupId=:groupId`
- View availability overlap / edit → `/availability?groupId=:groupId`

## Tests for Verifying Rendering of the Page
1. **Route param required**
   - Visiting `/groups/` without `groupId` shows error or redirects
2. **Group header renders**
   - Group name + member list visible
3. **Overlap section renders**
   - If overlap exists, show list of common time slots
   - If no overlap, show “No common time slot found” message
4. **Task list renders**
   - Tasks show title, assignee, due date
5. **Actions available only to members**
   - Non-members cannot access (redirect or “access denied”)
6. **Links**
   - “Add Task” navigates to correct route or opens modal

---

# 5) Availability Input Page

## Page Title
Availability Input

## Page Description
Purpose: Allow a user to set weekly availability, and optionally preview overlap with a selected group.

**Mockup (low-fidelity):**
```
+------------------------------------------------------+
| StudySync | Availability                             |
+------------------------------------------------------+
| Week Grid (select time blocks)                       |
|        Mon   Tue   Wed   Thu   Fri                   |
| 8–10   [ ]   [X]   [ ]   [X]   [ ]                   |
|10–12   [ ]   [X]   [ ]   [X]   [ ]                   |
|12– 2   [ ]   [ ]   [ ]   [X]   [ ]                   |
|------------------------------------------------------|
| [ Save ]   [ Clear ]                                 |
| Overlap Preview (optional): Thu 5–6pm, Tue 6–7pm      |
+------------------------------------------------------+
```

## Parameters Needed for the Page
- Route params: none
- Query params (optional):
  - `?groupId=:groupId` to show overlap preview for that group

## Data Needed to Render the Page
- Auth state: current user id
- API data:
  - `GET /api/availability?userId=...` → existing availability blocks
  - `PUT /api/availability` → save updated availability
  - If `groupId` provided:
    - `GET /api/availability/overlap?groupId=...` → group overlap preview after user updates (optional live calc)
- UI state:
  - selected blocks (set of time tokens)
  - save status (saving, saved, error)

## Link Destinations for the Page
- Back to dashboard → `/dashboard`
- If group context provided → `/groups/:groupId`

## Tests for Verifying Rendering of the Page
1. **Grid renders**
   - Time blocks appear for expected days and times
2. **Selection behavior**
   - Clicking a block toggles selection state
3. **Load existing data**
   - Pre-existing availability is pre-selected after load
4. **Save flow**
   - Clicking Save calls API and shows success message
5. **Group overlap preview**
   - With `?groupId=...`, overlap preview appears and updates after save (or after fetch)
6. **Empty state**
   - If no blocks selected, Save still works and clears availability on backend (if allowed)

---

# 6) Task Management Page

## Page Title
Task Management

## Page Description
Purpose: Create, assign, and track tasks for a group (or across groups). Show tasks by status and allow updates.

**Mockup (low-fidelity):**
```
+------------------------------------------------------+
| StudySync | Tasks                                    |
+------------------------------------------------------+
| New Task: [________________________]                 |
| Assign:  [ v ]   Due: [ mm/dd ]   Group: [ v ] [Add] |
|------------------------------------------------------|
| To Do                    In Progress        Complete |
|------------------------------------------------------|
| • UI Mockups (Dana)       • API Wiring (Carlos)      |
| • DB Schema (Ben)                                 •  |
+------------------------------------------------------+
```

## Parameters Needed for the Page
- Route params: none
- Query params (optional):
  - `?groupId=:groupId` filter tasks to one group
  - `?assigneeId=:userId` filter tasks by assignee
  - `?status=todo|inprogress|complete` for focused view

## Data Needed to Render the Page
- Auth state: current user id
- API data:
  - `GET /api/tasks?...` → tasks (filtered)
  - `POST /api/tasks` → create task
  - `PATCH /api/tasks/:taskId` → update status, assignment, due date
  - `GET /api/groups?memberId=...` → populate group filter
  - `GET /api/groups/:groupId/members` → populate assignee dropdown (when group selected)
- UI state:
  - new-task form fields
  - selected filters
  - drag/drop state (optional if implementing kanban)

## Link Destinations for the Page
- Task detail (optional) → `/tasks/:taskId`
- Back to group (if `groupId`) → `/groups/:groupId`
- Dashboard → `/dashboard`

## Tests for Verifying Rendering of the Page
1. **List sections render**
   - To Do, In Progress, Complete columns visible
2. **Create task**
   - Fill form and click Add creates task and appears in To Do
3. **Update status**
   - Changing status moves task to correct column
4. **Filtering**
   - With `?groupId=...`, only tasks from that group appear
5. **Assignee dropdown**
   - When a group is selected, assignee list populates with group members
6. **Empty states**
   - If no tasks, show “No tasks yet” message and keep form visible

---

## Notes for Implementation
- These pages are intended for **React** with a simple top navigation bar.
- Tests can be implemented as:
  - **Manual UI checklist** during development, and/or
  - Automated tests using **React Testing Library** + mock API responses.

