# README.md

## Backend Setup

- `cd` into `backend` directory
- `npm install`
- create a `.env` file
- add `PORT=3001` to `.env`

### PostgresQL Setup

1. Ensure postgres is running
2. Create `broker` database: run `createdb broker`
3. Connect to database: run `psql -d broker`
4. Execute SQL script: `\i db_schema.sql`
5. `cd` into `./backend/src/db/`
6. Setup `.env` variables for `DB_USER` and `DB_PASSWORD`.
8. `npm run dev` to start express server
