import Knex from "knex";
import "dotenv/config";
import dbConfigs from "./knexfile.js";

console.log("Running test database teardown script...");
// console.log(process.env);

if (process.env.NODE_ENV !== "test") {
  console.error(
    `Aborting test database teardown script because NODE_ENV=${process.env.NODE_ENV} and not "test".`
  );
  process.exit(1);
}

const config = dbConfigs["test"];

if (!config) {
  throw new Error(
    `Server Error: unable to connect to database - invalid RUNTIME_ENV: ${process.env.NODE_ENV}.`
  );
}

const dropConfig = {
  ...config,
  connection: {
    ...config.connection,
  },
};

const { database } = config.connection;

delete dropConfig.connection.database;

const dbConn = Knex(dropConfig);

async function dropDatabase() {
  try {
    await dbConn.raw(`DROP DATABASE ${database}`);
    console.log(`Database '${database}' dropped successfully.\n`);
  } catch (error) {
    console.error(`Error creating database: ${error.message}`);
  } finally {
    await dbConn.destroy();
  }
}

dropDatabase();
