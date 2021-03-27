import TopSecretService from "../src/topSecret/topSecret.service";
import { ResultPosition } from "../src/topSecret/topSecret.entity";


describe("TopSecretService", () => {
  const topSecretService = new TopSecretService()
  const dist1 = 100.0;
  const dist2 = 115.5;
  const dist3 = 142.7;

  const resultPosition: ResultPosition = {
    x: -100.0, y: 75.5
  }

  const kenobiMsg = ["este", "", "un", "mensaje"]
  const SkywalkerMsg = ["este", "", "un", "mensaje"]
  const SatoMsg = ["", "", "es", "", "mensaje"]

  const resultMessage = "este es un mensaje secreto"
  describe("GetLocation", () => {
    test("Should return location", async () => {
      const position = topSecretService.GetLocation(dist1, dist2, dist3)
      expect(position).toMatchObject(resultPosition);
    });
  });

  describe("GetMessage", () => {
    test("Should return message", async () => {
      const message = topSecretService.GetMessage(kenobiMsg, SkywalkerMsg, SatoMsg)
      expect(message).toBe(resultMessage);
    });

  });

});


