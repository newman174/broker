# README.md

## Server Setup

1. `cd` into `server` directory
2. `npm install`
3. Create a `.env` file (*see* below)

### PostgresQL Setup

1. Ensure postgres is running
2. Create `broker` database: run `createdb broker`
3. Connect to database: run `psql -d broker`
4. Execute SQL script: `\i db_schema.sql`
5. `cd` into `./server/src/db/`
6. Make sure `.env` variables are set
7. `npm run dev` to start express server

### .env

```yml
PORT=3001
DB_USER=
DB_PASSWORD=
```
