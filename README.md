# Task Manager

A simple task manager built with React (Vite) on the frontend and an Express server on the backend. Tasks are organized into three views — **Pending**, **Completed**, and **Failed** — and stored as JSON files on disk.

## Features

- Create, edit, and delete tasks
- Mark pending tasks as complete
- Separate views for Pending / Completed / Failed tasks, with routing via `react-router-dom`
- Minimal JSON file storage on the backend (no database required)

## Tech Stack

- **Frontend:** React 19, Vite, React Router
- **Backend:** Express, Node.js `fs` module for JSON file storage

## Project Structure

```
Task-Manager/
├── backend/
│   ├── server.js         # Express server (read/write task JSON files)
│   ├── pending.json       # Pending tasks
│   ├── completed.json     # Completed tasks
│   ├── failed.json        # Failed tasks
│   └── package.json
├── src/
│   ├── App.jsx             # Root component, routing, task state
│   ├── Navbar.jsx           # Top navigation
│   ├── TaskView.jsx         # Task list view per category
│   ├── Card.jsx             # Individual task card
│   ├── Modal.jsx             # Create/edit/delete/complete modals
│   ├── Icons.jsx              # SVG icon components
│   └── Util.jsx                # Date formatting helpers
├── public/
├── index.html
└── package.json
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later recommended)
- npm

### 1. Install dependencies

Install frontend dependencies from the project root:

```bash
npm install
```

Install backend dependencies:

```bash
cd backend
npm install
```

### 2. Run the backend

From the `backend` directory:

```bash
npm run dev
```

This starts the Express server on `http://localhost:5000`.

### 3. Run the frontend

From the project root, in a separate terminal:

```bash
npm run dev
```

This starts the Vite dev server (default `http://localhost:5173`). Open it in your browser to use the app.

> On Windows, you can also use the included `start.bat` / `backend.bat` scripts to launch both servers.

## Available Scripts

**Frontend** (project root):

| Command | Description |
|---|---|
| `npm run dev` | Start the Vite dev server |
| `npm run build` | Build for production |
| `npm run preview` | Preview the production build |
| `npm run lint` | Run ESLint |

**Backend** (`backend/`):

| Command | Description |
|---|---|
| `npm run dev` | Start the Express server with nodemon |

## Task Data

Tasks are stored in `backend/pending.json`, `backend/completed.json`, and `backend/failed.json`. Each task has the shape:

```json
{
  "name": "Task name",
  "created": "YYYY-MM-DD",
  "deadline": "YYYY-MM-DD",
  "completed": null,
  "status": "pending"
}
```

## Known Limitations

- The backend's `/write` endpoint is not yet implemented, so changes made in the UI are not currently persisted to disk between sessions.
- The backend URL (`http://localhost:5000`) is hardcoded in the frontend.

## License

No license specified.
