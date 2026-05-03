import { IMedicalRecordRepository } from '../../domain/repositories/medicalRecord.repository.interface';

export class GetAllMedicalRecordsUseCase {
  constructor(
    private readonly medicalRecordRepository: IMedicalRecordRepository,
  ) {}

  async execute() {
    return await this.medicalRecordRepository.getAll();
  }
}
