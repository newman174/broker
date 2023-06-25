// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
export const development = {
  client: "postgresql",
  connection: {
    host: "localhost",
    port: "5432",
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: "broker",
  },
  seeds: {
    directory: "./seeds",
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
