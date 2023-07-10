import { Model, knexSnakeCaseMappers } from "objection";
import Knex from "knex";
import "dotenv/config";
import dbConfigs from "./knexfile.js";

const { NODE_ENV } = process.env;

let config = dbConfigs[NODE_ENV];

if (!config) {
  throw new Error(
    `Server Error: unable to connect to database - invalid RUNTIME_ENV: ${NODE_ENV}.`
  );
}

config = {
  ...config,
  ...knexSnakeCaseMappers(),
};

const knex = Knex(config);

Model.knex(knex);

export default knex;
