export interface IAchievement {
  id?: string;
  user: string; // references user.firebaseUid
  title: string;
  description: string;
  type: string;
  icon: string;
  xp: number;
  earnedAt?: any;
}

export type Achievement = IAchievement;
