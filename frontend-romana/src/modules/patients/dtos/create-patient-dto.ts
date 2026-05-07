import type { BloodType } from "../types/patient.types";

export interface CreatePatientDTO {
  name: string;

  email: string;

  phoneNumber: string;

  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };

  birthDate: string;

  allergies: string[];

  bloodType: BloodType;

  emergencyContact?: {
    name: string;
    phoneNumber: string;
    relationship: string;
  };
}