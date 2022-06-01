import { Schema, model } from "mongoose";
import { PatternInterface } from "../interfaces/Pattern.interface";

const patternSchema = new Schema<PatternInterface>({
  patternId: String,
  patternName: String,
  preview: String,
  date: Date,
  location: String,
  regulator: String,
});

const PatternModel = model<PatternInterface>("patterndatas", patternSchema);

export default PatternModel;
