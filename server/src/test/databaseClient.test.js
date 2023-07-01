// import ConsumerContract from "../models/ConsumerContract.js";
// import { jest } from '@jest/globals';
import '../db/db.js';
import contract from '../test/data/cons-prov.json';
import spec from '../test/data/api_spec.json';
import contractRecord from '../test/data/contractRecord.json';
import specRecord from '../test/data/specRecord';
import db from "../db/databaseClient.js";
import Participant from '../models/Participant.js';
import ParticipantVersion from '../models/ParticipantVersion.js';
import VersionContract from '../models/VersionContract.js';
import VersionSpec from '../models/VersionSpec.js';

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

describe('Test publishProviderSpec()', () => {
  const providerId = 10;
  const providerName = 'user_service1';

  let returnedRecord;
  beforeAll(async () => {
    await Participant.query().insert({participantId: 10, participantName: providerName});

    returnedRecord = await db.publishProviderSpec(
      spec,
      providerId,
      "json",
      "version1",
      "main",
    );
  });

  test('returns the correct specRecord', async () => {
    expect({ ...returnedRecord, createdAt: "", updatedAt: "" }).toEqual(specRecord);
  });

  describe('When optional providerVersion and providerBranch are supplied', () => {
    let participantVersionRecord;
    test('inserts a record into participant_versions', async () => {
      participantVersionRecord = await ParticipantVersion
        .query()
        .findOne({participantId: providerId, ParticipantVersion: "version1"});

      expect(participantVersionRecord).toBeDefined();
    });

    test('inserts a record into versions_specs', async () => {
      expect(
        await VersionSpec
          .query()
          .findOne({
            providerSpecId: specRecord.providerSpecId,
            providerVersionId: participantVersionRecord.participantVersionId,
          })
      ).toBeDefined();
    });
  });
});
