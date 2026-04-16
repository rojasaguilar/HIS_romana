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

  //medical stuff
  bloodType: string;

  emergencyContact?: { name: string; phoneNumber: string; relation: string };
}

export interface PatientDocument {
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

  //medical stuff
  bloodType: string;

  isActive: boolean;

  emergencyContact?: { name: string; phoneNumber: string; relation: string };
  _id: Object;
}
