import { LabTestEntity } from '../../domain/entities/lab-test.entity';
import { ILabTestRepository } from '../../domain/repositories/lab-test.respository.interface';

export class GetEncounterLabTestsUseCase {
  constructor(private readonly labTestRepository: ILabTestRepository) {}

  public async execute(encounterId: string): Promise<LabTestEntity[]> {
    const labTest = await this.labTestRepository.findByEncounterId(encounterId);

    if (!labTest) {
      throw new Error('Estudios de laboratorio no encontrado.');
    }

    return labTest;
  }
}
