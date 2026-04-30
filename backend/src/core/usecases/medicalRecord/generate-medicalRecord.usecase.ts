import { CreateMedicalRecordDTO } from '../../domain/dtos/medicalRecord.dto';
import { MedicalRecordEntity } from '../../domain/entities/medicalRecord.entity';
import { MedicalRecordCreationError } from '../../domain/errors/medicalRecord.error';
import { IMedicalRecordRepository } from '../../domain/repositories/medicalRecord.repository.interface';

export class GenerateMedicalRecordUseCase {
  constructor(
    private readonly medicalRecordRepository: IMedicalRecordRepository,
  ) {}

  async execute(
    data: CreateMedicalRecordDTO,
  ): Promise<MedicalRecordEntity | null> {
    const medicalRecord = MedicalRecordEntity.create(data);

    const savedMedicalRecord =
      await this.medicalRecordRepository.save(medicalRecord);

    if (!savedMedicalRecord)
      throw new MedicalRecordCreationError(`Error saving the medical record`);

    return savedMedicalRecord;
  }
}
