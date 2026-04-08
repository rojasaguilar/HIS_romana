import { SpecialityEntity } from '../../../../core/domain/entities/speciality.entity';
import { ISpecialityRepository } from '../../../../core/domain/repositories/speciality.repository.interface';
import specialityModel from '../models/speciality.model';
import { SpecialityMapper } from '../mappers/speciality.mapper';

export class SpecialityRepository implements ISpecialityRepository {
  async save(speciality: SpecialityEntity): Promise<SpecialityEntity> {
    const specialityData = SpecialityMapper.toPersistence(speciality);

    const specialityDoc = await specialityModel.create(specialityData);

    return SpecialityMapper.toDomain(specialityDoc);
  }
  async findById(id: string): Promise<SpecialityEntity | null> {
    return await specialityModel.findById(id);
  }
  async getAll(): Promise<SpecialityEntity[]> {
    throw new Error('Method not implemented.');
  }
}
