import express, { Request, Response } from "express";
import connectDB from "./config/db";
import AlertController from "./controllers/Alert.controller";
import cors from "cors";
import NotesController from "./controllers/Notes.controller";
import AgentController from "./controllers/Agent.controller";
import ChartController from "./controllers/Chart.controller";

connectDB();

const app = express();
const router = express.Router();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Eigen Mock App Server");
});

router.get(
  `/api/v1/postNotes/:patternId/:notesId/:date/:agent/:text`,
  NotesController.postNotes
);

router.get(`/api/v1/deleteNote/:noteId/:patternId`, NotesController.deleteNote);

router.get("/api/v1/get_alerts_list", AlertController.getAlertsList);
router.get("/api/v1/getNotes/:patternId", NotesController.getNotes);
router.get(
  `/api/v1/storeLogout/:patternId/:agentId`,
  AgentController.storeRecentlyViewedData
);

router.get(
  `/api/v1/updateNote/:noteId/:text/:date`,
  NotesController.updateNote
);

router.get(`/api/v1/getchartdemo`, ChartController.getChartDemo);
router.get(`/api/v1/getanotherchartdemo`, ChartController.getAnotherChartDemo);

app.use(router);

export default app;
