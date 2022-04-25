import { AlertInterface } from "./Alert.interface";

export interface AgentInterface {
  agentId: string;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  recentlyViewedAlert: string[];
  phone: string;
  email: string;
  status: string;
  lastLogin: Date;
  notifPref: string;
  customFilter: string;
}
