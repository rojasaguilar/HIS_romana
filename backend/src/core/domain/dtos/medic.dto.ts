import { MedicType } from "../types/medic.type";

export interface RegisterMedicDTO {
  name: string;

  email: string;

  phoneNumber: string;

  healthLicenseNumber: string;

  professionalLicenceNumber: string;

  languages: string[];

  specialityIds: string[];

  medicalSchool: string;

  startPracticeDate: Date;

  bio: string;

  consultationFee: number;

  profilePictureUrl: string;

  isActive: boolean;

  type: MedicType;

  password?: string;

//   organizationId?: string;

  id?: string;
}
