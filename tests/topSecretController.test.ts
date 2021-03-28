import request from 'supertest';
import server from "../src/server";
import {
  badSatellites, oneSatellite, satellitesInvalidName,
  satellites, satellitesInvalidDistance, satellitesInvalidMessage, resultResponse
} from './mocks.controller';
import config from 'config';

const apiToken = process.env.API_TOKEN || config.get("apiToken")


describe("TopSecretController", () => {
  describe("GetMessageAndLocation", () => {
    test("Should response needs authorization header", async () => {
      const { body } = await request(server.app)
        .post(`/api/v1/topsecret`)
        .send(badSatellites)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(403);
      expect(body).toMatchObject({ "errorMessage": "INVALID_TOKEN", "status": "ERROR" });
    });
    test("Should return error missing satellites property", async () => {
      const { body } = await request(server.app)
        .post(`/api/v1/topsecret`)
        .send(badSatellites)
        .set('Accept', 'application/json')
        .set("authorization", `Bearer ${apiToken}`)
        .expect('Content-Type', /json/)
        .expect(400);
      expect(body).toMatchObject({ "errorMessage": "Broken contract ValidationError: \"satellites\" is required", "status": "ERROR" });
    });

    test("Should return error missing satellites property", async () => {
      const { body } = await request(server.app)
        .post(`/api/v1/topsecret`)
        .send(oneSatellite)
        .set('Accept', 'application/json')
        .set("authorization", `Bearer ${apiToken}`)
        .expect('Content-Type', /json/)
        .expect(400);
      expect(body).toMatchObject({ "errorMessage": "Broken contract ValidationError: \"satellites\" must contain 3 items", "status": "ERROR" });
    });
    test("Should return error for invalid name of satellites", async () => {
      const { body } = await request(server.app)
        .post(`/api/v1/topsecret`)
        .send(satellitesInvalidName)
        .set('Accept', 'application/json')
        .set("authorization", `Bearer ${apiToken}`)
        .expect('Content-Type', /json/)
        .expect(400);
      expect(body).toMatchObject({ "errorMessage": "Broken contract ValidationError: \"satellites[0].name\" must be one of [kenobi, skywalker, sato]", "status": "ERROR" });
    });
    test("Should return error for invalid distance property", async () => {
      const { body } = await request(server.app)
        .post(`/api/v1/topsecret`)
        .send(satellitesInvalidDistance)
        .set('Accept', 'application/json')
        .set("authorization", `Bearer ${apiToken}`)
        .expect('Content-Type', /json/)
        .expect(400);
      expect(body).toMatchObject({ "errorMessage": "Broken contract ValidationError: \"satellites[0].distance\" must be a positive number", "status": "ERROR" });
    });

    test("Should return error for invalid message property", async () => {
      const { body } = await request(server.app)
        .post(`/api/v1/topsecret`)
        .send(satellitesInvalidMessage)
        .set('Accept', 'application/json')
        .set("authorization", `Bearer ${apiToken}`)
        .expect('Content-Type', /json/)
        .expect(400);
      expect(body).toMatchObject({ "errorMessage": "Broken contract ValidationError: \"satellites[0].message\" must contain at least 1 items", "status": "ERROR" });
    });

    test("Should return error for invalid message property", async () => {
      const { body } = await request(server.app)
        .post(`/api/v1/topsecret`)
        .send(satellites)
        .set('Accept', 'application/json')
        .set("authorization", `Bearer ${apiToken}`)
        .expect('Content-Type', /json/)
        .expect(200);
      expect(body).toMatchObject(resultResponse);
    });

  });
});


