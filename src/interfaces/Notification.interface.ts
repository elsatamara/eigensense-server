export enum NotificationType {
  All = "All",
  Read = "Read",
  Unread = "Unread",
  Important = "Important",
}

export interface NotificationInterface {
  date: string;
  alertId: string;
  description: string;
  type: NotificationType;
  isImportant: boolean;
}
