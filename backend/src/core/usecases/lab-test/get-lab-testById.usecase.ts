import { LabTestEntity } from '../../domain/entities/lab-test.entity';
import { ILabTestRepository } from '../../domain/repositories/lab-test.respository.interface';

export class GetLabTestByIdUseCase {
  constructor(private readonly labTestRepository: ILabTestRepository) {}

  public async execute(labTestId: string): Promise<LabTestEntity> {
    const labTest = await this.labTestRepository.findById(labTestId);
    
    if (!labTest) {
      throw new Error('Estudio de laboratorio no encontrado.');
    }

    return labTest;
  }
}