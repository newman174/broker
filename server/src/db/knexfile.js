// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
export const development = {
  client: "postgresql",
  connection: {
    host:     process.env.DEV_DB_HOST,
    port:     process.env.DEV_DB_PORT,
    user:     process.env.DEV_DB_USER,
    password: process.env.DEV_DB_PASSWORD,
    database: process.env.DEV_DB_NAME,
  },
  seeds: {
    directory: "./dev_seeds",
  },
};

export const test = {
  client: "postgresql",
  connection: {
    host:     process.env.TEST_DB_HOST,
    port:     process.env.TEST_DB_PORT,
    user:     process.env.TEST_DB_USER,
    password: process.env.TEST_DB_PASSWORD,
    database: process.env.TEST_DB_NAME,
  },
  seeds: {
    directory: "./test_seeds",
  },
};

// export const production = {
//   client: "postgresql",
//   connection: {
//     host: "localhost",
//     port: "5432",
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: "broker",
//   },
//   pool: {
//     min: 2,
//     max: 10,
//   },
//   migrations: {
//     tableName: "knex_migrations",
//   },
// };
