import Knex from "knex";
import "dotenv/config";

import { dirname } from "path";
import { fileURLToPath } from "url";

console.log("Running database setup script...\n");

const dirName = dirname(fileURLToPath(import.meta.url));

const config = {
  client: "pg",
  migrations: {
    directory: dirName + "/migrations",
  },
};

let dbName;

if (process.env.NODE_ENV === "production") {
  config.connection = {
    host: process.env.RDS_HOSTNAME,
    port: process.env.RDS_PORT,
    user: process.env.RDS_USERNAME,
    password: process.env.RDS_PASSWORD,
    ssl: {
      rejectUnauthorized: false,
    },
  };
  dbName = process.env.RDS_DB_NAME;
} else if (process.env.NODE_ENV === "development") {
  config.connection = {
    host: process.env.DEV_DB_HOST,
    port: process.env.DEV_DB_PORT,
    user: process.env.DEV_DB_USER,
    password: process.env.DEV_DB_PASSWORD,
  };
  dbName = process.env.DEV_DB_NAME;
} else if (process.env.NODE_ENV === "test") {
  config.connection = {
    host: process.env.TEST_DB_HOST,
    port: process.env.TEST_DB_PORT,
    user: process.env.TEST_DB_USER,
    password: process.env.TEST_DB_PASSWORD,
  };
  dbName = process.env.TEST_DB_NAME;
} else {
  throw new Error(
    `Server Error: unable to connect to database - invalid RUNTIME_ENV: ${process.env.NODE_ENV}.`
  );
}

const creationConnection = Knex(config);

async function createDatabase() {
  try {
    const dbAlreadyExists =
      (
        await creationConnection.raw(
          `SELECT FROM pg_database WHERE datname = '${dbName}'`
        )
      ).rowCount > 0;

    if (!dbAlreadyExists) {
      await creationConnection.raw(`CREATE DATABASE ${dbName}`);
    }

    console.log(
      `Database '${dbName}' ${
        dbAlreadyExists ? "already exists" : "created successfully"
      }.\n`
    );
  } catch (error) {
    console.error(`Error creating database: ${error.message}`);
    process.exit(1);
  } finally {
    await creationConnection.destroy();
  }
}

const migrationConnection = Knex({
  ...config,
  connection: {
    ...config.connection,
    database: dbName,
  },
});

async function runMigrations() {
  try {
    const pendingMigrations = await migrationConnection.migrate.list()[1];
    if (pendingMigrations) {
      console.log(`Found ${pendingMigrations.length} unapplied migrations:`);
      console.table(pendingMigrations);
      console.log("Migrations ran successfully.");
    } else {
      console.log("No unapplied migrations found.");
    }
    await migrationConnection.migrate.latest();
  } catch (error) {
    console.error(`Error running migrations: ${error.message}`);
  } finally {
    await migrationConnection.destroy();
  }
}

(async () => {
  await createDatabase();
  await runMigrations();
})();
