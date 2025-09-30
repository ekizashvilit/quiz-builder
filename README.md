# Quiz Builder

A full-stack web application for creating, listing, and viewing custom quizzes with multiple question types.

---

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
  - [Database Setup](#database-setup)
- [Usage](#usage)
  - [Creating a Quiz](#creating-a-quiz)
  - [Viewing Quizzes](#viewing-quizzes)
- [API Endpoints](#api-endpoints)
- [Code Quality](#code-quality)
- [Environment Variables](#environment-variables)
- [Sample Quiz](#sample-quiz)

---

## Overview

Quiz Builder is a platform where users can:

- Create quizzes with multiple question types (Boolean, Input, Checkbox)
- List all quizzes in a dashboard
- View quiz details on a separate page

---

## Tech Stack

**Backend:**

- Node.js (Express.js)
- TypeScript
- SQLite (via Prisma ORM)

**Frontend:**

- React.js
- Next.js
- TypeScript
- (Optional) React Hook Form, Zod

---

## Project Structure

```
quiz-builder/
├── backend/         # Express app (API & DB)
│   ├── src/
│   └── prisma/
├── frontend/        # Next.js app (UI)
│   ├── app/
│   ├── components/
│   └── services/
└── README.md
```

---

## Getting Started

### Backend Setup

1. **Install dependencies:**
   ```sh
   cd backend
   npm install
   ```
2. **Configure environment:**
   - Copy `.env.example` to `.env` and set your variables (see [Environment Variables](#environment-variables)).
3. **Set up the database:**
   ```sh
   npx prisma migrate dev --name init
   npx prisma generate
   ```
4. **Start the backend server:**
   ```sh
   npm run dev
   ```
   The backend will run on [http://localhost:3001](http://localhost:3001) by default.

### Frontend Setup

1. **Install dependencies:**
   ```sh
   cd frontend
   npm install
   ```
2. **Configure environment:**
   - Copy `.env.local.example` to `.env.local` and set your variables (see [Environment Variables](#environment-variables)).
3. **Start the frontend server:**
   ```sh
   npm run dev
   ```
   The frontend will run on [http://localhost:3000](http://localhost:3000) by default.

### Database Setup

- The backend uses SQLite by default (see `backend/prisma/schema.prisma`).
- To reset or seed the database, use Prisma commands:
  ```sh
  npx prisma migrate reset
  npx prisma db seed
  ```

---

## Usage

### Creating a Quiz

- Go to [http://localhost:3000/create](http://localhost:3000/create)
- Fill in the quiz title and add one or more questions (Boolean, Input, Checkbox)
- Submit the form to create a new quiz

### Viewing Quizzes

- Go to [http://localhost:3000/quizzes](http://localhost:3000/quizzes) to see all quizzes
- Click a quiz to view its details
- Use the delete icon to remove a quiz

---

## API Endpoints

- `POST   /quizzes` – Create a new quiz
- `GET    /quizzes` – List all quizzes (title, number of questions)
- `GET    /quizzes/:id` – Get full details of a quiz
- `DELETE /quizzes/:id` – Delete a quiz

---

## Code Quality

- ESLint and Prettier are set up in both `backend` and `frontend`.
- Run linting and formatting before committing:
  ```sh
  npm run lint
  npm run format
  ```
- Ensure all files are properly linted and formatted.

---

## Environment Variables

- **Backend:** (`backend/.env`)
  ```env
  PORT=3001
  DATABASE_URL="file:./dev.db"
  ```
- **Frontend:** (`frontend/.env.local`)
  ```env
  NEXT_PUBLIC_API_URL=http://localhost:3001
  ```
- **Note:** Do not commit `.env` files to version control.

---

## Sample Quiz

You can create a sample quiz using the UI or by sending a POST request to `/quizzes` with the required payload.

---

## License

MIT
