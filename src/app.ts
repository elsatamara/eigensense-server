import express, { Request, Response } from "express";
import connectDB from "./config/db";
import AlertController from "./controllers/Alert.controller";
import cors from "cors";
import NotesController from "./controllers/Notes.controller";
import AgentController from "./controllers/Agent.controller";
import ChartController from "./controllers/Chart.controller";
import NotificationController from "./controllers/Notification.controller";
import CustomFilterController from "./controllers/CustomFilter.controller";
import PatternController from "./controllers/Pattern.controller";
import SimilarPatternController from "./controllers/SimilarPattern.controller";

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

router.get(`/api/v1/getchartdemo`, ChartController.getChartDemo);

app.use(
  router.get(`/api/v1/getanotherchartdemo`, ChartController.getAnotherChartDemo)
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

router.get(
  `/api/v1/change_status/:change_status_object`,
  AlertController.changeAlertStatus
);

router.get(
  `/api/v1/get_notification_list`,
  NotificationController.getNotificationList
);

router.get(
  `/api/v1/mark_important/:alertId`,
  NotificationController.markAsImportant
);

router.get(
  `/api/v1/mark_unimportant/:alertId`,
  NotificationController.markAsUnimportant
);

router.get(`/api/v1/mark_read/:alertId`, NotificationController.markRead);

router.get(`/api/v1/mark_unread/:alertId`, NotificationController.markUnread);

router.get(`/api/v1/get_agent_list`, AgentController.getAgentList);

router.get(
  `/api/v1/get_custom_filter_list`,
  CustomFilterController.getCustomFilterList
);

router.get(
  `/api/v1/delete_custom_filter/:filterid`,
  CustomFilterController.deleteFilter
);

router.get(
  `/api/v1/post_new_filter/:urlquery`,
  CustomFilterController.postNewFilter
);

router.get(`/api/v1/edit_filter/:urlquery`, CustomFilterController.editFilter);

app.use(
  router.get(
    `/api/v1/delete_notification/:notificationid`,
    NotificationController.deleteNotification
  )
);

app.use(
  router.get(`/api/v1/get_pattern_list`, PatternController.getPatternList)
);

app.use(
  router.get(
    `/api/v1/get_similar_pattern_list`,
    SimilarPatternController.getSimilarPatternList
  )
);

app.use(
  router.get(
    `/api/v1/get_compare_chart/:patternName`,
    ChartController.getCompareAlertChart
  )
);

export default app;
