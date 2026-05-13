export interface Receptionist {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  languages: string[];
  isActive: boolean;
  profilePictureUrl?: string;
}