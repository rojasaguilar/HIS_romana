export interface CreateReceptionistDTO {
  name: string;
  email: string;
  password: string; // Se usará en el backend para crear la SystemAccount
  phoneNumber: string;
  languages: string[];
  profilePictureUrl?: string;
}