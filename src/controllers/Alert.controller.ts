import e, { Request, Response, NextFunction } from "express";
import {
  AlertInterface,
  AlertInterfaceList,
} from "../interfaces/Alert.interface";
import AlertModel from "../models/Alert.model";
import ChartDataModel from "../models/ChartData.model";
import BaseController from "./Base.controller";
import { AlertStatus } from "./utils/AlertStatus";

class Alert extends BaseController {
  /** Loads a list of alerts, sorted from the oldest from DB */
  public getAlertsList = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    return this.makeRequest(
      async () => {
        //Fetches a list of alerts
        const cleanedSortedAlertsList: AlertInterface[] = await AlertModel.find(
          {
            status: {
              $in: [
                AlertStatus.Pending,
                AlertStatus.InReview,
                AlertStatus.Supressed,
              ],
            },
          }
        ).sort("date");

        return {
          data: cleanedSortedAlertsList,
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

  private getOneMonthData = async (
    lastMonthDate: Date,
    currDate: Date,
    regname: String
  ) => {
    const objectArray = await ChartDataModel.find({
      RegName: regname,
      alertFlag: 1,
      DateTime: {
        $gte: lastMonthDate.toJSON().slice(0, 10),
        $lte: currDate.toJSON().slice(0, 10),
      },
    });
    let dates: Date[] = [];
    let pressures: Number[] = [];
    objectArray.forEach((elem) => {
      dates.push(elem.DateTime);
      pressures.push(elem.Pressure);
    });
    let datePressure = { dates: dates, pressures: pressures };
    return datePressure;
  };
}

export default new Alert();
