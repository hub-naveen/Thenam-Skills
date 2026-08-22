export interface IEnrollment {
  id?: string;
  user: string; // references user.firebaseUid
  course: string; // references course document ID
  progress: number;
  startedAt: any;
  completedAt?: any;
  status: 'enrolled' | 'in-progress' | 'completed';
  createdAt?: any;
  updatedAt?: any;
}

export type Enrollment = IEnrollment;
