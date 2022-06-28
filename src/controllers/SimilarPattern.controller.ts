import e, { Request, Response, NextFunction } from "express";
import { SimilarPatternInterface } from "../interfaces/SimilarPattern.interface";
import SimilarPatternModel from "../models/SimilarPattern.model";
import BaseController from "./Base.controller";

class SimilarPattern extends BaseController {
  public getSimilarPatternList = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    return this.makeRequest(
      async () => {
        const similarPatternList: SimilarPatternInterface[] =
          await SimilarPatternModel.find();

        return {
          data: similarPatternList,
        };
      },
      res,
      next
    );
  };
}

export default new SimilarPattern();
