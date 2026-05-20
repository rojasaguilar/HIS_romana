import type { EstadoCivil } from "../types/martialStatus.type";
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

  sex: "M" | "F";
  maritalStatus: EstadoCivil;

  emergencyContact?: {
    name: string;
    phoneNumber: string;
    relationship: string;
  };
}
