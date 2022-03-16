import mongoose from "mongoose";
import { Schema, model } from "mongoose";
import { AlertStatus } from "../controllers/utils/AlertStatus";
import { AlertInterface } from "../interfaces/Alert.interface";

const alertSchema = new Schema<AlertInterface>({
  patternName: String,
  patternId: String,
  date: Date,
  location: String,
  regulator: String,
  // notes: [mongoose.Types.ObjectId],
  status: String,
  preview: String,
});

const AlertModel = model<AlertInterface>("alertdemos", alertSchema);

export default AlertModel;
