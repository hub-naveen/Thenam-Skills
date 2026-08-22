export interface IProject {
  id?: string;
  user: string; // references user.firebaseUid
  title: string;
  description: string;
  technologies: string[]; // references skill document IDs (slugs)
  githubURL: string;
  liveURL: string;
  imageURL: string;
  status: string;
  createdAt?: any;
  updatedAt?: any;
}

export type Project = IProject;
