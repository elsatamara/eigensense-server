import mongoose from "mongoose";

export interface NotesInterface {
  // objectID: mongoose.Types.ObjectId;
  // alertID: mongoose.Types.ObjectId;
  // notesData: string;
  // sessionID: mongoose.Types.ObjectId;
  // agentID: mongoose.Types.ObjectId;
  // createdAt: Date;
  notesId: string;
  agentId: string;
  date: string;
  text: string;
  patternId: string;
}

export interface NotesListInterface {
  notes: NotesInterface[];
}
