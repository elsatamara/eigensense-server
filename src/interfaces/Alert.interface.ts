import mongoose from "mongoose";
import { AlertStatus } from "../controllers/utils/AlertStatus";

export interface AlertInterface {
  patternId: number;
  patternName: string;
  chartDates: Date[];
  chartPressures: Number[];
  date: Date;
  location: string;
  regulator: string;
  notes: mongoose.Types.ObjectId[];
  status: AlertStatus;
}

export interface AlertInterfaceList {
  alerts: AlertInterface[];
}
