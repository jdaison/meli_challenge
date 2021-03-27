import express from "express";
import * as expressHttpContext from "express-http-context";
import config from "config";
import { Logger } from "../utils/logger";
import { headerSchema } from "../topSecret/validators";
const logger = Logger.createLogger(__filename);

export const middleware = expressHttpContext.middleware;

// const uuidv4 = require('uuid').v4
export const contextMiddleware: (
  request: express.Request,
  response: express.Response,
  next: () => void
) => Promise<void> = async (
  request: express.Request,
  response: express.Response,
  next: () => void
) => {

    // Seteo la URI del recurso consumido
    const protocol = request.headers["x-forwarded-proto"] || request.protocol;
    const host = request.headers["x-forwarded-host"] || request.get("host");
    const Authorization = <string>request.headers["authorization"]
    let authorizationCode

    const { value: headers, error: headersError } = headerSchema.validate(request.headers)


    if (!headersError) {
      authorizationCode = Authorization.split(" ")[1]
    }
    const apiToken = process.env.API_TOKEN || config.get("apiToken")

    if (headersError || (authorizationCode !== apiToken)) {

      logger.warn("INVALID_TOKEN", {
        errorMessage: "INVALID_TOKEN",
        authorizationCode,
        path: request.path,
        headers
      })
      response.status(403).send({
        status: "ERROR",
        errorMessage: "INVALID_TOKEN",
      });
      return;
    }

    expressHttpContext.set("x-service-name", getServiceName(request));

    if (process.env.NODE_ENV !== 'test') {
      logger.info({
        message: "Begin request",
        url: protocol + "://" + host,
        url_path: request.originalUrl,
        params: request.params,
        query: request.query,
        headers: request.headers,
        body: request.body,

        via: request.headers["via"],
        method: request.method,
        "remoteIp": request.headers["x-forwarded-for"] || request.connection.remoteAddress,
      });

      const start = new Date().getTime()
      response.on('finish', () => {
        logger.info({
          message: "End request",
          statusMessage: response.statusMessage,
          statusCode: response.statusCode,
          executionTime: new Date().getTime() - start
        });
      });
    }
    next();
  }


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const contextRoutes = new Array<any>();
const base_url = <string>config.get("baseUrl");
const getServiceName = (request: express.Request) => {
  const url = request.url.toString().replace(base_url, "").split("?")[0];
  for (const x of contextRoutes)
    if (url.match(x.regexp) && x.route.methods[request.method.toLowerCase()]) {
      return x.route.path;
    }
};
