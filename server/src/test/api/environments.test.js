import { jest } from '@jest/globals';
import request from 'supertest';
import server from '../../app.js';
import db from "../../db/databaseClient.js";

describe('Test POST /api/environments', () => {
  test('returns 400 when an invalid enironmentName is sent', async () => {
    const malformedBody = {environmentNa: "production"};

    const res = await request(server)
      .post('/api/environments')
      .send(JSON.stringify(malformedBody));

    expect(res.status).toEqual(400);
    expect(res.body).toEqual({error: 'Request body must have an environmentName (string) property'});
  });

  test('returns 201 with JSON environmentRecord', async () => {
    const environmentRecord = {
      environmentId: 1,
      environmentName: "production",
      createdAt: '',
      updatedAt: '',
    };

    db.createEnvironment = jest.fn();
    db.createEnvironment.mockResolvedValue(environmentRecord);

    const requestBody = {environmentName: "production"};

    const res = await request(server)
      .post('/api/environments')
      .send(JSON.stringify(requestBody));

    expect(res.status).toEqual(201);
    expect(res.body).toEqual(environmentRecord);
  });
});