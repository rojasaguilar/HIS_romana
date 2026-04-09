import { MedicEntity } from '../../../../core/domain/entities/medic.entity';
import { IMedicRepository } from '../../../../core/domain/repositories/medic.repository.interface';
import medicModel from '../models/medic.model';
import { MedicMapper } from '../mappers/medic.mapper';

export class MedicRepository implements IMedicRepository {
  async save(medic: MedicEntity): Promise<MedicEntity> {
    const data = MedicMapper.toPersistence(medic);

    const createdMedic = await medicModel.create(data);

    return MedicMapper.toDomain(createdMedic);
  }
  async findById(id: string): Promise<MedicEntity | null> {
    const medic = await medicModel.findById(id);

    return medic ? MedicMapper.toDomain(medic) : null;
  }

  async getAll(): Promise<MedicEntity[]> {
    throw new Error('Method not implemented.');
  }
}
