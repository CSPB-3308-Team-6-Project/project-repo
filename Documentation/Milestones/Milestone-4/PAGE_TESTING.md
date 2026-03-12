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
Purpose: Introduce Health & Emotion Tracker and display links to app functionalities. Provide a short feature summary so the purpose is clear before authentication. Allow users to log their current mood for the day quickly.
### Parameters
- **Route params**: n/a
- **Query params**: n/a
- **State params**: n/a
### Data
- **Auth state**: Page is accessible to all users. The nav menu's options will depend on if the user is signed in or not. (Sign in and Register/Sign out and Profile)
- **API data**: n/a
- **UI state**: Nav UI buttons will change in the nav depending on it the user is signed in or not.
### Link Destinations
- Logging a mood sends users to mood list

### List of Tests
- Page loads based on signed in/signed out
- Nav items appear
- All Nav buttons send user to the appropriate page
- Log a mood for the day sends user to list
- Loading state appears after logging
- Logging input page allows user to interact

### Mock:
```
User signed in
+------------------------------------------------------------------------------------------------------+
| Tracker                 [ Home ] [ Profile ] [ Trackers ] [ Reports ] [ Meet the Team ] [ Sign Out ] |
|------------------------------------------------------------------------------------------------------|
|                                                                                                      |
|                                  How are you feeling today?                                          |
|                             [User input that creates a tracker log]                                  |
|                                          [Log feeling]                                               |
|                                                                                                      |
+------------------------------------------------------------------------------------------------------+
```
```
User not Signed in
+-------------------------------------------------------------------------------------------------------+
| Tracker                                           [ Home ] [ Register ] [ Meet the Team ] [ Sign In ] |
|------------------------------------------------------------------------------------------------------ |
| About the App                                                                                         |
|                                                                                                       |
+-------------------------------------------------------------------------------------------------------+
```


---

## 2) Profile Page
### Page Title
Profile
### Page Description
Purpose: Existing users can view their account profile and edit information such as password and email.
### Parameters
- **Route params**: n/a
- **Query params**: n/a
- **State params**: User data {name, email, id, etc}
### Data
- **Auth state**: User must be authenticated- the page is only accessible to existing users
- **API data**: n/a
- **UI state**: Form data for the user is filled in when they land here.
### Link Destinations
- Nav items
- Link to Edit form (will populate in the same page)
- Redirects to '/' after deletion
### List of Tests
- All fields populate the correct information
- Edit and Delete account buttons appear
- Edit allows information to be edited
- Delete account asks user if they are sure they want to delete
- Loading state appears after delete/edit
- User information is updated after editing
- User information is cleared after deleting
- User is sent home after deleting


### Mock:
```
+-------------------------------------------------------------------------------+
| Tracker                                     [Nav Items (see Home for details)]|
|-------------------------------------------------------------------------------|
| Profile                                                                       |
| User Information                                                              |
| [Edit Info]                                                  [Delete Account] |
+-------------------------------------------------------------------------------+
```

---

## 3) Reports Page
### Page Title
Reports
### Page Description
Purpose: Existing users can view summary statistics and trends for their mood logging
### Parameters
- **Route params**: userID
- **Query params**:
- **State params**: userID, userTrackingData
### Data
- **Auth state**: user must be authenticated- the page is only accessible to existing users
- **API data**:
- **UI state**: User data for the user that is logged in is loaded. Log data for the user is loaded and passed down. Filters begin in the default settings
### Link Destinations
- Outside nav items, links to specific logs to edit

### List of Tests
- Charts and Stats load
- Filters load
- Filters filter the charts/stats
- Calendar updates the filters/charts

### Mock:
```
+--------------------------------------------------------+
| Tracker                                     [Nav Items]|
|--------------------------------------------------------|
| Reports                                      [Filters] |
| {Chart or Stat info based on Filters and data loaded}  |
+--------------------------------------------------------+
```

---

## 4) Log Mood Page
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

### Mock:
```
+--------------------------------------------------------+
| Tracker                                     [Nav Items]|
|--------------------------------------------------------|
| Log a Mood                                             |
|                                                        |
|   {Form Information emptied initially}                 |
|   {Form name}                                          |
|   {Form Mood}                                          |
|   {Etc.}                                               |
+--------------------------------------------------------+
```

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

### Mock:
```
+--------------------------------------------------------+
| Tracker                                     [Nav Items]|
|--------------------------------------------------------|
| Log a Mood                                             |
|                                                        |
|   [ Tracked Mood Item          [Edit/Delete Button] ]  |
|   [ Tracked Mood Item          [Edit/Delete Button] ]  |
|   [ Tracked Mood Item          [Edit/Delete Button] ]  |
|   [ Tracked Mood Item          [Edit/Delete Button] ]  |
+--------------------------------------------------------+
```

### Mock:
```
+--------------------------------------------------------+
| Tracker                                     [Nav Items]|
|--------------------------------------------------------|
| Mood Log Edit Form                        [Delete Log] |
|                                                        |
|   {Logged Modd Form Filled in}                         |
|   {Form name filled in}                                |
|   {Form Mood filled in}                                |
|   {Etc.}                                               |
|                                                        |
|   [Save Changes]                                       |
+--------------------------------------------------------+
```

---

## 6) Register Page
### Page Title
Register
### Page Description
Purpose: This page allows a new user to create a profile by entering their basic account information.

 ```test
+--------------------------------------------------------+
| Tracker                                     [Nav Items]|
|--------------------------------------------------------|
|                        REGISTER                        |
|                                                        |
|                  Name*: [______________]               |
|                 Email*: [______________]               |
|                   CuID: [______________]               |
|              Password*: [______________]               |
|       Confirm Password: [______________]               |
|                                                        |
|                     [ Submit ]                         |
+--------------------------------------------------------+
``` 

### Parameters
- **Route params**: None
- **Query params**: None
- **State params**: Form input values for first name, last name, email and password.
### Data
- **Auth state**: None- accessible to new users
- **API data**: None at the moment. This page uses a server action instead of an API route for form submission.
- **UI state**: Empty form fields on initial render then user input values in the fields before submission

### Link Destinations
Register button → createUser → redirect to /profile
Cancel button → redirects to /

### List of Tests
1. Register page loads
2. Form fields appear on screen
3. Fields are empty on initial load
4. User can type in fields
6. Cancel button appears
7. Submit button appears
8. Submitting valid data calls create server action
9. Successful submission redirects to profile
10. Cancel button redirects to homepage

---

## 6) Login Page
### Page Title
Login
### Page Description
Purpose: Allows the users to login and access their data

 ```test
+--------------------------------------------------------+
| Tracker                                     [Nav Items]|
|--------------------------------------------------------|
|                          Login                         |
|                                                        |
|                 Email*: [______________]               |
|              Password*: [______________]               |
|                                                        |
|                     [ Submit ]                         |
+--------------------------------------------------------+
``` 

### Parameters
- **Route params**: None
- **Query params**: None
- **State params**: Form input values for email and password.
### Data
- **Auth state**: None- accessible to new users
- **API data**: None at the moment. This page uses a server action instead of an API route for form submission.
- **UI state**: Empty form fields on initial render then user input values in the fields before submission

### Link Destinations
Login button → check that user is within tables in Database -> sign in with Next-Auth → redirect to /list
Cancel button → redirects to /

### List of Tests
1. Login page loads
2. Form fields appear empty on screen
3. User can type in fields
4. Password can be hidden/unhidden
5. Submit button appears
6. Submitting valid data calls create server action/loads the page
7. Successful submission redirects to profile






