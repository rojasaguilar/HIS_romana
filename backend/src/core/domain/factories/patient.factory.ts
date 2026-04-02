// // Factory for creating Patient instances
// //ensures that the creation of Patient objects is centralized and consistent across the application
// // used on useCases to create new Patient instances based on the data received from the controllers or other sources
// // then persisted using the repositories

import PatientEntity from "../entities/patient.entity";

import { Address } from "../value-objects/address.vo";
import { BloodType } from "../types/blood.type";
import { EmergencyContact } from "../value-objects/emergencyContact.vo";

export interface RegisterPatientProps {
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
  bloodType: BloodType;

  emergencyContact?: { name: string; phoneNumber: string };
}

export class PatientFactory {
  static createNewPatient(props: RegisterPatientProps) {
    const cleanName = props.name.trim();
    const cleanEmail = props.email.trim();
    const cleanPhone = props.phoneNumber.trim();

    const contact = props.emergencyContact
      ? new EmergencyContact(
          props.emergencyContact.name,
          props.emergencyContact.phoneNumber,
        )
      : undefined;

    const cAddress = new Address(
      props.address.street,
      props.address.number,
      props.address.city,
      props.address.state,
      props.address.zipCode,
    );
    //dirty work, clean the info before creation
    return new PatientEntity(
      cleanName,
      cleanEmail,
      cleanPhone,
      cAddress,
      props.birthDate,
      props.allergies,
      props.bloodType,
      undefined,
      contact,
    );
  }
}
