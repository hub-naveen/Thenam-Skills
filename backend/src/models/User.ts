export interface IUser {
  id?: string;
  firebaseUid: string;
  email: string;
  name: string;
  photoURL: string;
  department: string;
  year: string;
  collegeName: string;
  dateOfBirth?: Date | string;
  phoneNumber: string;
  skills: string[];
  collegeLocation: {
    city: string;
    state: string;
    country: string;
  };
  linkedinURL: string | null;
  githubURL: string | null;
  role: 'student' | 'faculty' | 'admin' | 'recruiter';
  profileCompleted: boolean;
  xp: number;
  streak: number;
  coursesCompleted: number;
  certificatesCount: number;
  projectsCount: number;
  createdAt?: any;
  updatedAt?: any;
}

export type User = IUser;
