import mongoose from "mongoose";
import { Schema, model } from "mongoose";
import { NotesInterface } from "../interfaces/Note.interface";

const noteDataSchema = new Schema<NotesInterface>({
  notesId: String,
  agentId: String,
  date: String,
  text: String,
  patternId: String,
});

const NotesDataModel = model<NotesInterface>("notesdatas", noteDataSchema);

export default NotesDataModel;
