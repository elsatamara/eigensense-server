import mongoose from "mongoose";
import { AlertStatus } from "../controllers/utils/AlertStatus";

export interface AlertInterface {
  alert: Promise<number[]>;
  alertType: string;
  keyAttribute: string;
  alertQueue: string;
  agentName: string;
  patternId: string;
  patternName: string;
  date: Date;
  location: string;
  regulator: string;
  status: AlertStatus;
  preview: string;
  dateLastOpened: Date;
  notes: string[];
  previewData: (number | Date)[][];
}

export interface AlertInterfaceList {
  alerts: AlertInterface[];
}
