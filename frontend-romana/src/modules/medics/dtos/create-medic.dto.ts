import type { MedicType } from "../types/medic.types";

export interface CreateMedicDTO {
  name: string;

  email: string;

  phoneNumber: string;

  healthLicenseNumber: string;

  professionalLicenceNumber: string;

  languages: string[];

  specialityIds: string[];

  medicalSchool: string;

  startPracticeDate: string;

  bio: string;

  consultationFee: number;

  profilePictureUrl: string;

  type: MedicType;

  password?: string;

  organizationId?: string;
}
