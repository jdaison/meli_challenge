import App from "./app";

import config from "config";

import {
  contextMiddleware, middleware as contextMiddlewareInit,
} from "./middleware/context";

import TopSecretController from "./topSecret/topSecret.controller";
import TopSecretSplitController from "./topSecretSplit/topSecretSplit.controller";

const port = process.env.port || config.get<number>("port");

const app = new App({
  port: <number>port,
  controllers: [
    new TopSecretController(),
    new TopSecretSplitController(),
  ],
  middleWares: [contextMiddlewareInit, contextMiddleware]
});


if (process.env.NODE_ENV !== "test") {
  app.listen();
}

process.on('SIGINT', () => {
  app.close();
})

process.on('SIGTERM', () => {
  app.close();
})

export default app;
