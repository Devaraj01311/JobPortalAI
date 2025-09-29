# JobPortalAI


JobPortalAI is an intelligent job portal web application that automates the job search and application process using AI. Users can upload their resumes, and the system automatically extracts skills, matches jobs, and applies on behalf of the user, streamlining job hunting.

## Features

- **User Authentication**: Sign up, log in, and manage profiles securely.
- **Resume Upload & Parsing**: Users can upload resumes, and the AI extracts key skills and experience.
- **Job Matching**: Automatically matches users to relevant job listings based on extracted skills.
- **Auto-Apply**: Users can enable auto-apply, letting the system submit applications for suitable jobs.
- **Job Listings**: Browse latest jobs in a responsive 4-column grid.
- **Search & Filter**: Search for jobs by title, location, or company.
- **Infinite Scroll / Load More**: Jobs load dynamically as you scroll down.
- **Real-Time Notifications**: Receive alerts for new matched jobs and application status.
- **Responsive Design**: Works across devices (desktop, tablet, mobile).

---

##  Tech Stack

- **Frontend**: React, Tailwind CSS, Axios
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT
- **AI & Resume Parsing**: OpenAI / NLP-based skill extraction
- **Hosting**: Netlify (frontend) & Render/Heroku (backend)
- **Others**: Socket.io for real-time notifications

## ⚡ Getting Started

### Prerequisites

- Node.js v18+
- npm or yarn
- MongoDB instance
- OpenAI API Key (for AI resume parsing)

### Installation

1. **Clone the repo**

cd JobPortalAI
Setup Backend

bash
Copy code
cd backend
npm install
cp .env.example .env
# Add your MongoDB URI, JWT_SECRET, OpenAI API Key, etc.
npm run dev
Setup Frontend

bash
Copy code
cd ../frontend
npm install
cp .env.example .env
# Add your VITE_API_URL pointing to backend
npm run dev
Open http://localhost:5173 (or your Vite port) to see the app.

Usage
Register and upload your resume.

Browse latest jobs or use the search bar to filter jobs.

Enable Auto-Apply to let JobPortalAI submit applications for you.

Monitor applications and notifications in your dashboard.

Live Demo
(https://jobportalai.netlify.app/login)

 Future Improvements
Add more advanced AI-based skill matching.

Integrate email notifications for new job alerts.

Add multi-language resume parsing.

Enhance UI with animations and better filtering.
