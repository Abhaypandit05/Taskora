# TaskFlow ⚡

A modern, responsive, portfolio-ready full-stack Task Management web application built with **React**, **TypeScript**, **Vite**, **Tailwind CSS**, **Node.js**, **Express.js**, **PostgreSQL**, and **Prisma ORM**.

---

## 🚀 Tech Stack

### Frontend
- **Framework**: React 18 with TypeScript
- **Bundler & Tooling**: Vite
- **Styling**: Tailwind CSS with custom design system & glassmorphism
- **Routing**: React Router v6 (`react-router-dom`)
- **HTTP Client**: Axios with JWT Bearer token request interceptors
- **Icons**: Lucide React

### Backend
- **Runtime**: Node.js v24+
- **Server Framework**: Express.js with TypeScript (`tsx` for dev hot-reloading)
- **Database & ORM**: PostgreSQL with Prisma ORM
- **Authentication**: JWT (JSON Web Tokens) + `bcryptjs` password hashing
- **API Style**: REST API with status codes, error handling, and CORS

---

## ✨ Features

- **User Authentication**:
  - Secure registration and login with bcrypt password hashing
  - JWT token generation, persistent storage, and protected routes
  - Current logged-in user profile (`/api/auth/me`)
  - Instant 1-click Demo Logins for portfolio evaluation

- **Task CRUD Management**:
  - Create new tasks with title, description, status, priority, and due date
  - View all user's tasks with search and status/priority filters
  - Detailed task view (`/tasks/:id`)
  - Edit existing tasks with real-time validation
  - Mark task as completed or incomplete with an instant one-click toggle
  - Delete task with a confirmation dialog

- **Task Models & Enums**:
  - **Status**: `TODO`, `IN_PROGRESS`, `COMPLETED`
  - **Priority**: `LOW`, `MEDIUM`, `HIGH`
  - **Fields**: `id`, `title`, `description`, `status`, `priority`, `dueDate`, `createdAt`, `updatedAt`, `userId`

- **Dashboard & Analytics**:
  - Real-time statistics cards: **Total Tasks**, **Completed Tasks**, **Pending Tasks**, and **High Priority Tasks**
  - Instant keyword search across task titles and descriptions
  - Filter by status (`ALL`, `TODO`, `IN_PROGRESS`, `COMPLETED`)
  - Filter by priority (`ALL`, `LOW`, `MEDIUM`, `HIGH`)

- **Pages Included**:
  1. **Landing Page (`/`)**: Hero section, value proposition, feature cards, live demo preview, and call-to-action
  2. **Login Page (`/login`)**: Email and password validation, instant demo profiles, redirection to dashboard
  3. **Register Page (`/register`)**: Full name, email, and password validation
  4. **Dashboard Page (`/dashboard`)**: Statistics cards, task ledger, search/filter toolbar, modals
  5. **Task Details Page (`/tasks/:id`)**: Full metadata view, toggle complete, edit, and delete actions
  6. **404 Page (`*`)**: Sleek page not found view with return links

- **Responsive & Accessible**:
  - Optimized for Desktop, Tablet, and Mobile devices
  - Clean empty states, loading skeletons, and error retry states

---

## 📁 Folder Structure

```
TaskFlow/
├── client/                     # Frontend React + TypeScript App
│   ├── src/
│   │   ├── api/                # Axios instance with auth interceptor
│   │   ├── components/         # Reusable UI components
│   │   │   ├── common/         # ProtectedRoute
│   │   │   ├── dashboard/      # Header, Sidebar, StatsCards, TaskList
│   │   │   └── tasks/          # TaskModal, DeleteConfirmModal
│   │   ├── context/            # AuthContext, TaskContext
│   │   ├── pages/              # LandingPage, LoginPage, RegisterPage,
│   │   │                       # DashboardPage, TaskDetailsPage, NotFoundPage
│   │   ├── types/              # TypeScript definitions (User, Task, Stats)
│   │   ├── App.tsx             # React Router route definitions
│   │   ├── index.css           # Tailwind base styles & glass design tokens
│   │   └── main.tsx            # React DOM entrypoint
│   ├── .env.example            # Client environment variables
│   ├── tailwind.config.js      # Tailwind design configuration
│   └── vite.config.ts          # Vite configuration with API proxy
│
├── server/                     # Backend Node.js + Express API
│   ├── prisma/
│   │   ├── schema.prisma       # PostgreSQL schema with User & Task models
│   │   └── migrations/         # PostgreSQL migration SQL files
│   ├── src/
│   │   ├── controllers/        # authController, taskController
│   │   ├── middleware/         # auth (JWT verification)
│   │   ├── routes/             # authRoutes, taskRoutes
│   │   ├── services/           # Database service & Prisma client
│   │   ├── types/              # Server TypeScript types
│   │   ├── seed.ts             # Database seed script
│   │   └── index.ts            # Express server initialization
│   ├── .env.example            # Server environment variables
│   └── tsconfig.json           # Server TypeScript configuration
│
├── package.json                # Root orchestration scripts
└── README.md                   # Project documentation
```

---

## 🛠️ Environment Setup

### 1. Backend (`server/.env`)
Copy the template:
```bash
cp server/.env.example server/.env
```
Configure environment variables in `server/.env`:
```env
PORT=5000
DATABASE_URL="postgresql://postgres:password@localhost:5432/taskflow?schema=public"
JWT_SECRET="your-super-secret-jwt-key"
JWT_EXPIRES_IN="7d"
CORS_ORIGIN="http://localhost:5173"
```

### 2. Frontend (`client/.env`)
Copy the template:
```bash
cp client/.env.example client/.env
```
Configure environment variables in `client/.env`:
```env
VITE_API_URL="/api"
```

---

## 🐘 Database Setup (PostgreSQL + Prisma)

1. Make sure your PostgreSQL server or cloud database (Neon, Supabase, Railway, etc.) is running.
2. Generate the Prisma client:
```bash
npm run db:generate
# or: npm --prefix server run db:generate
```
3. Apply migrations to your PostgreSQL database:
```bash
npm run db:push
# or: npm --prefix server run db:push
```
4. Optional: Seed the database with initial sample data:
```bash
npm run db:seed
# or: npm --prefix server run db:seed
```

---

## 🏃 Running the Application

### Option A: Run Both Simultaneously (Recommended)
From the root directory:
```bash
npm install
npm run install:all
npm run dev
```
- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:5000`

### Option B: Run Individually

**Backend**:
```bash
cd server
npm install
npm run dev
```

**Frontend**:
```bash
cd client
npm install
npm run dev
```

---

## 🔑 Demo Login Credentials

For testing without creating a new account:

| Role | Email | Password |
|---|---|---|
| **Lead Admin** | `alex@taskflow.dev` | `password123` |
| **Developer** | `sarah@taskflow.dev` | `password123` |

*You can also click the **Instant Demo Logins** button on the Login page.*

---

## 📡 REST API Documentation

All protected endpoints require an `Authorization: Bearer <token>` HTTP header.

### Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `POST` | `/api/auth/register` | Register new user account | No |
| `POST` | `/api/auth/login` | Authenticate credentials & return JWT | No |
| `POST` | `/api/auth/logout` | Client sign out | No |
| `GET` | `/api/auth/me` | Fetch authenticated user profile | **Yes** |

### Task Endpoints

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `GET` | `/api/tasks` | Get user's tasks (filters: `status`, `priority`, `search`) | **Yes** |
| `GET` | `/api/tasks/stats/summary` | Get dashboard metrics (total, completed, pending, high priority) | **Yes** |
| `POST` | `/api/tasks` | Create a new task | **Yes** |
| `GET` | `/api/tasks/:id` | Get single task details | **Yes** |
| `PUT` | `/api/tasks/:id` | Update task details | **Yes** |
| `PATCH` | `/api/tasks/:id/toggle` | Toggle task completion status (`COMPLETED` ⟷ `TODO`) | **Yes** |
| `DELETE` | `/api/tasks/:id` | Delete task | **Yes** |
