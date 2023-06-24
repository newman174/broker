# README.md

## Server Setup

1. `cd` into `server` directory
2. `npm install`
3. Create a `.env` file (*see* below)

### PostgresQL Setup

1. Ensure postgres is running
2. Delete existing `broker` database if it exists: run `dropdb broker`
3. Create `broker` database: run `createdb broker`
4. Connect to database: run `psql -d broker`
5. Execute SQL script: `\i db_schema.sql`
6. `cd` into `./server/src/db/`
7. Make sure `.env` variables are set
8. `npm run dev` to start express server

### .env

```yml
PORT=3001
DB_USER=
DB_PASSWORD=
```
