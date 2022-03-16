import e, { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import AlertModel from "../models/Alert.model";
import NotesDataModel from "../models/Notes.model";
import BaseController from "./Base.controller";

class Notes extends BaseController {
  //Todo: better way to pass in the notes text
  public postNotes = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    return this.makeRequest(
      async () => {
        const objectID = new mongoose.Types.ObjectId();

        const newNote = new NotesDataModel({
          alertID: req.params.alertID,
          notesData: req.params.notesData,
          sessionID: req.params.sessionID,
          agentID: req.params.agentID,
          timestamp: Date.now(),
          objectID: objectID,
        });

        await newNote.save();
        //what to do if note fails to save

        let status = this.updateNoteIDOnAlert(objectID, req.params.alertID);

        return {
          data: status !== null && newNote.notesData !== null,
        };
      },
      res,
      next
    );
  };

  public updateNoteIDOnAlert = async (
    noteID: mongoose.Types.ObjectId,
    alertID: string
  ) => {
    let alertToUpdate = await AlertModel.findOne({ alertID: alertID });
    if (alertToUpdate) {
      // alertToUpdate.notes.push(noteID);
      await alertToUpdate.save();
    } else {
      throw new Error("No Alert ID found to be updated");
    }
    return "Alert is updated successfully!";
  };
}

export default new Notes();
