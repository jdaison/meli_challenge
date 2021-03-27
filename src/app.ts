import express, { Application } from "express";
import { Logger } from "./utils/logger";
import config from "config";
import BaseController from "./utils/base.controller";
import swaggerUI from "swagger-ui-express";
import { swaggerDocument } from "../swagger/swagger";
import { Server } from "http";
import helmet from "helmet";
import { serializeError } from "serialize-error";
const options = {
  swaggerOptions: {
    docExpansion: "none",
  },
};

const logger = Logger.createLogger(__filename);
class App {
  public app: Application;
  public port: number;
  private static server: Server;
  static current: express.Application;
  constructor(appInit: {
    port: number;
    /*eslint-disable-next-line*/
    middleWares: any;
    controllers: Array<BaseController>;
  }) {
    this.app = express();
    this.port = appInit.port;
    this.middlewares(appInit.middleWares);
    this.routes(appInit.controllers);
    this.app.use(
      "/docs",
      swaggerUI.serve,
      swaggerUI.setup(swaggerDocument, options)
    );
  }

  private middlewares(middleWares: {
    /*eslint-disable-next-line*/
    forEach: (arg0: (middleWare: any) => void) => void;
  }) {
    this.app.use(helmet())
    this.app.use(express.json());
    middleWares.forEach((middleWare) => {
      this.app.use(middleWare);
    });
  }

  private routes(
    controllers: {
      forEach: (arg0: (controller: BaseController) => void) => void;
    }
  ) {
    controllers.forEach((controller) => {
      this.app.use(config.get("baseUrl"), controller.router, this.catch);
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-unused-vars
  public catch(error: any, req: any, res: any, next: any): void {
    const serializedError = serializeError(error)
    if (serializedError.config?.data && serializedError.config?.data.startsWith('grant_type=authorization_code&code')) {
      delete serializedError.config.data
    }
    const msg = {
      errorMessage: `INTERNAL_SERVER_ERROR`,
      errorDetail: serializedError,
    };
    logger.error(msg);
    msg.errorDetail.stack = undefined;
    res.status(500).send(msg);
  }
  public listen(): void {
    App.server = this.app.listen(this.port, () => {
      logger.info(`App listening on the http://localhost:${this.port}`);
    });
  }

  public async close(): Promise<void> {
    await App.server.close()
    logger.info('HTTP server closed')
    process.exit()
  }
}

export default App;
