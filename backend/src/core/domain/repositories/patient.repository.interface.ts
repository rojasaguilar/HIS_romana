import { PatientEntity } from '../entities/patient.entity';

export interface IPatientRepository {
  save(patient: PatientEntity): Promise<PatientEntity>;

  findById(id: string): Promise<PatientEntity | null>;

  findByIds(ids: string[]): Promise<PatientEntity[]>;

  getAll(): Promise<PatientEntity[]>;
}
