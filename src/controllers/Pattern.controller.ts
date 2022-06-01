import e, { Request, Response, NextFunction } from "express";
import PatternModel from "../models/Pattern.model";
import BaseController from "./Base.controller";

class Pattern extends BaseController {
  public getPatternList = (req: Request, res: Response, next: NextFunction) => {
    return this.makeRequest(
      async () => {
        const patternList = await PatternModel.find();
        return {
          data: patternList,
        };
      },
      res,
      next
    );
  };
}

export default new Pattern();
