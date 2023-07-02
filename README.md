# README.md

## Server Setup

1. `cd` into `./server`
2. `npm install`
3. Create a `.env` file (*see* below for contents)
4. Ensure postgres is running
5. Setup or reset the database to the latest schema. **WARNING: This will delete any existing database named `broker` and its associated data.** => `npm run resetdb`
6. `npm run dev` to start express server

### Server `.env` File contents

```yaml
PORT=3001
NODE_ENV=development

DEV_DB_USER=
DEV_DB_PASSWORD=
DEV_DB_HOST=
DEV_DB_PORT=

TEST_DB_USER=
TEST_DB_PASSWORD=
TEST_DB_HOST=
TEST_DB_PORT=
```

## Client Setup

1. `cd` into `./client`
2. `npm install`
3. Create `.env` file (*see* below for contents)
4. `npm run dev` to start the client dev server

### Client `.env` File contents

```yaml
PROXY_PORT=3001 # Should match the PORT variable in the server .env file
```
