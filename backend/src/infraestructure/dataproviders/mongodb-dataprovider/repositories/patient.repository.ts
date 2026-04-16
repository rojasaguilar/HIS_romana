import PatientModel from '../models/patient.model';
import Patient from './../../../../core/domain/entities/patient.entity';
import { IPatientRepository } from '../../../../core/domain/repositories/patient.repository.interface';
import { PatientMapper } from '../mappers/patient.mapper';
//persist the data

export class PatientRepository implements IPatientRepository {
  async save(patient: Patient): Promise<Patient> {
    const data = PatientMapper.toPersistance(patient);

    const savedPatient = await PatientModel.create(data);

    return PatientMapper.toDomain(savedPatient);
  }

  async findById(id: string): Promise<Patient | null> {
    const patient = await PatientModel.findById(id);

    if (!patient) {
      return null;
    }

    return PatientMapper.toDomain(patient);
  }

  async getAll(): Promise<Patient[]> {
    const patients = await PatientModel.find();

    if (patients.length === 0) return [];

    return patients.map((patient) => PatientMapper.toDomain(patient));
  }

  // Other CRUD methods (find, update, delete) can be implemented similarly
}

export default PatientRepository;
