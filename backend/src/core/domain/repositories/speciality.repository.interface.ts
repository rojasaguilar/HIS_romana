import { UpdateSpecialityDTO } from '../../usecases/speciality/update-speciality.usecase';
import { SpecialityEntity } from '../entities/speciality.entity';

export interface ISpecialityRepository {
  save(speciality: SpecialityEntity): Promise<SpecialityEntity>;

  findById(id: string): Promise<SpecialityEntity | null>;

  update(
    id: string,
    data: UpdateSpecialityDTO,
  ): Promise<SpecialityEntity | null>;

  getAll(): Promise<SpecialityEntity[]>;
}
