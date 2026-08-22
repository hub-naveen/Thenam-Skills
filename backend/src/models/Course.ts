export interface ICourse {
  id?: string;
  title: string;
  description: string;
  category: string;
  skills: string[]; // references skill document IDs (slugs)
  level: string;
  duration: string;
  thumbnail: string;
  instructor: string;
  isPublished: boolean;
  createdAt?: any;
  updatedAt?: any;
}

export type Course = ICourse;
