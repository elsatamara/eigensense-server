import { Schema, model } from "mongoose";
import { SimilarPatternInterface } from "../interfaces/SimilarPattern.interface";

const similarPatternSchema = new Schema<SimilarPatternInterface>({
  patternId: String,
  patternName: String,
  preview: String,
  matchScore: Number,
  date: Date,
  startTime: Date,
  location: String,
  regulator: String,
  agent: String,
  alertType: String,
  keyAttribute: String,
});

const SimilarPatternModel = model<SimilarPatternInterface>(
  "similarpatterndatas",
  similarPatternSchema
);

export default SimilarPatternModel;
