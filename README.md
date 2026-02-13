# Valentine's Project

A full-stack Valentine themed app with a Node/Express + MongoDB API and a Vite + React frontend. The server can also serve the built frontend for a single-deployment setup.

## Tech Stack
- Backend: Node.js, Express, MongoDB (Mongoose)
- Frontend: React, Vite, Tailwind CSS, Framer Motion, Lottie

## Project Structure
- `server/` Express API + MongoDB
- `server/client/` Vite React frontend

## Requirements
- Node.js 18+ (recommended)
- MongoDB connection string

## Environment Variables
Create `server/.env`:

```env
MONGO_URI="your-mongodb-uri"
PORT=5000
```

## Install
```bash
npm run install:all
```

## Run (Dev)
Runs backend and frontend together.

```bash
npm run dev
```

- API: `http://127.0.0.1:5000/api`
- UI: `http://127.0.0.1:5173`

## Build (Single Deployment)
Builds the frontend and lets Express serve it.

```bash
npm run build
node server/src/server.js
```

Then open: `http://127.0.0.1:5000`

## Deployment

### Option A: Single Deploy on Render (recommended)
This repo includes a `render.yaml`.

1. Push the repo to GitHub.
2. Create a new Render **Web Service** and connect the repo.
3. Render will auto-detect `render.yaml` and run the build.
4. Set `MONGO_URI` in Render environment variables.

### Option B: Split Deploy (Vercel/Netlify + Render API)

Backend (Render):
1. Deploy the `server/` as a Render web service.
2. Set `MONGO_URI`.
3. Note the backend URL (e.g. `https://your-backend.onrender.com`).

Frontend:
- Vercel or Netlify should use `server/client` as the project root.
- Set environment variable:

```env
VITE_API_BASE=https://your-backend.onrender.com/api
```

The frontend will use the API URL in production, and localhost in development.

## Useful Scripts
From repo root:
- `npm run dev` Run both client and server
- `npm run build` Build frontend
- `npm run start` Start server
- `npm run install:all` Install all dependencies

## Notes
- The server serves the Vite build in production.
- If `server/client/dist` is missing, only the API will respond.
- Do not commit `.env` or `node_modules`.