import { Schema, model } from "mongoose";
import { NotificationInterface } from "../interfaces/Notification.interface";

const notificationSchema = new Schema<NotificationInterface>({
  date: String,
  alertId: String,
  description: String,
  type: String,
  isImportant: Boolean,
});

const NotificationModel = model<NotificationInterface>(
  "notificationdatas",
  notificationSchema
);

export default NotificationModel;
