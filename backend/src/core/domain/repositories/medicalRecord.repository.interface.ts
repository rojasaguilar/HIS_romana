import { MedicalRecordEntity } from '../entities/medicalRecord.entity';

export interface IMedicalRecordRepository {
  save(medicalRecord: MedicalRecordEntity): Promise<MedicalRecordEntity | null>;

  findById(id: string): Promise<MedicalRecordEntity | null>;

  getAll(): Promise<MedicalRecordEntity[]>;
}
