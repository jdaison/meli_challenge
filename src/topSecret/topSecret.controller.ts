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

    const satellites: Satellites = {
      ...body,
    }

    const contactServices = new TopSecretService()
    const position = await contactServices.GetLocation(1, 2, 3)
    const message = await contactServices.GetMessage([""], [""], [""])
    const result: Result = {
      position,
      message
    }
    response.send(result);
  }
}
export default TopSecretController;
