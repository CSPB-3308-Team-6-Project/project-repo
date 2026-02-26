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
- **Ledys De La Rosa** (GitHub: `ledy11`, Email: Ledy.DeLaRosa@colorado.edu)
- **Linda Maccagnan** (GitHub: `lmaccagnan`, Email: Linda.Maccagnan@colorado.edu)
- **Stephanie Gillihan** (GitHub: `sgillihan`, Email: Stephanie.Gillihan@colorado.edu)

### Scheduled Weekly Team Meeting
**Wednesdays, 5:00 PM MT**
30-60 minutes via Zoom

---

## Vision Statement
Heath Tracker is a personal web application designed to help an individual track progress on variables that support general health and well-being. The application will allow users to easily track data such as amount of water, sleep, exercise, general nutrition, etc. each day and provide reporting to the user can see progress. 

---

## Motivation
People generally know what is recommended for general health and well-being, but keeping track of progress is hard, especially if the recommendations are not already a part of your normal habits. Using an easy interface to track daily activities can help provide gentle reminders and reports can sustain motivation for continued progress and habit building. 

---

## Risks to Project Completion
### Communication Gaps in a Remote Environment
Because the team operates entirely remotely, there is an increased risk of miscommunication, delayed responses, or unclear expectations regarding task ownership and deliverables. 

### Time Underestimation
Software development tasks may take longer than anticipated due to debugging, integration issues, and unforeseen technical challenges. There is also a risk of not allocating sufficient time to properly design, implement, and test specific features. 

### Technical Challenges and Learning Curves
Some team members will be working with new programming languages, frameworks, or development tools for the first time. This learning curve may slow early development and introduce errors as concepts are being learned and applied simultaneously.

---

## Mitigation Strategy
### Clear Communication Practices
To reduce miscommunication and unclear expectations, the team will hold consistent weekly meetings and use a shared communication platform for day-to-day questions and updates. Tasks will be clearly defined and tracked in a shared project board to ensure ownership and visibility. Meeting notes and decisions will be documented to keep everyone aligned and prevent misunderstandings.

### Incremental Progress Tracking
To avoid underestimating time, the team will break features into small tasks and track progress against initial estimates. If a task begins taking longer than expected, it will be reevaluated, simplified, or redistributed among team members. Regular progress check-ins will allow the team to adust priorities so any delays do not block overall development. 

### Early Familiarization with Technology
To address learning curves, the team will decide on a technology stack early and spend initial time experimenting with setup and small prototypes. Team members will collaborate through code reviews and shared debugging sessions, and documnetation will be maintained to help everyone understand design decisions and implementation details.

---

## Development Method

The TRACKERS will follow an Agile, sprint-based approach with weekly planning meetings,
short development iterations, and continuous integration. Each task will be broken into
small, testable components, allowing the project to adapt based on progress and
challenges.

---

## Development Steps

  1. Decide on the requirements needed to solve the problem we aim to fix
      - The stack we will need
      - The scope of the work (number of user pathways)
      - Level of user interaction
      - Types of reporting, stats, and graphs
  2. Design database schema (types) for users, trackers, graphs, and reporting
  3. Begin building a skeleton to work from
      - Frontend: Basic Homepage, Profile, and Route layouts (not fully implemented yet)
      - Backend: Structure API routes with types assigned so the UI can test Database interactions
  4. Fill in frontend routes such as Graphs, Reporting, Manipulating tasks (creating, editing, deleting, etc), Profile, homepage, modals(?).
  5. Sew together Frontend and Backend while testing to assure cohesion and user stability
  6. Test Frontend and Backend further after both have been fully integrated together. (More so frontend testing here)
  7. Stylize, Polish, and Fill gaps
  8. Finalize

---

## Project Tracking

The Project Tracking is done via Github within the Organization we are all a part of (Prof included). [Here is a link to the Project Board](https://github.com/orgs/CSPB-3308-Team-6-Project/projects/3)

---

## Technology Stack

### Frontend
- HTML and CSS with Tailwind for layout and styling
- JavaScript with React and Mantine for interactive UI components

### Backend
- Prisma and Supabase(SQL) with RESTful API routes leveraging connection to our Supabase database
  
### Database
- PostgreSQL for development, with the option to migrate to SQLite/Flask(Python)/MongoDB(final fallback) depending on how backend work goes


