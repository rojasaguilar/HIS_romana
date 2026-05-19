import { SpecialityEntity } from '../../domain/entities/speciality.entity';
import { SpecialityNotFoundError } from '../../domain/errors/speciality.error';
import { ISpecialityRepository } from '../../domain/repositories/speciality.repository.interface';

export interface UpdateSpecialityDTO {
  name: string;
  isActive: boolean;
}

export class UpdateSpecialityUseCase {
  constructor(public readonly specialityRepository: ISpecialityRepository) {}

  async execute(
    id: string,
    data: UpdateSpecialityDTO,
  ): Promise<SpecialityEntity> {
    const updatedSpec = await this.specialityRepository.update(id, data);

    if (!updatedSpec)
      throw new SpecialityNotFoundError(`Speciality with id: ${id} not found`);

    return updatedSpec;
  }
}
