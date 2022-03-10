import express, { Request, Response } from "express";
import connectDB from "./config/db";
import AlertController from "./controllers/Alert.controller";
import cors from "cors";
import NotesController from "./controllers/Notes.controller";

connectDB();

const app = express();
const router = express.Router();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Eigen Mock App Server");
});

router.get(
  "/api/v1/post_notes/:sessionID/:agentID/:notesData",
  NotesController.postNotes
);

router.get("/api/v1/dashboard/:pageNumber", AlertController.getAlertsList);

router.get("/api/v1/get_alerts_list", AlertController.getAlertsList);

app.use(router);

export default app;
