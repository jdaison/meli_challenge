import { ResultPosition } from "./topSecret.entity";
class TopSecretService {

  GetLocation(dist1: number, dist2: number, dist3: number): ResultPosition {
    const result: ResultPosition = {
      x: -100.0, y: 75.5
    }
    return result
  }

  GetMessage(msg1: Array<string>, msg2: Array<string>, msg3: Array<string>): string {
    const result = "este es un mensaje secreto";
    return result
  }
}
export default TopSecretService;
