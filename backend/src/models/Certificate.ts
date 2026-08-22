export interface ICertificate {
  id?: string;
  user: string; // references user.firebaseUid
  course: string; // references course document ID
  certificateNumber: string;
  title: string;
  issuedAt: any;
  verificationCode: string;
  certificateURL: string;
  createdAt?: any;
  updatedAt?: any;
}

export type Certificate = ICertificate;
