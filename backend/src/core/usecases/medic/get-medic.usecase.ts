import { MedicEntity } from '../../domain/entities/medic.entity';
import { MedicNotFoundError } from '../../domain/errors/medic.error';
import { IMedicRepository } from '../../domain/repositories/medic.repository.interface';

export class GetMedicUseCase {
  constructor(private medicRepository: IMedicRepository) {}

  async findById(id: string): Promise<MedicEntity> {
    const medic = await this.medicRepository.findById(id);

    if (!medic) throw new MedicNotFoundError(`Medic with id: ${id} not found`);

    return medic;
  }
}
