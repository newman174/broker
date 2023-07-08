// import { knexSnakeCaseMappers } from "objection";
// import Knex from "knex";
// import "dotenv/config";

// const environment = process.env.NODE_ENV || "development";

// let knex;

// console.log("Starting init_db.js. RUNTIME_ENV: ", environment);

// if (environment === "development") {
//   knex = Knex({
//     client: "postgresql",
//     connection: {
//       host: process.env.DEV_DB_HOST,
//       port: process.env.DEV_DB_PORT,
//       user: process.env.DEV_DB_USER,
//       password: process.env.DEV_DB_PASSWORD,
//       // database: process.env.DEV_DB_NAME || "broker",
//     },
//     ...knexSnakeCaseMappers(),
//   });

//   (async () => {
//     try {
//       const queryResult = await knex.raw(
//         `SELECT 'CREATE DATABASE broker' WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = '${
//           process.env.DEV_DB_NAME || "broker"
//         }')`
//       );
//       console.log("queryResult: ", queryResult);
//       // await knex.migrate.latest({ directory: "./src/db/migrations" });
//       await knex.migrate.down({ directory: "./src/db/migrations" });
//       console.log("Migrations ran successfully");
//     } catch (e) {
//       console.error(e);
//     } finally {
//       await knex.destroy();
//     }
//   })();
// } else if (environment === "test") {
//   knex = Knex({
//     client: "postgresql",
//     connection: {
//       host: process.env.TEST_DB_HOST,
//       port: process.env.TEST_DB_PORT,
//       user: process.env.TEST_DB_USER,
//       password: process.env.TEST_DB_PASSWORD,
//       database: process.env.TEST_DB_NAME || "test_broker",
//     },
//     ...knexSnakeCaseMappers(),
//   });
//   (async () => {
//     try {
//       await knex.raw(
//         `SELECT 'CREATE DATABASE broker' WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = '${
//           process.env.TEST_DB_NAME || "test_broker"
//         }')`
//       );
//     } catch (e) {
//       console.error(e);
//     } finally {
//       await knex.destroy();
//     }
//   })();
// } else {
//   throw new Error(
//     "Server Error: unable to connect to database - invalid RUNTIME_ENV"
//   );
// }

// import { knexSnakeCaseMappers } from "objection";
import Knex from "knex";
import "dotenv/config";

import { dirname } from "path";
import { fileURLToPath } from "url";

const dirName = dirname(fileURLToPath(import.meta.url));

const config = {
  client: "postgresql",
  connection: {
    host: process.env.DEV_DB_HOST,
    port: process.env.DEV_DB_PORT,
    user: process.env.DEV_DB_USER,
    password: process.env.DEV_DB_PASSWORD,
  },
  // ...knexSnakeCaseMappers(),
  migrations: {
    directory: dirName + "/migrations",
  },
};

const creationConnection = Knex(config);

console.log("dirName: ", dirName);

async function createDatabase() {
  try {
    await creationConnection.raw(
      `CREATE DATABASE ${process.env.DEV_DB_NAME || "broker"}`
    );
    console.log(
      `Database ${process.env.DEV_DB_NAME || "broker"} created successfully`
    );
  } catch (error) {
    console.error(`Error creating database: ${error.message}`);
  } finally {
    await creationConnection.destroy();
  }
}

const migrationConnection = Knex({
  ...config,
  connection: {
    ...config.connection,
    database: process.env.DEV_DB_NAME || "broker",
  },
});
// const migrationConnection = Knex({
//   client: "postgresql",
//   connection: {
//     host: process.env.DEV_DB_HOST,
//     port: process.env.DEV_DB_PORT,
//     user: process.env.DEV_DB_USER,
//     password: process.env.DEV_DB_PASSWORD,
//     database: process.env.DEV_DB_NAME || "broker",
//   },
//   ...knexSnakeCaseMappers(),
//   migrations: {
//     directory: dirName + "/migrations",
//   },
// });

async function runMigrations() {
  try {
    const migrateList = await migrationConnection.migrate.list();
    console.log("migrateList: ", migrateList);
    const migrateReturns = await migrationConnection.migrate.latest();
    console.log("migrateReturns: ", migrateReturns);
    console.log("Migrations ran successfully");
  } catch (error) {
    console.error(`Error running migrations: ${error.message}`);
  } finally {
    await migrationConnection.destroy();
  }
}

(async () => {
  // await createDatabase();
  await runMigrations();
})();
