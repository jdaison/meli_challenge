import TopSecretSplitService from "../../src/topSecretSplit/topSecretSplit.service";
import { Satellites } from "../../src/topSecret/topSecret.entity";
import { kenobi, updateKenobi, skywalker, sato, positionAndMessage } from "./mocks.topSecretSplit"

const topSecretSplitService = TopSecretSplitService.getInstance();
describe("TopSecretsplitService", () => {
  describe("get instance", () => {
    test("Shouldn be a same instancee", async () => {
      const topSecretSplitService2 = TopSecretSplitService.getInstance();
      expect(topSecretSplitService).toBe(topSecretSplitService2);
    });
  });

  describe("getPositionAndMessage", () => {
    test("Shouldn't return a message", async () => {
      const result = topSecretSplitService.getPositionAndMessage()
      expect(result).toBe(false);
    });
  });
  describe("Should save info", () => {
    test("Should return info with kenobi satellite", async () => {
      const satellites: Satellites = {
        satellites: [kenobi]
      }
      const result = topSecretSplitService.SaveInfo(kenobi)
      expect(result).toMatchObject(satellites);
    });
    test("Should return info updated", async () => {
      const satellites: Satellites = {
        satellites: [updateKenobi]
      }
      const result = topSecretSplitService.SaveInfo(updateKenobi)
      expect(result).toMatchObject(satellites);
    });
    test("Should return info with kenobi update and skywalker", async () => {
      const satellites: Satellites = {
        satellites: [updateKenobi, skywalker]
      }
      const result = topSecretSplitService.SaveInfo(skywalker)
      expect(result).toMatchObject(satellites);
    });
    test("Should return info with kenobi updated, skywalker and sato", async () => {
      const satellites: Satellites = {
        satellites: [updateKenobi, skywalker, sato]
      }
      const result = topSecretSplitService.SaveInfo(sato)
      expect(result).toMatchObject(satellites);
    });
  });

  describe("getPositionAndMessage", () => {
    test("Shouldn return a message", async () => {
      const result = topSecretSplitService.getPositionAndMessage()
      expect(result).toMatchObject(positionAndMessage);
    });
  });

});


