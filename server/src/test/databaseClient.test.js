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
import Integration from '../models/Integration.js';
import WebhookSubscription from '../models/WebhookSubscription.js';
import webhookSubscriptionRecord from './data/webhookSubscriptionRecord.json';

describe('Test publishConsumerContract()', () => {
  const consumerId = 10;
  const consumerName = "service_1"
  const consumerVersion = 'version1';
  const consumerBranch = 'main';

  test('returns the correct contractRecord', async () => {
    await Participant.query().insert({participantId: consumerId, participantName: consumerName});

    const returnedRecord = await db.publishConsumerContract(contract, consumerId, consumerVersion, consumerBranch);

    expect({ ...returnedRecord, createdAt: "", updatedAt: "" }).toEqual(contractRecord);
  });

  test('inserts a record into participant_versions', async () => {
    await Participant.query().insert({participantId: consumerId, participantName: consumerName});

    const returnedRecord = await db.publishConsumerContract(contract, consumerId, consumerVersion, consumerBranch);

    const participantVersionRecord = await ParticipantVersion
      .query()
      .findOne({participantId: consumerId, ParticipantVersion: consumerVersion});

    expect(participantVersionRecord).toBeDefined();

    expect(
      await VersionContract
        .query()
        .findOne({
          consumerContractId: returnedRecord.consumerContractId,
          consumerVersionId: participantVersionRecord.participantVersionId,
        })
    ).toBeDefined();
  });
});

describe('Test publishProviderSpec()', () => {
  const providerId = 10;
  const providerName = 'user_service1';

  test('returns the correct specRecord', async () => {
    await Participant.query().insert({participantId: 10, participantName: providerName});

    const returnedRecord = await db.publishProviderSpec(
      spec,
      providerId,
      "json",
      "version1",
      "main",
    );

    expect({ ...returnedRecord, createdAt: "", updatedAt: "" }).toEqual(specRecord);
  });

  test('inserts a record into participant_versions', async () => {
    await Participant.query().insert({participantId: 10, participantName: providerName});

    const returnedRecord = await db.publishProviderSpec(
      spec,
      providerId,
      "json",
      "version1",
      "main",
    );

    const participantVersionRecord = await ParticipantVersion
      .query()
      .findOne({participantId: providerId, ParticipantVersion: "version1"});

    expect(participantVersionRecord).toBeDefined();

    expect(
      await VersionSpec
        .query()
        .findOne({
          providerSpecId: returnedRecord.providerSpecId,
          providerVersionId: participantVersionRecord.participantVersionId,
        })
    ).toBeDefined();
  });
});

describe('Test createWebhookSubscription()', () => {
  test('returns the correct webhookSubscriptionRecord', async () => {
    await Participant.query().insert({
      participantId: 21,
      participantName: 'consumer_service',
    });

    await Participant.query().insert({
      participantId: 22,
      participantName: 'provider_service',
    });

    await Integration.query().insert({
      integrationId: 20,
      consumerId: 21,
      providerId: 22,
    });

    const returnedRecord = await db.createWebhookSubscription({
      integrationId: 20,
      events: {
        specPublish: true,
        comparison: true,
      },
      url: "https://requestbinder.com/webhook-endpoint",
      description: "my sevice wants to know these things...",
    });

    expect({ ...returnedRecord, createdAt: "", updatedAt: "" }).toEqual(webhookSubscriptionRecord);
  });
});