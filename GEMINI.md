# GEMINI.md

## Project Overview

This project, `myuanggwe-api`, is a backend API service built using **Elysia** with the **Bun runtime**. It is written in **TypeScript** and leverages several key technologies:

*   **Web Framework:** Elysia
*   **Runtime:** Bun
*   **Database:** Drizzle ORM with Turso dialect, utilizing `@libsql/client`. Database credentials and schema are managed via `drizzle.config.ts` and `src/lib/server/db/schema.ts`.
*   **Caching:** Upstash Redis (`@upstash/redis`).
*   **Authentication:** `better-auth` middleware.

The project appears to be structured with routes and modules organized under the `src/lib/` directory, with specific handlers for different domains (e.g., `src/lib/groups/`, `src/lib/auth/`).

## Building and Running

### Development Server

To start the development server, use the following command:

```bash
bun run dev
```
This command is configured in the `package.json` scripts and also mentioned in the `README.md`. It likely utilizes a watch mode for hot-reloading.

### Database Migrations

Database schema management is handled by Drizzle ORM. The configuration is located in `drizzle.config.ts`.

*   **Schema Definition:** `src/lib/server/db/schema.ts`
*   **Migration Output:** `src/lib/server/db/out/`

The exact command for applying migrations is not explicitly detailed in the `README.md` or `package.json` scripts. It is likely a `drizzle-kit` command.

**TODO:** Determine and document the exact command for running Drizzle database migrations (e.g., `bunx drizzle-kit push` or `bunx drizzle-kit migrate`).

### Running the Application

Once the development server is running, the application is accessible at `http://localhost:3000/` as indicated in the `README.md`.

## Development Conventions

*   **Language:** TypeScript
*   **Module System:** ES Modules (indicated by `"type": "module"` if present in `package.json`, or by default with Bun/Elysia).
*   **Project Structure:** Features and concerns are separated into directories within `src/lib/` (e.g., `auth`, `db`, `groups`, `middlewares`, `redis`).
*   **Configuration:** Environment variables are expected, particularly `DATABASE_URL` and `DATABASE_AUTH_TOKEN` for database connection, as seen in `drizzle.config.ts`. A `.env` file is present in the root, suggesting its use for managing these variables.
*   **Testing:** No explicit testing framework or scripts were found in `package.json` or the `README.md`. The `test` script in `package.json` is a placeholder.

**TODO:** Investigate and document the testing strategy and commands.
