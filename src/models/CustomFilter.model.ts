import { Schema, model } from "mongoose";
import { CustomFilterInterface } from "../interfaces/CustomFilter.interface";

const customFilterSchema = new Schema<CustomFilterInterface>({
  name: String,
  location: [String],
  agent: [String],
  queue: [String],
  status: [String],
  type: [String],
  from: Date,
  to: Date,
});

const CustomFilterModel = model<CustomFilterInterface>(
  "customfilterdatas",
  customFilterSchema
);

export default CustomFilterModel;
