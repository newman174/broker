import { Model } from "objection";
import Knex from "knex";
import "dotenv/config";

const knex = Knex({
  client: "postgresql",
  connection: {
    host: "localhost",
    port: "5432",
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: "broker",
  },
});

Model.knex(knex);

export default knex;
