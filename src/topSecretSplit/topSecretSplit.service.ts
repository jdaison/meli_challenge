import { Result, Satellite, Satellites } from "../topSecret/topSecret.entity";
import TopSecretService from "../topSecret/topSecret.service";

class TopSecretSplitService {
  private static instance: TopSecretSplitService;
  private info: Satellites = { satellites: [] }
  static getInstance(): TopSecretSplitService {
    if (!TopSecretSplitService.instance) {
      TopSecretSplitService.instance = new TopSecretSplitService();
    }
    return TopSecretSplitService.instance;
  }

  SaveInfo(info: Satellite): Satellites {
    const index = this.info.satellites.map(satelitte => { return satelitte.name }).indexOf(info.name)
    if (index >= 0) {
      this.info.satellites[index] = info
    } else {
      this.info.satellites.push(info)
    }
    return this.info
  }

  getPositionAndMessage(): Result | boolean {
    if (this.info.satellites.length != 3) {
      this.info = { satellites: [] }
      return false
    }
    const topSecreService = new TopSecretService({
      kenobi: [2, 3],
      skywalker: [3, 4],
      sato: [5, 2]
    })
    const messages: Array<Array<string>> = []
    const distances: Array<number> = []
    this.info.satellites.forEach(satellite => {
      messages.push(satellite.message)
      distances.push(satellite.distance)
    });
    const position = topSecreService.GetLocation(distances)
    const message = topSecreService.GetMessage(messages)
    const result: Result = {
      position,
      message
    }
    this.info = { satellites: [] }
    return result;
  }

}
export default TopSecretSplitService;
