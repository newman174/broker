import { Model, knexSnakeCaseMappers } from "objection";
import Knex from "knex";
import "dotenv/config";

const environment = process.env.NODE_ENV || "development";

let knex;

if (environment === "development") {
  knex = Knex({
    client: "postgresql",
    connection: {
      host: process.env.RDS_HOSTNAME || process.env.DEV_DB_HOST,
      port: process.env.RDS_PORT || process.env.DEV_DB_PORT,
      user: process.env.RDS_USERNAME || process.env.DEV_DB_USER,
      password: process.env.RDS_PASSWORD || process.env.DEV_DB_PASSWORD,
      database: process.env.RDS_DB_NAME || process.env.DEV_DB_NAME || "broker",
      ssl: {
        rejectUnauthorized: false,
      },
    },
    ...knexSnakeCaseMappers(),
  });
} else if (environment === "test") {
  knex = Knex({
    client: "postgresql",
    connection: {
      host: process.env.TEST_DB_HOST,
      port: process.env.TEST_DB_PORT,
      user: process.env.TEST_DB_USER,
      password: process.env.TEST_DB_PASSWORD,
      database: process.env.RDS_DB_NAME || "test_broker",
    },
    ...knexSnakeCaseMappers(),
  });
} else {
  throw new Error(
    "Server Error: unable to connect to database - invalid RUNTIME_ENV"
  );
}

Model.knex(knex);

export default knex;
