import TopSecretService from "../../src/topSecret/topSecret.service";
import { ResultPosition } from "../../src/topSecret/topSecret.entity";


describe("TopSecretService", () => {
  describe("GetLocation", () => {
    test("Should return location", async () => {
      const resultPosition: ResultPosition = {
        x: 0, y: 0
      }
      const distances = [2, 2, 2]
      const topSecretService = new TopSecretService(
        {
          kenobi: [-1, 1],
          skywalker: [1, 1],
          sato: [-1, -1]
        }
      )
      const position = topSecretService.GetLocation(distances)
      expect(position).toMatchObject(resultPosition);
    });
  });
  describe("GetLocation", () => {
    test("Should return location", async () => {
      const resultPosition: ResultPosition = {
        x: 3.75,
        y: 1.25
      }
      const distances = [2, 2, 2]
      const topSecretService = new TopSecretService(
        {
          kenobi: [2, 3],
          skywalker: [3, 4],
          sato: [5, 2]
        }
      )
      const position = topSecretService.GetLocation(distances)
      expect(position).toMatchObject(resultPosition);
    });
  });

  // describe("GetLocation", () => {
  //   test("Should return location", async () => {
  //     const resultPosition: ResultPosition = {
  //       x: -100.0,
  //       y: 75.5
  //     }
  //     const dist1 = 100.0;
  //     const dist2 = 115.5;
  //     const dist3 = 142.7;
  //     const topSecretService = new TopSecretService(
  //       {
  //         kenobi: [-500, -200],
  //         skywalker: [100, -100],
  //         sato: [500, 100]
  //       }
  //     )
  //     const position = topSecretService.GetLocation(dist1, dist2, dist3)
  //     expect(position).toMatchObject(resultPosition);
  //   });
  // });

  describe("GetMessage", () => {
    test("Should return message", async () => {
      const topSecretService = new TopSecretService(
        {
          kenobi: [-1, 1],
          skywalker: [1, 1],
          sato: [-1, -1]
        }
      )
      const kenobiMsg = ["este", "", "", "mensaje", ""]
      const SkywalkerMsg = ["", "es", "", "", "secreto"]
      const SatoMsg = ["este", "", "un", "", ""]

      const resultMessage = "este es un mensaje secreto"
      const message = topSecretService.GetMessage([kenobiMsg, SkywalkerMsg, SatoMsg])
      expect(message).toBe(resultMessage);
    });

    test("Should return message", async () => {
      const topSecretService = new TopSecretService(
        {
          kenobi: [-1, 1],
          skywalker: [1, 1],
          sato: [-1, -1]
        }
      )
      const kenobiMsg = ["", "este", "es", "un", "mensaje"]
      const SkywalkerMsg = ["este", "", "un", "mensaje"]
      const SatoMsg = ["", "", "es", "", "mensaje"]

      const resultMessage = "este es un mensaje"
      const message = topSecretService.GetMessage([kenobiMsg, SkywalkerMsg, SatoMsg])
      expect(message).toBe(resultMessage);
    });

    test("Shouldn't return message", async () => {
      const topSecretService = new TopSecretService(
        {
          kenobi: [-1, 1],
          skywalker: [1, 1],
          sato: [-1, -1]
        }
      )
      const kenobiMsg = ["", "este", "es", "", "mensaje"]
      const SkywalkerMsg = ["este", "", "", "mensaje"]
      const SatoMsg = ["", "", "es", "", "mensaje"]

      const message = topSecretService.GetMessage([kenobiMsg, SkywalkerMsg, SatoMsg])
      expect(message).toBe("");
    });
    test("Shouldn't return message", async () => {
      const topSecretService = new TopSecretService(
        {
          kenobi: [-1, 1],
          skywalker: [1, 1],
          sato: [-1, -1]
        }
      )
      const kenobiMsg = ["", "", "", "", ""]
      const SkywalkerMsg = ["este", "", "un", "mensaje"]
      const SatoMsg = ["", "", "es", "", "mensaje"]

      const message = topSecretService.GetMessage([kenobiMsg, SkywalkerMsg, SatoMsg])
      expect(message).toBe("");
    });

  });

});


