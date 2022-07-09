import e, { Request, Response, NextFunction } from "express";
import {
  SimilarPatternAlgoInterface,
  SimilarPatternInterface,
} from "../interfaces/SimilarPattern.interface";
import SimilarPatternModel from "../models/SimilarPattern.model";
import BaseController from "./Base.controller";
import axios, { AxiosResponse } from "axios";

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

  public checkPythonServer = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    return this.makeRequest(
      async () => {
        const res: AxiosResponse<any> = await axios.get(
          "http://127.0.0.1:5000/"
        );
        return { data: res.data };
      },
      res,
      next
    );
  };

  public getSimilarPatternAlgoResult = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    return this.makeRequest(
      async () => {
        let decodedParams = new URLSearchParams(req.params.sequence);
        const algoCall: AxiosResponse<any> = await axios.get(
          `http://127.0.0.1:5000/similar-search/${decodedParams}`,
          { timeout: 300000 }
        );
        const res: SimilarPatternInterface[] = algoCall.data[0].map(
          (data: any) => {
            return <SimilarPatternAlgoInterface>{
              matchScore: data[0],
              dataPoints: data[1],
            };
          }
        );

        return {
          data: res,
        };
      },
      res,
      next
    );
  };
}

export default new SimilarPattern();
