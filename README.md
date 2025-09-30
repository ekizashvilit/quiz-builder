# Quiz Builder

This project is a full-stack quiz builder application with a Next.js frontend and a Node.js (Express + Prisma) backend.

---

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm (v9 or higher recommended)

---

## Backend Setup

1. **Install dependencies:**

   ```bash
   cd backend
   npm install
   ```

2. **Set up the database:**

   - The backend uses SQLite by default (see `prisma/schema.prisma`).
   - To apply migrations and generate the database:
     ```bash
     npx prisma migrate dev --name init
     ```
   - To open Prisma Studio (optional, for DB inspection):
     ```bash
     npx prisma studio
     ```

3. **Start the backend server:**
   ```bash
   npm run dev
   ```
   The backend will start on the port specified in your code (commonly 5000 or 3001).

---

## Frontend Setup

1. **Install dependencies:**

   ```bash
   cd frontend
   npm install
   ```

2. **Configure API URL:**

   - If needed, update the API base URL in `frontend/services/api.ts` or your `.env.local` file.

3. **Start the frontend app:**
   ```bash
   npm run dev
   ```
   The frontend will start on [http://localhost:3000](http://localhost:3000) by default.

---

## Creating a Sample Quiz

1. **Start both backend and frontend as described above.**
2. **Navigate to the frontend app in your browser:**
   - Go to [http://localhost:3000/create](http://localhost:3000/create)
3. **Fill in the quiz title and add questions:**
   - You can add multiple questions of different types (boolean, input, checkbox).
   - For checkbox questions, provide at least two options and select the correct answers.
4. **Submit the quiz:**
   - The quiz will be saved to the backend database.
5. **View all quizzes:**
   - Go to [http://localhost:3000/quizzes](http://localhost:3000/quizzes) to see the list of created quizzes.

---

## Notes

- Make sure the backend is running before using the frontend to create or view quizzes.
- The default database is SQLite (file: `backend/prisma/dev.db`).
- You can modify the database connection in `backend/prisma/schema.prisma` if needed.

---

## Scripts

- `npm run lint` — Run linter
- `npm run format` — Format codebase
- `npm run dev` — Start development server

---

For any issues, please check the respective `README.md` files in `frontend` and `backend` or open an issue.
