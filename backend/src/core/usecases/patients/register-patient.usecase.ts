import PatientEntity from "../../domain/entities/patient.entity";
import { IPatientRepository } from "./../../domain/repositories/patient.repository.interface";
import { PatientFactory } from "../../domain/factories/patient.factory";

import { RegisterPatientProps } from "../../domain/factories/patient.factory";

export class RegisterPatientUseCase {
  constructor(private patientRepo: IPatientRepository) {}

  async execute(data: RegisterPatientProps): Promise<PatientEntity> {
    const newPatient = PatientFactory.createNewPatient(data);

    const savedPatient = await this.patientRepo.save(newPatient);

    return savedPatient;
  }
}
