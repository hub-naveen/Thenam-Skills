export interface INotification {
  id?: string;
  user: string; // references user.firebaseUid
  title: string;
  message: string;
  type: string;
  read: boolean;
  createdAt?: any;
  updatedAt?: any;
}

export type Notification = INotification;
