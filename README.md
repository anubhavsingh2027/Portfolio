# Anubhav Singh's Portfolio

Personal portfolio website for Anubhav Singh, a full-stack developer from Varanasi, India. The portfolio includes project and skills sections, an AI chatbot, voice assistance, contact forms, and live LeetCode progress.

## Live Demo

[anubhav.nav-code.com](https://anubhav.nav-code.com/)
🖼️ **Preview:**
![Portfolio Preview](https://anubhav.nav-code.com/assets/images/websiteImg.png)

## Features

- Responsive React portfolio with Tailwind CSS and animated sections
- AI text and voice assistants powered by the backend API
- Contact and access tracking endpoints
- Live LeetCode profile statistics
- Latest ten accepted LeetCode submissions with direct problem links
- Resume preview and download flow
- Vite frontend and Express backend

## Tech Stack

| Area         | Technologies                                |
| ------------ | ------------------------------------------- |
| Frontend     | React, Vite, Tailwind CSS, JavaScript       |
| Backend      | Node.js, Express, Mongoose, REST APIs       |
| Integrations | LeetCode GraphQL, Groq, custom mail service |
| Deployment   | Vercel frontend, cloud-hosted backend       |

## Project Structure

```text
Portfolio/
├── backend/
│   ├── app.js
│   ├── controllers/
│   ├── middlewares/
│   ├── model/
│   └── routes/
├── frontend/
│   ├── public/
│   └── src/
│       ├── components/
│       ├── sections/
│       ├── services/
│       └── styles/
├── vercel.json
└── README.md
```

## Requirements

- Node.js 18 or newer
- npm
- MongoDB connection string

## Local Setup

1. Install backend dependencies:

   ```bash
   cd backend
   npm install
   ```

2. Create `backend/.env` with the required values:

   ```env
   dbUrl=your_mongodb_connection_string
   port=8000
   state=development
   LEETCODE_URL=https://leetcode.com/graphql/
   groq=your_groq_api_key
   emailLink=your_mail_service_url
   ```

   Keep `.env` private and never commit API keys or database credentials.

3. Start the backend:

   ```bash
   npm start
   ```

4. Install and start the frontend in a second terminal:

   ```bash
   cd frontend
   npm install
   npm run dev
   ```

The frontend runs on `http://localhost:5173` and the backend runs on the configured port, normally `http://localhost:8000`.

## API

Backend routes are mounted under `/portfolio`.

| Method | Endpoint                    | Purpose                                                                                   |
| ------ | --------------------------- | ----------------------------------------------------------------------------------------- |
| `GET`  | `/portfolio/health`         | Health check                                                                              |
| `GET`  | `/portfolio/leetcode/stats` | LeetCode totals, difficulty counts, beat percentages, and latest ten accepted submissions |
| `POST` | `/portfolio/chatAssistant`  | Text assistant                                                                            |
| `POST` | `/portfolio/voiceAssistant` | Voice assistant                                                                           |
| `POST` | `/portfolio/contact`        | Contact form                                                                              |

The LeetCode endpoint accepts an optional username query parameter:

```text
GET /portfolio/leetcode/stats?username=anubhav_singh_6966
```

The response is cached for five minutes. Recent submissions contain the problem title, slug, Unix timestamp, and ISO `solvedAt` date. If the recent-submissions query is temporarily unavailable, the endpoint still returns the profile totals with an empty `recentSolvedQuestions` array.

## Frontend Commands

Run these commands from `frontend/`:

```bash
npm run dev       # Start the Vite development server
npm run build     # Create a production build
npm run preview   # Preview the production build locally
npm run lint      # Run ESLint
```

## Contact

- Email: [anubhavsingh2027@gmail.com](mailto:anubhavsingh2027@gmail.com)
- LinkedIn: [linkedin.com/in/anubhav-singh-09b71829b](https://www.linkedin.com/in/anubhav-singh-09b71829b)
- GitHub: [github.com/anubhavsingh2027](https://github.com/anubhavsingh2027)
