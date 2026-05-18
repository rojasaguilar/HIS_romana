import { LabTestEntity } from '../../domain/entities/lab-test.entity';
import { ILabTestRepository } from '../../domain/repositories/lab-test.respository.interface';

export class GetPatientLabTestsUseCase {
  constructor(private readonly labTestRepository: ILabTestRepository) {}

  public async execute(patientId: string): Promise<LabTestEntity[]> {
    if (!patientId) throw new Error('El ID del paciente es requerido.');
    
    return await this.labTestRepository.findByPatientId(patientId);
  }
}