# Team 6 Project README

## Project Title
Health Tracker - General Health/feeling with numerical answers to basic questions + stats/graphs/report

## Team Information
- **Team Number:** 6
- **Team Name:** The Trackers

### Team Members
_For more info, in the Repo go to Documentation -> Collaborators_Info_

- **Carl Seaholm** (GitHub: `cdseaholm`, Email: cdseaholm@gmail.com)
- **Conner Mongoven** (GitHub: `mongovencm`, Email: Conner.Mongoven@colorado.edu)
- **Ledy De La Rosa** (GitHub: `ledy11`, Email: Ledy.DeLaRosa@colorado.edu)
- **Linda Maccagnan** (GitHub: `lmaccagnan`, Email: Linda.Maccagnan@colorado.edu)
- **Stephanie Gillihan** (GitHub: `sgillihan`, Email: Stephanie.Gillihan@colorado.edu)

## Needs updating from here ##

- 5-minute customer demo video: [Demo Video](https://youtu.be/studysync-demo) -- update to last piece of presentation
- Public deployment site: [Trackers APP](https://trackers-3308.vercel.app/)

## Repository Readiness
All team members have verified that their latest work is pushed to the remote
repository.

The repository contains the following required files and assets:
- README.md
- WEEKLY_STATUS.md
- PAGE_TESTING.md
- SQL_TESTING.md
- FINAL_REPORT.md
- Project presentation files from the Presentation Milestone
- Video of demo
- Source code (frontend and backend)
- Test cases (unit and integration)
- Source documentation and auto-generated documentation files
  
## Final Status Report

### What We Completed
- Working MVP including:
  - User authentication
  - Profile Creation and Profile management
  - Emotion creation, editing and removal from correct databases; updated in the UI for user convience.
  - Next.js/React frontend with a consistent navigation wrapper
  - FastAPI backend with REST endpoints
  - PostgreSQL database with a relational schema, including 3 tables
  - Public deployment of the application via Verclel
  - Reports page which displays multiple statistical views of saved emotions
  - Project presentation slides and a customer-facing demo video
  
### What We Planned for the Future
- Creating more trackers for the user to utilize. I.E. Water Intake, Monthly Cycle, Nutrition, Excercise, Medications, Pet Supplments
- Additional themes (including dark mode)
- More advanced UI features
- More in depth report charts + views.
  
### Known Problems and Limitations
- None that have been reported


## System and Tests General Overview

TRACKERS uses a standard three-tier architecture:
- Frontend: Next.js/React
- Backend: Next.js/Prisma
- Database: Supabase/PostgreSQL

## Pages That Access Database Information
| Page     | Tables Accessed               |
|----------|-------------------------------|
| Login    | users                         |
| Profile  | users, trackers               |
| Reports  | users, trackers, trackerPosts |
| Tracking | users, trackers, trackerPosts |
| Register | users                         |
  
## Page Data Access Tests (High-Level)

### Use case name
Server Prefetch

### Description
Server page loads initially with data fetch for page

### Pre-conditions
- User account exists
- User is logged in
  
### Test steps
1. Assure correct navigation buttons are visible for logged in user vs non-logged in user
2. Only user info is displayed if logged in
   
### Expected result
- Correct UI is present and data is displayed in a meaningful way.
  
### Actual result
- Correct UI is present and data is displayed in a meaningful way.
  
### Status
Pass
