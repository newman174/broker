
# Backend Setup
- `cd` into `backend` directory
- `npm install`
- create a `.env` file
- add `PORT=3001`
- `npm run dev` to start express server

# PostgresQL Setup 
1. Ensure postgres is running
2. Create `broker`: run `createdb broker` 
3. `cd` into `/backend/db/`
4. Connect to database: run `psql -d broker` 
5. Execute SQL script: `\i db_schema.sql` 
6. Setup `.env` variables for `DB_USER` and `DB_PASSWORD`. 