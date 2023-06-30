import { exec } from 'child_process';
import knex from "../db/db";

beforeAll(async () => {
  // teardown and rebuild the test database before running any tests
  await exec('npm run resetdb:test');
});

afterAll(() => {
  // close the database connection after all tests are complete
  knex.destroy();
});