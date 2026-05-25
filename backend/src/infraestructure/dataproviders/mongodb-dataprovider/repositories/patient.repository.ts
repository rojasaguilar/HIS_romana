import { PatientEntity } from './../../../../core/domain/entities/patient.entity';
import { IPatientRepository } from '../../../../core/domain/repositories/patient.repository.interface';
import { PatientMapper } from '../mappers/patient.mapper';
import { RegisterPatientDTO } from '../../../../core/domain/dtos/patient.dto';
import { PatientModel } from '../models/patient.model';
//persist the data

export class PatientRepository implements IPatientRepository {
  async update(
    id: string,
    data: RegisterPatientDTO,
  ): Promise<PatientEntity | null> {
    const updatedPatient = await PatientModel.findByIdAndUpdate(id, data, {
      returnDocument: 'after',
    });

    if (!updatedPatient) return null;

    return PatientMapper.toDomain(updatedPatient);
  }
  async findByIds(ids: string[]): Promise<PatientEntity[]> {
    const patients = await PatientModel.find({
      _id: { $in: ids },
    });

    return patients.map((patient) => PatientMapper.toDomain(patient));
  }
  async save(patient: PatientEntity): Promise<PatientEntity> {
    
    const data = PatientMapper.toPersistance(patient);

    const savedPatient = await PatientModel.create(data);

    return PatientMapper.toDomain(savedPatient);
  }

  async findById(id: string): Promise<PatientEntity | null> {
    const patient = await PatientModel.findById(id);

    if (!patient) {
      return null;
    }

    return PatientMapper.toDomain(patient);
  }

  async getAll(): Promise<PatientEntity[]> {
    const patients = await PatientModel.find();

    if (patients.length === 0) return [];

    return patients.map((patient) => PatientMapper.toDomain(patient));
  }

  // Other CRUD methods (find, update, delete) can be implemented similarly
}

export default PatientRepository;
