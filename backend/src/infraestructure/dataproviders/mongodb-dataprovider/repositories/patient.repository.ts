import PatientModel from '../models/patient.model';
import Patient from './../../../../core/domain/entities/patient.entity';
import { Address } from '../../../../core/domain/value-objects/address.vo';
import { EmergencyContact } from '../../../../core/domain/value-objects/emergencyContact.vo';
import { IPatientRepository } from '../../../../core/domain/repositories/patient.repository.interface';
//persist the data

export class PatientRepository implements IPatientRepository {
  async save(patient: Patient): Promise<Patient> {
    const data = { ...patient };

    const created = await PatientModel.create(data);

    const createdPatientAddress = new Address(
      created.address.street,
      created.address.number,
      created.address.city,
      created.address.state,
      created.address.zipCode,
    );

    const createdEmergencyConctact = created.emergencyContact
      ? new EmergencyContact(
          created.emergencyContact.name,
          created.emergencyContact.phoneNumber,
          created.emergencyContact.relation,
        )
      : undefined;

    return new Patient(
      created.name,
      created.email,
      created.phoneNumber,
      createdPatientAddress,
      created.birthDate,
      created.allergies,
      created.bloodType,
      created._id.toString(),
      createdEmergencyConctact,
    );
  }

  async findById(id: string): Promise<Patient> {
    const patient = await PatientModel.findById(id);

    if (!patient) {
      throw new Error(`Patient with id ${id} not found`);
    }

    const patientAddress = new Address(
      patient.address.street,
      patient.address.number,
      patient.address.city,
      patient.address.state,
      patient.address.zipCode,
    );

    const emergencyContact = patient.emergencyContact
      ? new EmergencyContact(
          patient.emergencyContact.name,
          patient.emergencyContact.phoneNumber,
          patient.emergencyContact.relation,
        )
      : undefined;

    return new Patient(
      patient.name,
      patient.email,
      patient.phoneNumber,
      patientAddress,
      patient.birthDate,
      patient.allergies,
      patient.bloodType,
      patient._id.toString(),
      emergencyContact,
    );
  }

  // Other CRUD methods (find, update, delete) can be implemented similarly
}

export default PatientRepository;
