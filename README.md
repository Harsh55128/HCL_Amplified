🎯 LearnPath AI

An AI-powered personalized learning platform that helps learners define goals, identify skill gaps, and follow a structured learning path.

🚀 Overview

LearnPath AI is a personalized learning platform designed to help users understand what they need to learn, where they currently stand, and how they can reach their learning goals.

Instead of following the same learning roadmap as everyone else, LearnPath AI uses the learner's profile, existing skills, target goal, and available learning time to create a more personalized journey.

Core Workflow

Landing Page
     ↓
User Onboarding
     ↓
Create Learning Goal
     ↓
AI Goal Analysis
     ↓
Required Skills
     ↓
Skill Gap Analysis
     ↓
Personalized Learning Path
     ↓
Learning & Progress Tracking

✨ Features

🏠 Professional Landing Page

The application starts with a modern landing page that explains the purpose and benefits of LearnPath AI.

It introduces:

🎯 Goal-based learning

🧠 Skill tracking

📊 Skill gap analysis

🤖 AI-powered recommendations

🗺️ Personalized learning paths

📈 Progress-focused learning

👤 User Onboarding

Users create their learning profile before starting their personalized journey.

The onboarding flow collects information such as:

Name

Email

Existing skills

Skill proficiency

Weekly learning hours

Learning preferences

This information is used to personalize the learning experience.

🎯 Learning Goals

Users can create goals based on what they want to achieve.

Example:

Goal:
Become a Full Stack Developer

Target:
Build production-ready web applications

When a goal is created, the backend can use AI to analyze the goal and determine the skills required to achieve it.

🧠 Skill Tracking

Users can maintain a list of their existing skills and proficiency levels.

Example:

JavaScript     → 70%
React          → 55%
Node.js        → 40%
MongoDB        → 35%

These skill levels provide the foundation for skill-gap analysis.

📊 Skill Gap Analysis

LearnPath AI compares the learner's current skill level with the skill level required for their selected goal.

Example:

JavaScript
Current: 70%
Required: 90%
Gap: 20%

React
Current: 55%
Required: 85%
Gap: 30%

Node.js
Current: 40%
Required: 80%
Gap: 40%

This allows learners to immediately understand which areas require the most attention.

🗺️ Personalized Learning Path

After analyzing the skill gaps, the application generates a learning path.

A learning path can contain:

Required skills

Learning steps

Descriptions

Estimated learning hours

Recommended order of learning

Example:

1. Strengthen JavaScript fundamentals
2. Learn advanced React concepts
3. Build REST APIs with Node.js
4. Learn MongoDB
5. Build a full-stack project

🤖 AI Integration

LearnPath AI integrates an LLM service to analyze learning goals and generate personalized recommendations.

The backend uses the Google Gemini API through the @google/genai package.

The Gemini API key is provided through an environment variable:

GEMINI_API_KEY=your_api_key

The application can also use:

GEMINI_MODEL=your_model_name

If GEMINI_MODEL is not provided, the backend uses its configured default model.

Never commit API keys or .env files to GitHub.

# 🏗️ Project Architecture

The project is divided into two main applications:

- **Client** → React frontend
- **Server** → Node.js + Express backend

```text
LearnPath AI/
│
├── client/                    # React frontend
│   │
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── config/
│   │   └── ...
│   │
│   ├── package.json
│   └── ...
│
├── server/                    # Node.js + Express backend
│   │
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── app.js
│   │   └── server.js
│   │
│   ├── package.json
│   └── ...
│
├── .gitignore
├── README.md
└── ...
```

### 🔄 Application Flow

```text
                    ┌─────────────────────┐
                    │   React Frontend    │
                    │      (client)       │
                    └──────────┬──────────┘
                               │
                               │ REST API
                               ▼
                    ┌─────────────────────┐
                    │  Express Backend    │
                    │      (server)       │
                    └──────────┬──────────┘
                               │
                 ┌─────────────┼─────────────┐
                 ▼             ▼             ▼
          ┌────────────┐ ┌───────────┐ ┌────────────┐
          │  MongoDB   │ │  Gemini   │ │ REST APIs │
          │  Database  │ │    AI     │ │            │
          └────────────┘ └───────────┘ └────────────┘
```

### 📂 Backend Structure

```text
server/
└── src/
    ├── config/
    │   └── db.js
    │
    ├── controllers/
    │   ├── goal.controller.js
    │   ├── graph.controller.js
    │   ├── learningPath.controller.js
    │   ├── skillGap.controller.js
    │   ├── user.controller.js
    │   └── userSkill.controller.js
    │
    ├── models/
    │   └── ...
    │
    ├── routes/
    │   └── ...
    │
    ├── services/
    │   └── ...
    │
    ├── app.js
    └── server.js
```

### 📂 Frontend Structure

```text
client/
└── src/
    ├── components/
    ├── pages/
    ├── services/
    ├── config/
    └── ...
```

> The exact files and folders may evolve as the project grows.

🛠️ Technology Stack

Frontend

React

React Router

JavaScript

Tailwind CSS

Fetch API

Backend

Node.js

Express.js

REST APIs

MongoDB

Mongoose

Google Gemini / @google/genai

Deployment

The application is designed to be deployable using services such as:

Render for backend hosting

Render or another static hosting provider for frontend hosting

MongoDB Atlas for cloud database hosting

🔌 Backend API

The backend exposes REST API endpoints for users, goals, skills, skill-gap analysis, and learning paths.

Base URL during local development:

http://localhost:5000/api

Health Check

GET /api/health

Users

GET    /api/users/:userId
GET    /api/users/email/:email
POST   /api/users

User Skills

GET /api/users/:userId/skills

Goals

GET  /api/goals/:userId
GET  /api/goals/:userId/:goalId
POST /api/goals/:userId

Skill Gap Analysis

GET /api/skill-gaps/:userId/:goalId

Learning Path

GET /api/learning-path/:userId/:goalId

💻 Local Development

Prerequisites

Make sure the following are installed:

Node.js

npm

MongoDB or a MongoDB Atlas connection

Git

Check Node.js:

node --version

Check npm:

npm --version

📥 Clone the Repository

Clone the project:

git clone https://github.com/Harsh55128/HCL_Amplified.git

Move into the project:

cd HCL_Amplified

If frontend and backend are separate folders, install dependencies inside each folder.

Backend

cd server
npm install

Frontend

Open another terminal:

cd client
npm install

If your repository uses different folder names, use the actual frontend/backend directories shown in your repository.

🔐 Backend Environment Variables

Inside the backend directory, create a .env file.

Example:

PORT=5000
MONGO_URI=your_mongodb_connection_string
GEMINI_API_KEY=your_gemini_api_key
GEMINI_MODEL=your_gemini_model

Do not commit .env to GitHub.

Make sure .gitignore contains:

node_modules/
.env
.env.*
!.env.example

▶️ Run the Backend

From the backend directory:

npm start

The backend should start on:

http://localhost:5000

You can test the health endpoint:

http://localhost:5000/api/health

▶️ Run the Frontend

From the frontend directory:

npm run dev

The terminal will display the local frontend URL, commonly:

http://localhost:5173

Open that URL in your browser.

🔗 Connecting Frontend to Backend

The frontend API service should point to the deployed backend in production.

For local development:

const API_BASE_URL = "http://localhost:5000/api";

For production, replace it with the deployed backend URL:

const API_BASE_URL = "https://YOUR-BACKEND-NAME.onrender.com/api";

It is recommended to use an environment variable for production:

VITE_API_BASE_URL=https://YOUR-BACKEND-NAME.onrender.com/api

Then access it in the frontend:

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

☁️ Deployment

Backend Deployment on Render

Push the project to GitHub.

Open Render.

Create a new Web Service.

Connect the GitHub repository.

Select the backend directory if the backend is inside server/.

Set the build command:

npm install

Set the start command:

npm start

Add the required environment variables in Render:

MONGO_URI
GEMINI_API_KEY
GEMINI_MODEL
PORT

Render provides the PORT environment variable automatically, so the server should use:

const PORT = process.env.PORT || 5000;

The Express server must listen on the Render-provided port.

🌐 Frontend Deployment

After the backend is successfully deployed:

Copy your Render backend URL.

Update the frontend API base URL.

Commit and push the changes.

Create a frontend deployment.

Connect the GitHub repository.

Configure the frontend build command:

npm install
npm run build

Set the publish directory according to your frontend setup, commonly:

dist

Add:

VITE_API_BASE_URL=https://YOUR-BACKEND-NAME.onrender.com/api

Deploy the frontend.

🔒 CORS

The Express backend enables CORS so that the deployed frontend can communicate with the backend.

Example:

const cors = require("cors");

app.use(cors());

For production, CORS can be restricted to the frontend's deployed domain.

🧪 Testing the Application

After deployment, test the complete flow:

Landing Page
      ↓
Onboarding
      ↓
Create User
      ↓
Dashboard
      ↓
Create Goal
      ↓
Goal Analysis
      ↓
Required Skills
      ↓
Skill Gap Analysis
      ↓
Learning Path

Also verify:

User creation works

Existing users can be loaded

Goals are created successfully

Goals appear on the dashboard

Required skills are displayed

Skill gaps are calculated/displayed

Learning paths load correctly

AI-powered goal analysis works

Frontend can communicate with the deployed backend

🧰 Troubleshooting

Backend says a package is missing

Run:

npm install

Make sure every package used by the backend is present in server/package.json.

For example, if the code contains:

require("@google/genai");

then @google/genai must be listed under dependencies in package.json.

Do not upload node_modules to GitHub.

CORS Error

Check:

Backend is running

Frontend is using the correct backend URL

Backend has CORS enabled

Production frontend URL is allowed by the backend

Gemini API Error

Check that the deployment environment contains:

GEMINI_API_KEY

Never put the Gemini API key directly inside frontend code.

MongoDB Connection Error

Check:

MONGO_URI

and verify that the deployed server is allowed to connect to your MongoDB Atlas cluster.

📁 Recommended .gitignore

node_modules/
.env
.env.local
.env.production
dist/
build/
.DS_Store

🔐 Security Notes

Never commit:

API keys

MongoDB passwords

.env files

Authentication secrets

node_modules

Use environment variables for all secrets.

🚀 Future Improvements

Potential future enhancements include:

📝 Skill-specific quizzes

🎯 Automatic skill-level updates after assessments

📚 Resource recommendations for learning topics

🔖 Save/bookmark learning resources

📈 Detailed progress analytics

🏆 Learning achievements and streaks

🔔 Learning reminders

🤖 More advanced AI recommendations

👥 Social/community learning

📱 Mobile-responsive PWA/mobile application

🎓 Project Objective

LearnPath AI aims to transform the traditional learning experience from:

"What should I learn?"

into:

"What do I need to learn,
what am I missing,
and what should I do next?"

The platform combines user profiling + skill tracking + AI analysis + skill-gap identification + personalized learning paths to provide a goal-oriented learning experience.

👨‍💻 Getting Started Quickly

For a quick local setup:

git clone https://github.com/Harsh55128/HCL_Amplified.git

cd HCL_Amplified

# Install backend dependencies
cd server
npm install

# Configure .env
# Start backend
npm start

Then, in another terminal:

cd client
npm install
npm run dev

📌 Repository

GitHub:

https://github.com/Harsh55128/HCL_Amplified
