# Task Management System

A full-stack application for caseworkers to manage their tasks efficiently.

## Features

- Create, read, update, and delete tasks
- Task properties:
  - Title (required)
  - Description (optional)
  - Status (pending, in-progress, completed)
  - Due date/time
- User-friendly interface
- Data persistence with MongoDB
- RESTful API
- Unit tests

## Tech Stack

- Frontend: React, Material-UI
- Backend: Node.js, Express
- Database: MongoDB
- Testing: Jest, React Testing Library

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a .env file in the root directory with the following variables:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/taskmanager
   ```

## Running the Application

1. Start the backend server:
   ```bash
   npm run server
   ```

2. Start the frontend development server:
   ```bash
   npm run dev
   ```

3. Run tests:
   ```bash
   npm test
   ```

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

```bash
npm test
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request
