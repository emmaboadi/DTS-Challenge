# Task Management System

A full-stack task management application built with React, Express, and MongoDB. Users can create, view, update, delete, and search for tasks by ID. The app features a modern UI, confirmation dialogs for destructive actions, and robust error handling.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running the App](#running-the-app)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Usage](#usage)
- [Testing](#testing)
- [Troubleshooting](#troubleshooting)
- [License](#license)

---

## Features

- **Create Tasks:** Add new tasks with a title, description, status, and due date.
- **View Tasks:** See a list of all tasks in a sortable, filterable table.
- **Update Tasks:** Edit any task's details.
- **Delete Tasks:** Remove tasks with a confirmation dialog to prevent accidental deletion.
- **Search by ID:** Find a specific task by its unique ID.
- **Retrieve All Tasks:** Instantly reload and view all tasks.
- **Status Color Coding:** Visual cues for task status (Not Started, In Progress, Completed).
- **Responsive UI:** Works well on desktop and mobile devices.
- **Error Handling:** User-friendly error messages for failed operations.

---

## Tech Stack

- **Frontend:** React, Tailwind CSS, Axios, date-fns
- **Backend:** Node.js, Express, Mongoose
- **Database:** MongoDB Atlas (cloud) or local MongoDB
- **Testing:** Jest, React Testing Library

---

## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- npm (v8+ recommended)
- MongoDB Atlas account (or local MongoDB instance)

### Installation

1. **Clone the repository:**
   
   git clone https://github.com/your-username/to-do-app.git
   cd to-do-app
   

2. **Install dependencies for both client and server:**
   
   # Install server dependencies
   cd server
   npm install

   # Install client dependencies
   cd ../
   npm install
   ```

### Environment Variables

1. **Create a `.env` file in the root of your project (`to-do-app/.env`):**
   ```
   MONGODB_URI=your_mongodb_connection_string
   ```

   - For MongoDB Atlas, get your connection string from the Atlas dashboard.
   - Example:
     ```
     MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/todoapp?retryWrites=true&w=majority
     ```

### Running the App

1. **Start the backend server:**
   ```bash
   cd server
   npm start
   ```
   The server will run on [http://localhost:5000](http://localhost:5000).

2. **Start the frontend development server:**
   ```bash
   cd ..
   npm run dev
   ```
   The React app will run on [http://localhost:5173](http://localhost:5173).

---

## Project Structure

```
to-do-app/
├── server/
│   ├── config/
│   ├── models/
│   ├── routes/
│   ├── scripts/
│   ├── index.js
│   └── ...
├── src/
│   ├── components

## API Endpoints

### Tasks

- `GET /api/tasks` - Get all tasks
- `GET /api/tasks/:id` - Get a single task
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task

### Task Schema

```json
{
  "title": "string (required)",
  "description": "string (optional)",
  "status": "string (enum: pending, in-progress, completed)",
  "dueDate": "date (required)",
  "createdAt": "date (auto-generated)"
}
```

## Testing

The application includes unit tests for both frontend and backend components. Run the tests using:


npm test


## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## How to Page Looks Like-Screenshot
<img width="1280" alt="Screenshot 2025-04-26 at 1 46 06 pm" src="https://github.com/user-attachments/assets/5030ca67-fb31-41ca-b7b4-13f7f3dea869" />

## Video
https://github.com/user-attachments/assets/73273ad2-dff4-4aa9-8825-62a501ff1553


