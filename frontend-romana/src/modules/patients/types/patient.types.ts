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

  relation: string;
}

export interface Patient {
  id: string;

  name: string;

  email: string;

  phoneNumber: string;

  address: Address;

  birthDate: string;

  allergies: string[];

  bloodType: BloodType;

  isActive: boolean;

  emergencyContact?: EmergencyContact;
}
