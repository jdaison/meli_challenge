import BaseController from "../utils/base.controller";
import { Request, Response, Router } from "express";
import { Logger } from "../../src/utils/logger";
const logger = Logger.createLogger(__filename);

import TopSecretService from "./topSecret.service";
import { Satellites, Result } from "./topSecret.entity"

import { satellitesSchema } from './validators'

class TopSecretController extends BaseController {

  public initRoutes(router: Router): void {
    router.post("/topsecret", this.handler(this.getPositionAndMessage));
  }

  private async getPositionAndMessage(request: Request, response: Response) {

    const { value: body, error: bodyError } = satellitesSchema.validate(request.body)

    if (bodyError) {
      response.status(400).send({
        status: "ERROR",
        errorMessage: `Broken contract ${bodyError}`,
      });
      logger.warn("getPositionAndMessage",
        { errorMessage: { bodyError } })
      return
    }

    const requestBody: Satellites = {
      ...body,
    }

    const topSecreService = new TopSecretService({
      kenobi: [2, 3],
      skywalker: [3, 4],
      sato: [5, 2]
    })
    const messages: Array<Array<string>> = []
    const distances: Array<number> = []
    requestBody.satellites.forEach(satellite => {
      messages.push(satellite.message)
      distances.push(satellite.distance)
    });
    const position = topSecreService.GetLocation(distances)
    const message = topSecreService.GetMessage(messages)
    const result: Result = {
      position,
      message
    }
    if (message === "") {
      response.status(404).send({
        status: "ERROR",
        errorMessage: `Can't get message`,
      });
      logger.error("Request error", {
        url: request.path,
        method: request.method,
        statusCode: 400,
        success: false,
        errorMessage: `Can't get message`,
        parameters: request.params,
        body: request.body,
        execTime: new Date().getTime(),
      });
      return;
    }
    response.send(result);
  }
}
export default TopSecretController;
