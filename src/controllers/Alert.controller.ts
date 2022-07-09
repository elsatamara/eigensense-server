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

        const regulatorMap = new Map();

        cleanedSortedAlertsList.forEach((elem) => {
          if (regulatorMap.has(elem.regulator)) {
            let timeArray = regulatorMap.get(elem.regulator);
            timeArray[0] = Math.min(timeArray[0], elem.date.getTime());
            timeArray[1] = Math.max(timeArray[1], elem.date.getTime());
          } else {
            regulatorMap.set(elem.regulator, [
              elem.date.getTime(),
              elem.date.getTime(),
            ]);
          }
        });

        const res = await Promise.all(
          Array.from(regulatorMap.keys()).map(async (regulator) => {
            const startDate = regulatorMap.get(regulator)[0];
            const endDate = regulatorMap.get(regulator)[1];
            const threeMonthsBefore = this.getLastThreeMonthDate(
              new Date(startDate)
            );
            const threeMonthsData = await this.getRangeDateData(
              threeMonthsBefore,
              new Date(endDate),
              "reg_278"
            );
            {
              return [regulator, threeMonthsData];
            }
          })
        );

        // regulatorMap.forEach(async (value, key) => {
        //   const regulatorName = key;
        //   const startDate = value[0];
        //   const endDate = new Date(value[1]);
        //   const threeMonthsBefore = this.getLastThreeMonthDate(
        //     new Date(startDate)
        //   );
        //   const threeMonthsData = await this.getRangeDateData(
        //     threeMonthsBefore,
        //     endDate,
        //     "reg_278"
        //   );
        //   console.log(threeMonthsData);
        //   regulatorMap.set(regulatorName, threeMonthsData);
        // });

        // console.log(regulatorMap);

        // const addedPreviewDataList = await this.assignPreviewData(
        //   cleanedSortedAlertsList
        // );

        console.log(res);
        return {
          data: [cleanedSortedAlertsList, res],
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
        const previewData = await this.getRangeDateData(
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

  private getLastThreeMonthDate = (newAlertDate: Date) => {
    let lastMonthDate = new Date(newAlertDate);
    lastMonthDate.setMonth(newAlertDate.getMonth() - 3);
    return lastMonthDate;
  };

  private getRangeDateData = async (from: Date, to: Date, regname: String) => {
    const data = await ChartDataModel.find({
      RegName: regname,
      DateTime: {
        $gte: from.toJSON().slice(0, 10),
        $lte: to.toJSON().slice(0, 10),
      },
    }).then((previewData) => {
      return previewData.map((elem) => [
        new Date(elem.DateTime).getTime(),
        elem.Pressure,
      ]);
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
