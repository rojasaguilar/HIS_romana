import type { EstadoCivil } from "../types/martialStatus.type";
import type { BloodType } from "../types/patient.types";

export interface CreatePatientDTO {
  name: string;

  email: string;

  phoneNumber: string;

  address: {
    street: string;
    number: string;
    city: string;
    state: string;
    zipCode: string;
  };

  birthDate: string;

  allergies: string[];

  sex: "M" | "F";

  maritalStatus: EstadoCivil;

  nationality: string;

  // medical stuff
  bloodType: BloodType;

  emergencyContact?: {
    name: string;
    phoneNumber: string;
    relationship: string;
  };

  ethnicity?: string;

  legalGuardian?: {
    name: string;
    relationship: string;
  };
}
