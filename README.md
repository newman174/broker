
# Backend Setup
- `cd` into `backend` directory
- `npm install`
- create a `.env` file
- add `PORT=3001` to `.env`

## Postgres Setup
- ensure postgres is running in the background
- run `createdb broker`
- `cd` into `backend` directory
- connect to the database with `psql broker`
- execute DDL statements with `\i src/db/db_schema.sql`
- add the database connection URI to .env with your own postres auth info.
  `POSTGRES_URI=postgresql://username:password@localhost:5432/broker`
    note: the password might be optional depending on your postgres configuration.

