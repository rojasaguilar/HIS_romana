import { UpdateMedicalRecordDTO } from '../dtos/medicalRecord.dto';
import { MedicalRecordEntity } from '../entities/medicalRecord.entity';

export interface IMedicalRecordRepository {
  save(medicalRecord: MedicalRecordEntity): Promise<MedicalRecordEntity | null>;

  findById(id: string): Promise<MedicalRecordEntity | null>;

  getAll(): Promise<MedicalRecordEntity[]>;

  update(
    id: string,
    data: UpdateMedicalRecordDTO,
  ): Promise<MedicalRecordEntity | null>;
}
