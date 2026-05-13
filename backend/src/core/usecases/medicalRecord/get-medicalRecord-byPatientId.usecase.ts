import { MedicalRecordNotFoundError } from '../../domain/errors/medicalRecord.error';
import { IMedicalRecordRepository } from '../../domain/repositories/medicalRecord.repository.interface';

export class GetMedicalRecordByPatientIdUseCase {
  constructor(
    private readonly medicalRecordRepository: IMedicalRecordRepository,
  ) {}

  async execute(patientId: string) {
    const medRec =
      await this.medicalRecordRepository.findByPatientId(patientId);

    if (!medRec)
      throw new MedicalRecordNotFoundError(
        `Medical record for patient: ${patientId} not generated yet`,
      );

    return medRec;
  }
}
