export type MedicType = "INTERNAL" | "EXTERNAL";

export interface Medic {
  id: string;

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

  isActive: boolean;

  type: MedicType;

  organizationId?: string;
}
