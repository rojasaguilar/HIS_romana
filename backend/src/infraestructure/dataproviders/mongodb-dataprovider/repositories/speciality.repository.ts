import { SpecialityEntity } from '../../../../core/domain/entities/speciality.entity';
import { ISpecialityRepository } from '../../../../core/domain/repositories/speciality.repository.interface';
import specialityModel from '../models/speciality.model';
import { SpecialityMapper } from '../mappers/speciality.mapper';
import { UpdateSpecialityDTO } from '../../../../core/usecases/speciality/update-speciality.usecase';
import { SpecialityNotFoundError } from '../../../../core/domain/errors/speciality.error';

export class SpecialityRepository implements ISpecialityRepository {
  async update(
    id: string,
    data: UpdateSpecialityDTO,
  ): Promise<SpecialityEntity | null> {
    const updatedSpecDoc = await specialityModel.findByIdAndUpdate(id, data, {
      returnDocument: 'after',
    });

    if (!updatedSpecDoc) return null;

    return SpecialityMapper.toDomain(updatedSpecDoc);
  }

  async save(speciality: SpecialityEntity): Promise<SpecialityEntity> {
    const specialityData = SpecialityMapper.toPersistence(speciality);

    const specialityDoc = await specialityModel.create(specialityData);

    return SpecialityMapper.toDomain(specialityDoc);
  }

  async findById(id: string): Promise<SpecialityEntity | null> {
    const specialityDoc = await specialityModel.findById(id);

    return specialityDoc ? SpecialityMapper.toDomain(specialityDoc) : null;
  }

  async getAll(): Promise<SpecialityEntity[]> {
    const specialityDocs = await specialityModel.find();

    return specialityDocs.map((speciality) =>
      SpecialityMapper.toDomain(speciality),
    );
  }
}
