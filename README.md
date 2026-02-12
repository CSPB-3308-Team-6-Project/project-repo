# Team 6 Project README
_In alignment with Milestone 1, this README has been created with the following information_

## Project Title
Health Tracker - General Health/feeling with numerical answers to basic questions + stats/graphs/report

```
NOTES: 
Ideas for Proposal: 
  1. Work out app that directs you specific work outs and videos for workouts
    - Logging of workout sessions
  2. Calorie tracker with math based on variables (personal and external)
    - Sport/Weather/Body weight
  3. Animal care tracking
  4. Injury Tracking
    - Yes/no questions
    - 
  6. Health Tracking
    - How many glasses of water? How many hours of sleep? etc.
    - 

     Tracker--
       - Guidance based on the user
       - Prompts after a track to see how the results are -> gives report at end
    


     (Wants to make sure this will be something we can all track and connect with so we can see growth as use ourselves as a growth)
```

## Team Information
- **Team Number:** 6
- **Team Name:** The Trackers

### Team Members
_For more info, in the Repo go to Documentation -> Collaborators_Info_

- **Carl Seaholm** (GitHub: `cdseaholm`, Email: cdseaholm@gmail.com)
- **Conner Mongoven** (GitHub: `mongovencm`, Email: Conner.Mongoven@colorado.edu)
- **Ledys De La Rosa** (GitHub: `ledy11`, Email: Ledy.DeLaRosa@colorado.edu)
- **Linda Maccagnan** (GitHub: `lmaccagnan`, Email: Linda.Maccagnan@colorado.edu)

### Scheduled Weekly Team Meeting
**Wednesdays, 5:00 PM MT**
30-60 minutes via Zoom

---

## Vision Statement - Linda
Heath Tracker is a personal web application designed to help an individual track progress on variables that support general health and well-being. The application will allow users to easily track data such as amount of water, sleep, exercise, general nutrition, etc. each day and provide reporting to the user can see progress. 

---

## Motivation - Linda
People generally know what is recommended for general health and well-being, but keeping track of progress is hard, especially if the recommendations are not already a part of your normal habits. Using an easy interface to track daily activities can help provide gentle reminders and reports can sustain motivation for continued progress and habit building. 

---

## Risks to Project Completion - Ledy

---

## Mitigation Strategy - Conner

---

## Development Method

The TRACKERS will follow an Agile, sprint-based approach with weekly planning meetings,
short development iterations, and continuous integration. Each task will be broken into
small, testable components, allowing the project to adapt based on progress and
challenges.

---

## Development Steps - Carl

---

## Project Tracking

The Project Tracking is done via Github within the Organization we are all a part of (Prof included). [Here is a link to the Project Board](https://github.com/orgs/CSPB-3308-Team-6-Project/projects/3)

---

## Technology Stack

I plugged my 3 options into ChatGPT to give a detailed explanation of Pros/Cons. I don't want anyone to feel like I'm steering us in a certain direction because I'm down with whatever, I just want to give full transparency to some general options

Option 1: Next.js (React/TypeScript) + MongoDB

Frontend: Next.js with React and TypeScript for building the UI, handling forms, and rendering graphs.
Backend: Next.js API routes for server-side logic, integrated with MongoDB for storing user health data (NoSQL, schemaless for flexibility with varying question responses).
Pros: Carl has a ton of experience with it, Fast development with SSR/SSG for better performance; TypeScript adds type safety; MongoDB is lightweight and scales well for unstructured data like health logs.
Cons: A bit more challening. MongoDB is NoSQL, so it doesn't directly satisfy the SQL interest Ledy had— you'd need to pivot to something like Prisma ORM with a SQL DB if wanted SQL.
Team Fit: Good for the HTML/CSS learner (React involves a lot of component styling with CSS-in-JS or Tailwind). I can handle the heavy lifting and fill in, allowing others to focus where they want to focus. For SQL interest, it's a stretch unless you swap MongoDB for PostgreSQL.

Option 2: Flask (Python) + SQLite + HTML/CSS/JavaScript

Frontend: Vanilla HTML/CSS with JavaScript (or a light framework like Bootstrap for styling and responsiveness), using Flask's Jinja templates for dynamic rendering. Add Chart.js for graphs.
Backend: Flask for routing, form handling, and API endpoints. Use SQLite as the lightweight SQL database for storing data—it's file-based, no server setup needed.
Why this? As you suggested, it's Python-based and simple for a backend-focused app. Flask keeps things minimal, and SQLite introduces SQL without complexity.
Pros: Quick to set up; Flask is beginner-friendly for Python devs. SQLite satisfies the SQL desire with real queries (e.g., SELECT for stats). Pure HTML/CSS lets the team member dive deep into styling without framework overhead. Easy local testing and deployment (e.g., via Heroku).
Cons: Less "modern" feel than React—manual DOM manipulation in JS could feel clunky for interactive graphs. Scaling might require migrating to a full SQL DB like PostgreSQL later.
Team Fit: Perfect for the SQL learner (hands-on with database schemas and queries). The HTML/CSS enthusiast gets direct exposure to building layouts and styles from scratch. You can lead on Python logic if needed, and it's a good "learn by doing" stack overall.

Option 3: Express.js (Node.js) + PostgreSQL + HTML/CSS/JavaScript

Frontend: HTML/CSS with vanilla JavaScript (or EJS templates for dynamic views), plus a library like Chart.js for graphs. Keep it simple to emphasize raw styling.
Backend: Express.js for server-side routing and API, connected to PostgreSQL (a robust SQL DB) via an ORM like Sequelize for easier queries.
Why this? It's a JavaScript-full-stack alternative to your Next.js preference, bridging to SQL while staying lightweight. PostgreSQL is free and powerful for structured health data (e.g., tables for users, questions, and metrics).
Pros: All JS ecosystem, so transferable skills if anyone knows basic web dev. PostgreSQL handles complex queries well for stats (e.g., aggregations for graphs). Easy integration with frontend templates. Deployment via platforms like Render or AWS Free Tier.
Cons: Requires some Node.js setup knowledge; not as batteries-included as Flask or Next.js. If the team is Python-leaning, it might feel like a shift.
Team Fit: Directly hits the SQL goal with PostgreSQL (real relational DB experience). The HTML/CSS focus shines in template rendering without heavy frameworks. You can tie it back to your JS comfort zone, making it a collaborative middle ground.
