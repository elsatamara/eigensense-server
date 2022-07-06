import BaseController from "./Base.controller";
import e, { Request, Response, NextFunction } from "express";
import ChartDataModel from "../models/ChartData.model";
import { ChartData } from "../interfaces/ChartData.interface";
import { readFileSync } from "fs";
import * as path from "path";
import Papa from "papaparse";

class Chart extends BaseController {
  public getChartDemo = (req: Request, res: Response, next: NextFunction) => {
    return this.makeRequest(
      async () => {
        const chartData: ChartData[] = await ChartDataModel.find(
          {
            RegName: "reg_278",
          },
          "DateTime Pressure"
        ).limit(100000);

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

  public getChartDemoCSV = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    return this.makeRequest(
      async () => {
        const file = readFileSync(
          path.join(__dirname, "ECG_data_10mins.csv"),
          "utf8"
        );

        const parsedData: any[] = Papa.parse(file).data;

        const ret = parsedData.map((elem) => {
          let counter = 0;
          counter += 1;
          if (counter % 210 === 0) {
            return [new Date(elem[0]).getTime(), parseFloat(elem[1]), true];
          } else {
            return [new Date(elem[0]).getTime(), parseFloat(elem[1]), false];
          }
        });

        return {
          data: ret,
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
            RegName: "reg_278",
          },
          "DateTime Pressure"
        ).limit(500);

        let cleanedChartData: (number[] | undefined)[] = chartData
          .map((elem) => {
            if (elem.Pressure) {
              return [new Date(elem.DateTime).getTime(), elem.Pressure];
            }
          })
          .filter((elem) => elem !== undefined)
          .sort();

        console.log("cleaned chart data", cleanedChartData);
        return {
          data: cleanedChartData,
        };
      },
      res,
      next
    );
  };

  private getLastMonthDate = (newAlertDate: Date) => {
    let lastMonthDate = newAlertDate;
    lastMonthDate.setMonth(newAlertDate.getMonth() - 1);
    console.log("LAST MONTH", lastMonthDate);
    return lastMonthDate;
  };

  //The DateTime datafield on MongoDB needs to be switched for Date type
  public getCompareAlertChartLater = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    let date = req.params.date;
    let lastMonthDate = this.getLastMonthDate(new Date(date));
    const chartData: ChartData[] = await ChartDataModel.find({
      RegName: "reg_278",
      DateTime: {
        $gte: lastMonthDate.toJSON().slice(0, 10),
        $lte: new Date(date).toJSON().slice(0, 10),
      },
    });
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
  };

  public getCompareAlertChart = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    return this.makeRequest(
      async () => {
        const alertName = req.params.patternName;
        console.log(alertName);
        let numberToTake;
        if (alertName === "Eigen120") {
          numberToTake = 10;
        } else if (alertName === "Eigen121") {
          numberToTake = 20;
        } else {
          numberToTake = 30;
        }
        const chartData: ChartData[] = await ChartDataModel.find(
          {
            RegName: "reg_278",
          },
          "DateTime Pressure"
        ).limit(numberToTake);

        let cleanedChartData: (number[] | undefined)[] = chartData
          .map((elem) => {
            if (elem.Pressure) {
              return [new Date(elem.DateTime).getTime(), elem.Pressure];
            }
          })
          .filter((elem) => elem !== undefined)
          .sort();
        console.log(cleanedChartData);
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
