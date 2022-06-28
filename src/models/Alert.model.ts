import mongoose from "mongoose";
import { Schema, model } from "mongoose";
import { AlertStatus } from "../controllers/utils/AlertStatus";
import { AlertInterface } from "../interfaces/Alert.interface";

const alertSchema = new Schema<AlertInterface>({
  alertType: String,
  keyAttribute: String,
  alertQueue: String,
  agentName: String,
  patternId: String,
  patternName: String,
  date: Date,
  location: String,
  regulator: String,
  status: String,
  preview: String,
  dateLastOpened: Date,
  notes: [String],
  previewData: [Number],
});

const AlertModel = model<AlertInterface>("alertdemos", alertSchema);

export default AlertModel;
