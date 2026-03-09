# PAGE_TESTING.md
This document defines the **pages** StudySync will implement and
what is required to (1) render them correctly and (2) test them
consistently.
At least **5 independent pages** are included below.
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
# 1) Landing Page
## Page Title
Landing Page (Welcome)
## Page Description
Purpose: Introduce StudySync and allow users to log in or create
an account. Provide a short feature summary so the purpose is
clear before authentication.
**Mockup (low-fidelity):**
```
+------------------------------------------------------+
| StudySync |
| "Coordinate study sessions, tasks, and progress." |
|------------------------------------------------------|
| [ Log In ] [ Sign Up ] |
|------------------------------------------------------|
| Features |
| Shared tasks with owners + due dates |
| `/login`
- **Sign Up** `/about` (if implemented)
## Tests for Verifying Rendering of the Page
1. **Renders key UI elements**
- App title displays
- Log In and Sign Up buttons are visible and clickable
2. **Redirect behavior for authenticated users**
- If user is logged in, navigating to `/` redirects to
`/dashboard`
3. **Redirect query param**
- Visiting `/?redirect=/groups/123` and clicking Log In should
preserve redirect intent (either via query or state)
---
# 2) Login Page
## Page Title
Log In
## Page Description
Purpose: Authenticate returning users.
**Mockup (low-fidelity):**
```
+-------------------------------------------+
| StudySync | Log In |
|-------------------------------------------|
| Email: [____________________] |
| Password: [____________________] |
| [ Log In ] |
|-------------------------------------------|
| Forgot password? Create account |
+-------------------------------------------+
```
## Parameters Needed for the Page
- Query params: optional `?redirect=/path` (post-login redirect)
- Route params: none
## Data Needed to Render the Page
- UI state: email, password, validation errors, loading state
- API: auth endpoint response (token, user profile summary)
- Auth state storage: token persistence (e.g., localStorage) and
in-memory auth context
## Link Destinations for the Page
- Submit success `/signup`
- Forgot password s groups, upcoming sessions, and tasks.
**Mockup (low-fidelity):**
```
+------------------------------------------------------+
| Top Nav: [Dashboard] [Groups] [Availability] [Tasks] |
+------------------------------------------------------+
| My Groups | Upcoming Sessions |
|---------------------------+--------------------------|
| 7pm (CS Project) |
| 6pm (Math) |
| | |
+---------------------------+--------------------------+
| My Tasks Due |
|------------------------------------------------------|
| [ ] Finish UI mockups (Group A) - Fri |
| [ ] Review API design (Group B) - Sun |
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
- `GET /api/groups?memberId=...` upcoming sessions (optional if
sessions are tracked)
- `GET /api/tasks?assigneeId=...&status!=complete`
`/groups/:groupId`
- Update availability `/availability`
- My GroupsCreate or join a groupNo tasks due Thu 5 Tue 6 group
name, description, members
- `GET /api/availability/overlap?groupId=...` group tasks
- UI state:
- selected tab (if applicable)
- task filter (status, assignee) (optional)
## Link Destinations for the Page
- Member profile click (optional) `/groups/:groupId/tasks/new`
(or open modal)
- View tasks `/availability?groupId=:groupId`
## Tests for Verifying Rendering of the Page
1. **Route param required**
- Visiting `/groups/` without `groupId` shows error or
redirects
2. **Group header renders**
- Group name + member list visible
3. **Overlap section renders**
- If overlap exists, show list of common time slots
- If no overlap, show message
4. **Task list renders**
- Tasks show title, assignee, due date
5. **Actions available only to members**
- Non-members cannot access (redirect or )
6. **Links**
- navigates to correct route or opens modal
---
# 5) Availability Input Page
## Page Title
Availability Input
## Page Description
Purpose: Allow a user to set weekly availability, and optionally
preview overlap with a selected group.
**Mockup (low-fidelity):**
```
+------------------------------------------------------+
| StudySync | Availability |
+------------------------------------------------------+
| Week Grid (select time blocks) |
| Mon Tue Wed Thu Fri |
| 812 [ ] [X] [ ] [X] [ ] |
|126pm, Tue 6 existing availability blocks
- `PUT /api/availability` group overlap preview after user
updates (optional live calc)
- UI state:
- selected blocks (set of time tokens)
- save status (saving, saved, error)
## Link Destinations for the Page
- Back to dashboard `/groups/:groupId`
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
- With `?groupId=...`, overlap preview appears and updates
after save (or after fetch)
6. **Empty state**
- If no blocks selected, Save still works and clears
availability on backend (if allowed)
---
# 6) Task Management Page
## Page Title
Task Management
## Page Description
Purpose: Create, assign, and track tasks for a group (or across
groups). Show tasks by status and allow updates.
**Mockup (low-fidelity):**
```
+------------------------------------------------------+
| StudySync | Tasks |
+------------------------------------------------------+
| New Task: [________________________] |
