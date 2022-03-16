import mongoose from "mongoose";
import { AlertStatus } from "../controllers/utils/AlertStatus";

export interface AlertInterface {
  patternId: string;
  patternName: string;
  date: Date;
  location: string;
  regulator: string;
  // notes: mongoose.Types.ObjectId[];
  status: AlertStatus;
  preview: string;
}

export interface AlertInterfaceList {
  alerts: AlertInterface[];
}
