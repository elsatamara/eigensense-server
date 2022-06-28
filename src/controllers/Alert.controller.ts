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

        const addedPreviewDataList = await this.assignPreviewData(
          cleanedSortedAlertsList
        );

        console.log(addedPreviewDataList);

        return {
          data: addedPreviewDataList,
        };
      },
      res,
      next
    );
  };

  private assignPreviewData = async (alertList: AlertInterface[]) => {
    const addedPreview = await Promise.all(
      alertList.map(async (alert) => {
        const lastMonthDate = this.getLastMonthDate(alert.date);
        const previewData = await this.getOneMonthData(
          lastMonthDate,
          alert.date,
          "reg_278"
        );
        alert.previewData = previewData;
        return alert;
      })
    );
    return addedPreview;
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
    let lastMonthDate = new Date(newAlertDate);
    lastMonthDate.setMonth(newAlertDate.getMonth() - 1);
    return lastMonthDate;
  };

  private getOneMonthData = async (
    lastMonthDate: Date,
    currDate: Date,
    regname: String
  ) => {
    const data = await ChartDataModel.find({
      RegName: regname,
      DateTime: {
        $gte: lastMonthDate.toJSON().slice(0, 10),
        $lte: currDate.toJSON().slice(0, 10),
      },
    }).then((previewData) => {
      return previewData.map((elem) => elem.Pressure);
    });
    return data;
  };

  // public changeAgent = async (req: Request) => {
  //   // let agentId = req.params.agentid;
  //   console.log("here");
  //   const files = await AlertModel.find();
  //   let i = 0;
  //   if (files) {
  //     files.forEach((elem) => {
  //       i += 1;
  //       console.log(i);
  //       if (i % 2 === 0) {
  //         console.log("here");
  //         elem.regulator = "CAR62355";
  //         elem.save();
  //       }
  //     });
  //   }
  // };
}

export default new Alert();
