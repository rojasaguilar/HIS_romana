import type { EstadoCivil } from "./martialStatus.type";

export type BloodType = "O+" | "O-" | "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-";

export interface Address {
  street: string;

  city: string;

  state: string;

  zipCode: string;
}

export interface EmergencyContact {
  name: string;

  phoneNumber: string;

  relationship: string;
}

export interface Patient {
  id: string;

  name: string;

  email: string;

  phoneNumber: string;

  address: Address;

  birthDate: string;

  allergies: string[];

   sex: "M" | "F";
    maritalStatus: EstadoCivil;

  bloodType: BloodType;

  isActive: boolean;

  emergencyContact?: EmergencyContact;
}
