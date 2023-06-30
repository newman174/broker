// import ConsumerContract from "../models/ConsumerContract.js";
// import { jest } from '@jest/globals';
import server from '../app.js';
import '../db/db.js';
import contract from '../test/data/cons-prov.json';
import contractRecord from '../test/data/contractRecord.json';
import db from "../db/databaseClient.js";
import Participant from '../models/Participant.js';


describe('Test publishConsumerContract()', () => {
  const consumerId = 2;
  const consumerName = "service_1"
  const consumerVersion = 'version1';
  const consumerBranch = 'main';

  
  test('it returns the correct contractRecord', async () => {
    await Participant.query().insert({participantId: consumerId, participantName: consumerName});

    const returnedRecord = await db.publishConsumerContract(contract, consumerId, consumerVersion, consumerBranch);
  
    expect({ ...returnedRecord, createdAt: "", updatedAt: "" }).toEqual(contractRecord);
    expect(1).toEqual(1);
  });
});

test('to tests', () => {
  expect(1).toEqual(1);
});

afterAll(() => {
  server.close();
});