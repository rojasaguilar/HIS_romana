import { PatientEntity } from "../entities/patient.entity.ts";

export interface IPatientRepository {
  save(patient: PatientEntity): Promise<PatientEntity>;

  findById(id: string): Promise<PatientEntity | null>;
}
