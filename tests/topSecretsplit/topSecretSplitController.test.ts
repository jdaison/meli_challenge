import request from 'supertest';
import server from "../../src/server";
import { kenobi, updateKenobi, skywalker, sato, positionAndMessage } from "./mocks.topSecretSplit"
import config from 'config';
import { Satellites } from '../../src/topSecret/topSecret.entity';

const apiToken = process.env.API_TOKEN || config.get("apiToken")


describe("TopSecretSplitController", () => {
  describe("GetMessageAndLocation should return error", () => {
    test("Should response needs authorization header", async () => {
      const { body } = await request(server.app)
        .get(`/api/v1/topsecret_split`)
        .send(kenobi)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(403);
      expect(body).toMatchObject({ "errorMessage": "INVALID_TOKEN", "status": "ERROR" });
    });

    test("Should return error", async () => {
      const { body } = await request(server.app)
        .get(`/api/v1/topsecret_split`)
        .send(kenobi)
        .set('Accept', 'application/json')
        .set("authorization", `Bearer ${apiToken}`)
        .expect('Content-Type', /json/)
        .expect(404);
      expect(body).toMatchObject({
        "errorMessage": "Can't get PositionAndMessage", "status": "ERROR"
      });
    });
  });

  describe("Save info", () => {
    test("Should return error name property no allowed", async () => {
      const { body } = await request(server.app)
        .post(`/api/v1/topsecret_split/kenobi`)
        .send(kenobi)
        .set('Accept', 'application/json')
        .set("authorization", `Bearer ${apiToken}`)
        .expect('Content-Type', /json/)
        .expect(400);
      expect(body).toMatchObject({ "errorMessage": "Broken contract ValidationError: \"name\" is not allowed ", "status": "ERROR" });
    });
    test("Should save info", async () => {
      const kenobiInfo = { distance: kenobi.distance, message: kenobi.message }
      const updateKenobiInfo = { distance: updateKenobi.distance, message: updateKenobi.message }
      const skywalkerInfo = { distance: skywalker.distance, message: skywalker.message }
      const satoInfo = { distance: sato.distance, message: sato.message }
      const satellites1: Satellites = {
        satellites: [kenobi]
      }
      const { body: body1 } = await request(server.app)
        .post(`/api/v1/topsecret_split/kenobi`)
        .send(kenobiInfo)
        .set('Accept', 'application/json')
        .set("authorization", `Bearer ${apiToken}`)
        .expect('Content-Type', /json/)
        .expect(200);
      expect(body1).toMatchObject(satellites1);

      const satellites2: Satellites = {
        satellites: [updateKenobi]
      }
      const { body: body2 } = await request(server.app)
        .post(`/api/v1/topsecret_split/kenobi`)
        .send(updateKenobiInfo)
        .set('Accept', 'application/json')
        .set("authorization", `Bearer ${apiToken}`)
        .expect('Content-Type', /json/)
        .expect(200);
      expect(body2).toMatchObject(satellites2);

      const satellites3: Satellites = {
        satellites: [updateKenobi, skywalker]
      }
      const { body: body3 } = await request(server.app)
        .post(`/api/v1/topsecret_split/skywalker`)
        .send(skywalkerInfo)
        .set('Accept', 'application/json')
        .set("authorization", `Bearer ${apiToken}`)
        .expect('Content-Type', /json/)
        .expect(200);
      expect(body3).toMatchObject(satellites3);

      const satellites4: Satellites = {
        satellites: [updateKenobi, skywalker, sato]
      }
      const { body: body4 } = await request(server.app)
        .post(`/api/v1/topsecret_split/sato`)
        .send(satoInfo)
        .set('Accept', 'application/json')
        .set("authorization", `Bearer ${apiToken}`)
        .expect('Content-Type', /json/)
        .expect(200);
      expect(body4).toMatchObject(satellites4);
    });

  });

  describe("GetMessageAndLocation should return message and position", () => {
    test("Should return error", async () => {
      const { body } = await request(server.app)
        .get(`/api/v1/topsecret_split`)
        .send(kenobi)
        .set('Accept', 'application/json')
        .set("authorization", `Bearer ${apiToken}`)
        .expect('Content-Type', /json/)
        .expect(200);
      expect(body).toMatchObject(positionAndMessage);
    });
  });
});


