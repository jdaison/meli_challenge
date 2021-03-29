import BaseController from "../utils/base.controller";
import { Request, Response, Router } from "express";
import { Logger } from "../../src/utils/logger";
const logger = Logger.createLogger(__filename);

import TopSecretSplitService from "./topSecretSplit.service";
import { Satellites, Satellite } from "../topSecret/topSecret.entity"
import { info } from './validators'
import { pathParams } from './validators'
const topSecretSplitService = TopSecretSplitService.getInstance();

class TopSecretSplitController extends BaseController {

  public initRoutes(router: Router): void {
    router.post("/topsecret_split/:satellite_name", this.handler(this.saveInfo));
    router.get("/topsecret_split/", this.handler(this.getPositionAndMessage));
  }

  private async saveInfo(request: Request, response: Response) {

    const { value: body, error: bodyError } = info.validate(request.body)
    const { value: params, error: paramsError } = pathParams.validate(request.params)

    if (bodyError || paramsError) {
      response.status(400).send({
        status: "ERROR",
        errorMessage: `Broken contract ${bodyError || paramsError} `,
      });
      logger.warn("saveInfo",
        { errorMessage: { bodyError, paramsError } })
      return
    }

    const satellite: Satellite = {
      name: params.satellite_name,
      ...body
    }

    const result: Satellites = topSecretSplitService.SaveInfo(satellite)

    response.send(result);
  }

  private async getPositionAndMessage(request: Request, response: Response) {

    const result = topSecretSplitService.getPositionAndMessage()

    if (!result) {
      response.status(404).send({
        status: "ERROR",
        errorMessage: `Can't get PositionAndMessage information isn't enough`,
      });
      logger.error("Request error", {
        url: request.path,
        method: request.method,
        statusCode: 404,
        success: false,
        errorMessage: `Can't get PositionAndMessage information isn't enough`,
        parameters: request.params,
        body: request.body,
        execTime: new Date().getTime(),
      });
      return;
    }
    response.send(result);
  }
}
export default TopSecretSplitController;
