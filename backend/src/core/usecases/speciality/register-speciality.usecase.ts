import { SpecialityEntity } from '../../domain/entities/speciality.entity';
import { ISpecialityRepository } from '../../domain/repositories/speciality.repository.interface';

export interface SpecialityDTO {
  name: string;
}

export class RegisterSpecialityUseCase {
  constructor(public readonly specialityRepository: ISpecialityRepository) {}

  async execute(data: SpecialityDTO): Promise<SpecialityEntity> {
    const specialityToSave = new SpecialityEntity(data.name, true);

    return await this.specialityRepository.save(specialityToSave);
  }
}
