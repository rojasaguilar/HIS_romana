export interface CreateReceptionistDTO {
  name: string;
  email: string;
  phoneNumber: string;
  languages: string[];
  profilePictureUrl: string;
  isActive: boolean;
  password: string;
}
