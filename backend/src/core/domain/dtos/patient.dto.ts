import { EstadoCivil } from '../types/martialStatus.type';

export interface RegisterPatientDTO {
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

  sex: 'M' | 'F';
  maritalStatus: EstadoCivil;
  nationality: string;

  //medical stuff
  bloodType: string;

  emergencyContact?: {
    name: string;
    phoneNumber: string;
    relationship: string;
  };
  ethnicity?: string;
  legalGuardian?: { name: string; relationship: string };
}

export interface PatientPersistence {
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
  sex: 'M' | 'F';
  maritalStatus: EstadoCivil;
  nationality: string;

  //medical stuff
  bloodType: string;

  emergencyContact?: {
    name: string;
    phoneNumber: string;
    relationship: string;
  };
  ethnicity?: string;
  legalGuardian?: { name: string; relationship: string };
  _id: Object;
}
