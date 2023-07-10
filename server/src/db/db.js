import { Model, knexSnakeCaseMappers } from "objection";
import Knex from "knex";
import "dotenv/config";

const config = {
  client: "postgresql",
  ...knexSnakeCaseMappers(),
};

if (process.env.NODE_ENV === "production") {
  config.connection = {
    host: process.env.RDS_HOSTNAME,
    port: process.env.RDS_PORT,
    user: process.env.RDS_USERNAME,
    password: process.env.RDS_PASSWORD,
    database: process.env.RDS_DB_NAME,
  };
} else if (process.env.NODE_ENV === "development") {
  config.connection = {
    host: process.env.DEV_DB_HOST,
    port: process.env.DEV_DB_PORT,
    user: process.env.DEV_DB_USER,
    password: process.env.DEV_DB_PASSWORD,
    database: process.env.DEV_DB_NAME,
  };
} else if (process.env.NODE_ENV === "test") {
  config.connection = {
    host: process.env.TEST_DB_HOST,
    port: process.env.TEST_DB_PORT,
    user: process.env.TEST_DB_USER,
    password: process.env.TEST_DB_PASSWORD,
    database: process.env.TEST_DB_NAME,
  };
} else {
  throw new Error(
    `Server Error: unable to connect to database - invalid RUNTIME_ENV: ${process.env.NODE_ENV}.`
  );
}

if (process.env.ENABLE_DB_SSL === "true") {
  config.connection.ssl = {
    rejectUnauthorized: false,
  };
}

let knex = Knex(config);

Model.knex(knex);

export default knex;
