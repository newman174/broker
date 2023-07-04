import knex from "../db/db";
import server from '../app';

import {
  patchPgForTransactions,
  startTransaction,
  rollbackTransaction,
} from 'pg-transactional-tests';

// patches pg to enable per-test transactions
patchPgForTransactions();

// start transaction before all tests:
beforeAll(startTransaction)

// start transaction before each test:
beforeEach(startTransaction);

// rollback transaction after each test:
afterEach(rollbackTransaction);

afterAll(async () => {
  await rollbackTransaction()
  knex.destroy();
  server.close();
});