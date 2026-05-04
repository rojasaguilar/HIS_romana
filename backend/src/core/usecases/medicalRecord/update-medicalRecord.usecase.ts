import { UpdateMedicalRecordDTO } from '../../domain/dtos/medicalRecord.dto';
import { IMedicalRecordRepository } from '../../domain/repositories/medicalRecord.repository.interface';

export class UpdateMedicalRecordUseCase {
  constructor(
    private readonly medicalRecordRepository: IMedicalRecordRepository,
  ) {}

  async execute(id: string, data: UpdateMedicalRecordDTO) {
    return await this.medicalRecordRepository.update(id, data);
  }
}
