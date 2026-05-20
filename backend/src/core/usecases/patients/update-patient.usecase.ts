import { RegisterPatientDTO } from '../../domain/dtos/patient.dto';
import PatientEntity from '../../domain/entities/patient.entity';
import { IPatientRepository } from './../../domain/repositories/patient.repository.interface';

export class UpdatePatientUseCase {
  constructor(private patientRepo: IPatientRepository) {}

  async execute(id: string, data: RegisterPatientDTO): Promise<PatientEntity> {
    const updatedPatient = await this.patientRepo.update(id, data);

    if (!updatedPatient) throw new Error('Patient not found');

    return updatedPatient;
  }
}
