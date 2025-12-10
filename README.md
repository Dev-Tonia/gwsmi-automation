# gswmi (gwsmi-automation)

Project: gswmi — a Node.js + TypeScript Express API with Mongoose for user authentication and management.

## Quick overview

- **Tech stack:** Node.js, TypeScript, Express, Mongoose, nodemon
- **Purpose:** Authentication and user management endpoints, with transaction-safe creation in production.

## Setup & run

1. Install dependencies:

```bash
npm install
```

2. Build (if using `tsc`) and start in dev:

```bash
npm run dev
```

3. Environment: the code uses a `config` module exposing `config.nodeEnv` to detect production behavior.

## File map (key files)

- `src/server.ts` - App/server bootstrap (imports routes and middleware).
- `src/index.ts` - Entry point (starts server).
- `src/config` - Configuration (`db.config.ts`, `index.ts`).
- `src/controller` - Express controllers (e.g. `auth.controller.ts`, `user.controller.ts`).
- `src/services` - Business logic and database operations (`auth.service.ts`, `user.service.ts`).
- `src/routes` - Route definitions (auth, user, admin).
- `src/middleware` - Express middleware (auth, validation, error handling, permissions).
- `src/models` - Mongoose models (e.g. `user.model.ts`).
- `src/database/schemas` - Validation schemas (createUser, login, etc.).
- `src/database/seeders` - Create data's to be seed to the DB.
- `src/utils` - Utilities (token, error helpers), constants.

## Documented file: `src/controller/user.controller.ts`

**Purpose**

- Exposes `UserController.createUser` — an Express handler that creates a new user.

**Handler**: `async createUser(req: Request, res: Response, next: NextFunction)`

Behavior summary:

- A Mongoose session is acquired via `mongoose.startSession()`.
- If `config.nodeEnv === "production"`, the handler starts a transaction, calls `UserService.createUser(req.body, session)`, and commits the transaction.
- If not production, the handler calls `UserService.createUser(req.body)` without a session.
- On success it returns HTTP `201` with JSON `{ success: true, message: "User created", data: { user } }`.
- On error it aborts the transaction in production and forwards the error to `next(error)` for centralized error handling.
- The session is always ended in a `finally` block via `session.endSession()`.

Request / Response contract:

- Request body: forwarded to `UserService.createUser` — expected fields depend on service/schema (e.g., `name`, `email`, `password`).
- Success response: 201 + created `user` in `data.user`.
- Errors: passed to error middleware via `next(error)`.

Important notes & suggestions:

- Inconsistent environment checks: the code checks `config.nodeEnv` when starting a transaction but checks `process.env.NODE_ENV` when aborting. Use a single source (prefer `config.nodeEnv`) to avoid mismatches.
- Ensure `UserService.createUser` accepts an optional session and uses it in Mongoose operations when provided.
- Ensure validation middleware runs before this controller so `req.body` is validated.
- Ensure sensitive fields (password, tokens) are not returned — either strip them before sending or rely on model `toJSON`/`toObject` transformations.
- Consider returning a `Location` header with the new resource (e.g. `/users/:id`).

Example curl (assuming `POST /users` is wired to this handler):

```bash
curl -X POST http://localhost:3500/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Jane","email":"jane@example.com","password":"s3cret"}'
```
