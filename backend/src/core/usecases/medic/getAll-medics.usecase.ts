import { MedicEntity } from '../../domain/entities/medic.entity';
import { IMedicRepository } from '../../domain/repositories/medic.repository.interface';

export class GetAllMedicsUseCase {
  constructor(private readonly medicRepo: IMedicRepository) {}

  async execute(): Promise<MedicEntity[]> {
    return await this.medicRepo.getAll();
  }
}
