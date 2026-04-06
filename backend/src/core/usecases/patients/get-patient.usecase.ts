import PatientEntity from '../../domain/entities/patient.entity';
import { IPatientRepository } from '../../domain/repositories/patient.repository.interface';

export class GetPatientUseCase {
  constructor(public readonly patientRepo: IPatientRepository) {}

  async findById(id: string): Promise<PatientEntity | null> {
    return await this.patientRepo.findById(id);
  }

  async getAll(): Promise<PatientEntity[]> {
    return await this.patientRepo.getAll();
  }
}
