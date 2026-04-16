import { SpecialityEntity } from '../../domain/entities/speciality.entity';
import { SpecialityNotFoundError } from '../../domain/errors/speciality.error';
import { ISpecialityRepository } from '../../domain/repositories/speciality.repository.interface';

export class GetSpecialityByIdUseCase {
  constructor(private readonly specialityRepository: ISpecialityRepository) {}

  async execute(id: string): Promise<SpecialityEntity> {
    const speciality = await this.specialityRepository.findById(id);

    if (!speciality)
      throw new SpecialityNotFoundError(`Speciality with id: ${id} not found`);

    return speciality;
  }
}
