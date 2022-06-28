import { AlertInterface } from "./Alert.interface";

export enum AgentStatus {
  Active = "active",
  Inactive = "inactive",
  Closed = "closed",
}

export interface AgentInterface {
  agentId: string;
  userType: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  status: AgentStatus;
  lastLogin: Date;
  password: string;
  isNotifText: boolean;
  isNotifEmail: boolean;
  recentlyViewedAlert: string[];
  username: string;
  customFilter: string;
  token: string;
}
