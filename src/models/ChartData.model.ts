import { Schema, model } from "mongoose";
import { ChartData } from "../interfaces/ChartData.interface";

const chartDataSchema = new Schema<ChartData>({
  DateTime: String,
  Pressure: Number,
  RegName: String,
  temperature: Number,
  logpressure: String,
  dayofweek: Number,
  julian: Number,
  hour: Number,
  julianhour: Number,
  prediction: Number,
  predictionlow: Number,
  predicitonhigh: Number,
  purpleflags: Number,
  purplerun: Number,
  collapsedpurpleflags: Number,
  yellowflags: Number,
  redflags: Number,
  alertflags: Number,
  mostrecentupdate: Number,
  stderror: Number,
  dlerorr: Number,
});

const ChartDataModel = model<ChartData>("outputalgos", chartDataSchema);

export default ChartDataModel;
