import { Console } from "console";
import e, { Request, Response, NextFunction } from "express";
import {
  NotificationInterface,
  NotificationType,
} from "../interfaces/Notification.interface";
import NotificationModel from "../models/Notification.model";
import BaseController from "./Base.controller";
import { AlertStatus } from "./utils/AlertStatus";

class Notification extends BaseController {
  public getNotificationList = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    return this.makeRequest(
      async () => {
        const notificationList: NotificationInterface[] =
          await NotificationModel.find({}).sort("date");
        console.log(notificationList);
        return {
          data: notificationList,
        };
      },

      res,
      next
    );
  };

  public markAsImportant = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const alertId = req.params.alertId;
    const notificationToUpdate = await NotificationModel.findOne({
      alertId: alertId,
    });
    if (notificationToUpdate) {
      notificationToUpdate!.type = NotificationType.Important;
      notificationToUpdate!.save();
    }
  };

  public markAsUnimportant = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const alertId = req.params.alertId;
    const notificationToUpdate = await NotificationModel.findOne({
      alertId: alertId,
    });
    if (notificationToUpdate) {
      notificationToUpdate!.type = NotificationType.Read;
      notificationToUpdate!.save();
    }
  };

  public markRead = async (req: Request, res: Response, next: NextFunction) => {
    const alertIds: string[] = req.params.alertId.split(",");
    const notificationToMarkRead = await NotificationModel.find({
      alertId: { $in: alertIds },
    });
    if (notificationToMarkRead) {
      notificationToMarkRead.forEach((notif) => {
        notif.type = NotificationType.Read;
        notif.save();
      });
    }
  };

  public markUnread = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const alertIds: string[] = req.params.alertId.split(",");
    const notificationToMarkRead = await NotificationModel.find({
      alertId: { $in: alertIds },
    });
    if (notificationToMarkRead) {
      notificationToMarkRead.forEach((notif) => {
        notif.type = NotificationType.Unread;
        notif.save();
      });
    }
  };
}

export default new Notification();
