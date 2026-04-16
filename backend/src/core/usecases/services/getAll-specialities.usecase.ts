import { SpecialityEntity } from '../../domain/entities/speciality.entity';
import { ISpecialityRepository } from '../../domain/repositories/speciality.repository.interface';

export class GetAllSpecialitiesUseCase {
  constructor(private readonly specialityRepository: ISpecialityRepository) {}

  async execute(): Promise<SpecialityEntity[]> {
    return await this.specialityRepository.getAll();
  }
}
