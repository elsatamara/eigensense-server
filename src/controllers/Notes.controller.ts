import e, { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import { register } from "ts-node";
import AlertModel from "../models/Alert.model";
import NotesDataModel from "../models/Notes.model";
import BaseController from "./Base.controller";

class Notes extends BaseController {
  public getNotes = async (req: Request, res: Response, next: NextFunction) => {
    return this.makeRequest(
      async () => {
        let patternId = req.params.patternId;
        const notesList = await NotesDataModel.find({
          patternId: patternId,
        });
        // console.log(notesList);
        return {
          data: notesList,
        };
      },
      res,
      next
    );
  };

  //Todo: better way to pass in the notes text
  public postNotes = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    return this.makeRequest(
      async () => {
        const newNote = new NotesDataModel({
          notesId: req.params.notesId,
          text: req.params.text,
          agent: req.params.agent,
          date: req.params.date,
          patternId: req.params.patternId,
        });

        await newNote.save(function (err) {
          if (err) throw new Error("Save unsuccessful");
        });

        let status = this.addNoteIdOnAlert(
          newNote.notesId,
          req.params.patternId
        );

        return {
          data: status !== null && newNote.text !== null,
        };
      },
      res,
      next
    );
  };

  public deleteNote = (req: Request) => {
    const noteId = req.params.noteId;
    const patternId = req.params.patternId;
    NotesDataModel.deleteOne({ notesId: noteId }, function (err) {
      if (err) throw new Error("Deletion unsuccessful");
    });
    this.removeNoteIdOnAlert(noteId, patternId);
  };

  public updateNote = async (req: Request) => {
    const notesId = req.params.noteId;
    const text = req.params.text;
    const date = req.params.date;
    let note = await NotesDataModel.findOne(
      { notesId: notesId },
      function (error: Error) {
        if (error) {
          throw error;
        }
      }
    )
      .clone()
      .catch(function (err) {
        console.log(err);
      });
    if (note) {
      note.text = text;
      note.date = date;
      note.save(function (error) {
        if (error) throw new Error("Save unsuccessful");
      });
    }
  };

  public addNoteIdOnAlert = async (noteID: string, patternId: string) => {
    let alertToUpdate = await AlertModel.findOne({ patternId: patternId });
    if (alertToUpdate) {
      alertToUpdate.notes.push(noteID);
      await alertToUpdate.save(function (error) {
        if (error) throw new Error("Save unsuccessful");
      });
    } else {
      throw new Error("No Alert ID found to be updated");
    }
    return "Alert is updated successfully!";
  };

  public removeNoteIdOnAlert = async (noteID: string, patternId: string) => {
    let alertToUpdate = await AlertModel.findOne({ patternId: patternId });
    if (alertToUpdate) {
      alertToUpdate.notes = alertToUpdate.notes.filter(
        (notesId) => notesId !== noteID
      );
      await alertToUpdate.save(function (error) {
        if (error) throw new Error("Save unsuccessful");
      });
    } else {
      throw new Error("No Alert ID found to be updated");
    }
    return "Alert is updated successfully!";
  };
}

export default new Notes();
