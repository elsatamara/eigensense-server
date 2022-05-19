import mongoose from "mongoose";
import { Schema, model } from "mongoose";
import { AgentInterface } from "../interfaces/Agent.interface";
import { AlertInterface } from "../interfaces/Alert.interface";

const agentSchema = new Schema<AgentInterface>({
  agentId: String,
  firstName: String,
  lastName: String,
  username: String,
  password: String,
  recentlyViewedAlert: [String],
  phone: String,
  email: String,
  status: String,
  lastLogin: Date,
  isNotifText: Boolean,
  isNotifEmail: Boolean,
  customFilter: String,
  userType: String,
});

const AgentModel = model<AgentInterface>("agentdatas", agentSchema);

export default AgentModel;
