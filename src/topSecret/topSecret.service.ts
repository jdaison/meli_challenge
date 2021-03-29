import { sin, cos, unit } from 'mathjs'
import { toDegrees } from '../utils/toRadians';
import { InitialPosition, ResultPosition } from "./topSecret.entity";

class TopSecretService {
  initialPosition: InitialPosition

  constructor(initialPosition: InitialPosition) {
    this.initialPosition = initialPosition
  }

  GetLocation(distances: Array<number>): ResultPosition {
    const [dist1, dist2, dist3] = distances
    // Based on https://stackoverflow.com/questions/16176656/trilateration-and-locating-the-point-x-y-z

    const p2 = [
      this.initialPosition.skywalker[0] - 1 * this.initialPosition.kenobi[0],
      this.initialPosition.skywalker[1] - 1 * this.initialPosition.kenobi[1]
    ]
    const p3 = [
      this.initialPosition.sato[0] - 1 * this.initialPosition.kenobi[0],
      this.initialPosition.sato[1] - 1 * this.initialPosition.kenobi[1]
    ]
    let x = 0
    let y = 0
    if (p2[1] === 0) {
      x = (Math.pow(dist1, 2) - Math.pow(dist2, 2) + Math.pow(p2[0], 2)) / (2 * p2[0])
      y = (Math.pow(dist1, 2) - Math.pow(dist3, 2) + Math.pow(p3[0], 2) + Math.pow(p3[1], 2)) / (2 * p3[1]) - (p3[0] / p3[1]) * x
      x += this.initialPosition.kenobi[0]
      y += this.initialPosition.kenobi[1]
    } else {
      let theta = Math.acos(1 / Math.sqrt(p2[0] + p2[1]))
      theta = p2[1] >= 0 ? -1 * toDegrees(theta) : toDegrees(theta)
      const p2n = [0, 0]

      p2n[0] = (p2[0] * cos(unit(theta, 'deg'))) - (p2[1] * sin(unit(theta, 'deg')))
      p2n[1] = (p2[0] * sin(unit(theta, 'deg'))) + (p2[1] * cos(unit(theta, 'deg')))

      const p3n = [0, 0]
      p3n[0] = p3[0] * cos(unit(theta, 'deg')) - (p3[1] * sin(unit(theta, 'deg')))
      p3n[1] = p3[0] * sin(unit(theta, 'deg')) + (p3[1] * cos(unit(theta, 'deg')))
      const xn = (Math.pow(dist1, 2) - Math.pow(dist2, 2) + Math.pow(p2n[0], 2)) / (2 * p2n[0])
      const yn = (Math.pow(dist1, 2) - Math.pow(dist3, 2) + Math.pow(p3n[0], 2) + Math.pow(p3n[1], 2)) / (2 * p3n[1]) - (p3n[0] / p3n[1]) * x

      x += xn * cos(unit(-1 * theta, 'deg')) - (yn * sin(unit(-1 * theta, 'deg')))
      y += xn * sin(unit(theta, 'deg')) + (yn * cos(unit(theta, 'deg')))

      x += this.initialPosition.kenobi[0]
      y += this.initialPosition.kenobi[1]
    }

    const result: ResultPosition = { x, y }
    return result
  }

  GetMessage(messages: Array<Array<string>>): string {

    for (const message of messages) {
      if (message.length === 0) return ""
      if (message.every(word => word === "")) return ""
    }

    const messagesOrdered = messages.sort((a, b) => {
      return b.length - a.length;
    });
    const maxLength = messagesOrdered[0].length
    const minLength = messagesOrdered[2].length
    const completeMessage: Array<string> = Array(maxLength).fill("")

    for (const message of messagesOrdered) {
      const initialPosition = maxLength - message.length
      message.forEach((word, index) => {
        if (!completeMessage[index + initialPosition]) {
          completeMessage[index + initialPosition] = word
        }
      })
    }
    const result = completeMessage.join(" ").trim().split(" ");

    if (result.some(word => word === "")) return ""

    if (result.length !== minLength) return ""

    return result.join(" ")
  }

}
export default TopSecretService;
