import BaseController from "./Base.controller";
import e, { Request, Response, NextFunction } from "express";
import ChartDataModel from "../models/ChartData.model";
import { ChartData } from "../interfaces/ChartData.interface";

class Chart extends BaseController {
  public getChartDemo = (req: Request, res: Response, next: NextFunction) => {
    return this.makeRequest(
      async () => {
        const chartData: ChartData[] = await ChartDataModel.find(
          {
            RegName: "reg_278",
          },
          "DateTime Pressure"
        ).limit(1000);

        let cleanedChartData: (number[] | undefined)[] = chartData
          .map((elem) => {
            if (elem.Pressure) {
              return [new Date(elem.DateTime).getTime(), elem.Pressure];
            }
          })
          .filter((elem) => elem !== undefined)
          .sort();

        return {
          data: cleanedChartData,
        };
      },
      res,
      next
    );
  };
  public getAnotherChartDemo = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    return this.makeRequest(
      async () => {
        const chartData: ChartData[] = await ChartDataModel.find(
          {
            RegName: "reg_279",
          },
          "DateTime Pressure"
        );

        let cleanedChartData: (number[] | undefined)[] = chartData
          .map((elem) => {
            if (elem.Pressure) {
              return [new Date(elem.DateTime).getTime(), elem.Pressure];
            }
          })
          .filter((elem) => elem !== undefined)
          .sort();

        return {
          data: cleanedChartData,
        };
      },
      res,
      next
    );
  };
}

export default new Chart();
