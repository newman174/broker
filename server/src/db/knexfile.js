import { dirname } from "path";
import { fileURLToPath } from "url";

export const pwd = dirname(fileURLToPath(import.meta.url));

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
export const baseConfig = {
  client: "pg",
  connection: {
    ssl:
      process.env.ENABLE_DB_SSL === "true"
        ? {
            rejectUnauthorized: false,
          }
        : false,
  },
  seeds: {
    directory: `${pwd}/dev_seeds`,
  },
  migrations: {
    directory: `${pwd}/migrations`,
  },
};

export const development = {
  ...baseConfig,
  connection: {
    ...baseConfig.connection,
    host: process.env.DEV_DB_HOST || "localhost",
    port: process.env.DEV_DB_PORT || 5432,
    user: process.env.DEV_DB_USER || "postgres",
    password: process.env.DEV_DB_PASSWORD,
    database: process.env.DEV_DB_NAME || "broker",
  },
};

export const test = {
  ...baseConfig,
  connection: {
    ...baseConfig.connection,
    host: process.env.TEST_DB_HOST || "localhost",
    port: process.env.TEST_DB_PORT || 5432,
    user: process.env.TEST_DB_USER || "postgres",
    password: process.env.TEST_DB_PASSWORD,
    database: process.env.TEST_DB_NAME || "test_broker",
  },
};

export const production = {
  ...baseConfig,
  connection: {
    ...baseConfig.connection,
    host: process.env.RDS_HOSTNAME || "localhost",
    port: process.env.RDS_PORT || 5432,
    user: process.env.RDS_USERNAME || "postgres",
    password: process.env.RDS_PASSWORD,
    database: process.env.RDS_DB_NAME || "signet-broker",
  },
};

export default {
  baseConfig,
  development,
  test,
  production,
};
