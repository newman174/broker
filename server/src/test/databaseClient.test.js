// import ConsumerContract from "../models/ConsumerContract.js";
// import { jest } from '@jest/globals';
import '../db/db.js';
import contract from '../test/data/cons-prov.json';
import contractRecord from '../test/data/contractRecord.json';
import db from "../db/databaseClient.js";
import Participant from '../models/Participant.js';
import ParticipantVersion from '../models/ParticipantVersion.js';
import VersionContract from '../models/VersionContract.js';


describe('Test publishConsumerContract()', () => {
  const consumerId = 2;
  const consumerName = "service_1"
  const consumerVersion = 'version1';
  const consumerBranch = 'main';

  let returnedRecord;
  beforeAll(async () => {
    await Participant.query().insert({participantId: consumerId, participantName: consumerName});

    returnedRecord = await db.publishConsumerContract(contract, consumerId, consumerVersion, consumerBranch);
  });

  test('returns the correct contractRecord', async () => {
    expect({ ...returnedRecord, createdAt: "", updatedAt: "" }).toEqual(contractRecord);
  });

  let participantVersionRecord;
  test('inserts a record into participant_versions', async () => {
    participantVersionRecord = await ParticipantVersion
      .query()
      .findOne({participantId: consumerId, ParticipantVersion: consumerVersion});

    expect(participantVersionRecord).toBeDefined();
  });

  test('inserts a record into versions_contracts', async () => {
    expect(
      await VersionContract
        .query()
        .findOne({
          consumerContractId: contractRecord.consumerContractId,
          consumerVersionId: participantVersionRecord.participantVersionId,
        })
    ).toBeDefined();
  });
});
