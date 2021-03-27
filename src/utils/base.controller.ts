import * as express from "express";
import { wrap } from "async-middleware";
import { contextRoutes } from "../middleware/context";
abstract class BaseController {
  public router = express.Router();

  constructor() {
    this.initRoutes(this.router);
    this.router.stack.forEach((x) => contextRoutes.push(x));
  }

  abstract initRoutes(router: express.Router): void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
  public handler(func: any): any {
    return wrap(func);
  }
}

export default BaseController;
