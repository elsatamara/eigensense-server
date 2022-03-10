import mongoose from "mongoose";
import { Schema, model } from "mongoose";
import { NotesInterface } from "../interfaces/Note.interface";

const noteDataSchema = new Schema<NotesInterface>({
  objectID: mongoose.Types.ObjectId,
  alertID: mongoose.Types.ObjectId,
  notesData: String,
  sessionID: mongoose.Types.ObjectId,
  agentID: mongoose.Types.ObjectId,
  createdAt: Date,
});

const NotesDataModel = model<NotesInterface>("NotesData", noteDataSchema);

export default NotesDataModel;
