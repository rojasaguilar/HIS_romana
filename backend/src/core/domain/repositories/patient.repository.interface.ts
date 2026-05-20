import { RegisterPatientDTO } from '../dtos/patient.dto';
import { PatientEntity } from '../entities/patient.entity';

export interface IPatientRepository {
  save(patient: PatientEntity): Promise<PatientEntity>;

  findById(id: string): Promise<PatientEntity | null>;

  update(id: string, data: RegisterPatientDTO): Promise<PatientEntity | null>;

  findByIds(ids: string[]): Promise<PatientEntity[]>;

  getAll(): Promise<PatientEntity[]>;
}
