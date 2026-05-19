# Lead Management System


## Backend (Backend)
- Requirements: Node.js 16+ and MongoDB.
- Install & run:

  ```bash
  cd Backend
  npm install
  npm run dev
  ```

- Environment: copy `.env.example` to `.env` and set `MONGO_URI`, `PORT`, and JWT secrets if present.
- API docs available in `Backend/docs/swagger.json` and configured in `Backend/src/config/swagger.ts`.

## Frontend (Frontend/gigflow)
- Requirements: Node.js 16+.
- Install & run:

  ```bash
  cd Frontend/gigflow
  npm install
  npm run dev
  ```

## Useful Commands
- Install dependencies (root projects):

  ```bash
  cd Backend && npm install
  cd ../Frontend/gigflow && npm install
  ```

- Start backend in dev mode: `cd Backend && npm start`
- Start frontend in dev mode: `cd Frontend && npm run dev`

## Project Structure (high level)
- `Backend/` — server code, routes, controllers, services, models, validations.
- `Frontend/gigflow/` — React app, API services, pages, components, hooks.


---
_Generated on May 19, 2026_

# Project Details

## Functionalities
- User authentication: register, login, get current user.
- User management (admin): list all users, update and delete users.
- Lead management: create lead, list leads, view single lead, update, delete.
- Role-based access: protected routes via JWT; some endpoints require admin.
- API documentation via Swagger at `/api-docs` (see `Backend/docs/swagger.json`).

## Backend API Routes (prefixes used in server)
- Base router mount: `/` (routes available at `/users` and `/leads`).

- Users (`/users`)
  - `POST /users/register` — register a new user
  - `POST /users/login` — login and receive JWT
  - `GET /users/current-user/:userId` — get user details (authenticated)
  - `GET /users/all-users` — list all users (authenticated + admin)
  - `PATCH /users/update-user/:userId` — update a user (authenticated)
  - `DELETE /users/delete-user/:userId` — delete a user (authenticated)
  - `PATCH /users/reset-password` — reset/update password

- Leads (`/leads`)
  - `POST /leads/create` — create a new lead (authenticated)
  - `GET /leads/get-leads` — get all leads (authenticated)
  - `GET /leads/:leadId` — get single lead (authenticated)
  - `PUT /leads/:leadId` — update a lead (authenticated)
  - `DELETE /leads/:leadId` — delete a lead (authenticated)

## Models & Validation
- Main models: `User` and `Lead` (see `Backend/Models/UserModel.ts`, `Backend/Models/LeadModel.ts`).
- Validation is implemented with Joi in `Backend/validations` and enforced via `Backend/src/Middlewares/validateJoi.ts`.

## Frontend Notes
- Frontend app is in `Frontend` folder (React + Vite + TypeScript).
- Pages: authentication (`Login`, `Register`), `Dashboard`, `Leads`, `Users`.
- Uses API service files in `src/services` to call backend routes.

## Environment Variables (example)
- `DATABASE_URL` — MongoDB connection string
- `PORT` — backend port
- `FRONTEND_URL` — allowed CORS origin
- `JWT_SECRET` / `JWT_EXPIRES_IN` — authentication settings

## Quick API Example
Request an authenticated endpoint (replace `<TOKEN>`):

## 
API-Docs - http://localhost:8000/api-docs/#

```bash
curl -H "Authorization: Bearer <TOKEN>" http://localhost:8000/leads/get-leads
```

## Where to look
- Backend entry: `Backend/src/index.ts`
- Routes: `Backend/src/Routes` (`index.ts`, `userRoutes.ts`, `leadRoutes.ts`)
- Swagger: `Backend/docs/swagger.json`

---

