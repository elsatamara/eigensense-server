import e, { Request, Response, NextFunction } from "express";
import { URLSearchParams } from "url";
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

        console.log(cleanedSortedAlertsList);
        return {
          data: cleanedSortedAlertsList,
        };
      },
      res,
      next
    );
  };

  public changeAlertStatus = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    let decodedParams = new URLSearchParams(req.params.change_status_object);
    const changeStatusAction = decodedParams.get("changeAction") as AlertStatus;
    const alertsToChange: string[] = decodedParams!
      .get("alertToChange")!
      .split(",");
    const alertsToChangeFromDb = await AlertModel.find({
      patternId: {
        $in: alertsToChange,
      },
    });

    console.log("Change status action", changeStatusAction);
    console.log("alerts to change params", alertsToChange);
    console.log("alerts from db", alertsToChangeFromDb);

    alertsToChangeFromDb.forEach((alert) => {
      alert.status = changeStatusAction;
      alert.save();
    });
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
    console.log(objectArray);
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
