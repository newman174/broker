import { jest } from '@jest/globals';
import request from 'supertest';
import server from '../../app.js';
import spec from '../../test/data/api_spec.json';
import specRecord from '../../test/data/specRecord.json';
import db from "../../db/databaseClient.js";
import webhook from '../../services/webhookService.js';
import comp from "../../services/comparisonService.js";

const REQ_BODY = {
  providerName: "user_service",
  specFormat: "json",
  providerVersion: "",
  providerBranch: "",
  spec: spec,
};

describe('POST /api/specs', () => {
  const participant = {
    participantId: 1,
    participantName: 'user_service',
    createdAt: "",
    updatedAt: ""
  };

  test('returns 400 when spec schema is invalid', async () => {
    const malformedBody = {
      providerName: "user_service",
      specFormat: "json",
      providerVersion: "",
      providerBranch: "",
      spec: { ...spec, info: undefined },
    };

    const res = await request(server)
      .post('/api/specs')
      .send(JSON.stringify(malformedBody));

    expect(res.status).toEqual(400);
    expect(res.body).toEqual({error: 'Spec schema is invalid'});
  });

  test('calls databaseClient methods correctly, and returns 201 (JSON spec)', async () => {
    db.getParticipant = jest.fn();
    db.getParticipant.mockResolvedValue(participant);

    db.participantVersionExists = jest.fn();
    db.participantVersionExists.mockResolvedValue(false);

    db.publishProviderSpec = jest.fn();
    db.publishProviderSpec.mockResolvedValue(specRecord);

    webhook.newSpecEvent = jest.fn();
    comp.compareWithConsumerContracts = jest.fn();

    const res = await request(server)
      .post('/api/specs')
      .send(REQ_BODY);

    expect(res.status).toEqual(201);
    expect(db.getParticipant.mock.calls[0]).toEqual(["user_service"]);
    expect(db.publishProviderSpec.mock.calls[0]).toEqual([spec, 1, "json", "", ""]);
    expect(comp.compareWithConsumerContracts.mock.calls[0]).toEqual([1]);
  });
});
