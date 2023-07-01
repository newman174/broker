import { exec } from 'child_process';
import knex from "../db/db";
import server from '../app';

afterAll(async () => {
  await exec('npm run resetdb:test');
  knex.destroy();
  server.close();
});