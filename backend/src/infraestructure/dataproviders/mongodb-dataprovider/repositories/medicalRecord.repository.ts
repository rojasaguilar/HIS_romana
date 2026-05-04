import { UpdateMedicalRecordDTO } from '../../../../core/domain/dtos/medicalRecord.dto';
import { MedicalRecordEntity } from '../../../../core/domain/entities/medicalRecord.entity';
import { MedicalRecordCreationError } from '../../../../core/domain/errors/medicalRecord.error';
import { IMedicalRecordRepository } from '../../../../core/domain/repositories/medicalRecord.repository.interface';
import { MedicalRecordMapper } from '../mappers/medicalRecord.mapper';
import medicalRecordModel from '../models/medicalRecord.model';

export class MedicalRecordRepository implements IMedicalRecordRepository {
  async update(
    id: string,
    data: UpdateMedicalRecordDTO,
  ): Promise<MedicalRecordEntity | null> {
    const medRecordDoc = await medicalRecordModel.findOneAndUpdate(
      { _id: id },
      data,
      { new: true },
    );

    if (!medRecordDoc) return null;

    return MedicalRecordMapper.toDomain(medRecordDoc);
  }
  async save(
    medicalRecord: MedicalRecordEntity,
  ): Promise<MedicalRecordEntity | null> {
    const medRecordData = MedicalRecordMapper.toPersistance(medicalRecord);

    const medRecordDoc = await medicalRecordModel.create(medRecordData);

    if (!medRecordDoc) return null;

    return MedicalRecordMapper.toDomain(medRecordDoc);
  }
  findById(id: string): Promise<MedicalRecordEntity | null> {
    throw new Error('Method not implemented.');
  }

  async getAll(): Promise<MedicalRecordEntity[]> {
    const recordDocs = await medicalRecordModel.find({});

    return recordDocs?.map((record) => MedicalRecordMapper.toDomain(record));
  }
}
