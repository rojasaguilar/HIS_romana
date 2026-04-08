import { SpecialityEntity } from '../entities/speciality.entity';

export interface ISpecialityRepository {
  save(speciality: SpecialityEntity): Promise<SpecialityEntity>;

  findById(id: string): Promise<SpecialityEntity | null>;

  getAll(): Promise<SpecialityEntity[]>;
}
