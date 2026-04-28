import { MedicalRecordEntity } from '../../../../core/domain/entities/medicalRecord.entity';
import { medicalRecordDocument } from '../models/medicalRecord.model';

export class MedicalRecordMapper {
  static toDomain(doc: medicalRecordDocument): MedicalRecordEntity {
    return MedicalRecordEntity.create({
      patientId: doc.patientId,
      allergies: doc.allergies,
      height: doc.height,
      weight: doc.weight,
      currentConditions: doc.currentConditions,
      chronicMedications: doc.chronicMedications,
      riskFactors: doc.riskFactors,
      surgicalHistory: doc.surgicalHistory,
      familyHistory: doc.familyHistory,
      summary: doc.summary,
      id: doc._id.toString(),
    });
  }

  static toPersistance(medicalRecord: MedicalRecordEntity) {
    return {
      patientId: medicalRecord.patientId,
      allergies: medicalRecord.allergies,
      weight: medicalRecord.weight,
      height: medicalRecord.height,
      currentConditions:
        medicalRecord.currentConditions?.map((condition) => ({
          diseaseId: condition.diseaseId,
          since: condition.since,
          diagnosedBy: condition.diagnosedBy ?? undefined,
        })) ?? [],
      chronicMedications:
        medicalRecord.chronicMedications?.map((med) => ({
          medicationName: med.medicationName,
          dosage: { amount: med.dosage.amount, unit: med.dosage.unit },
          frequency: { timesPerDay: med.frequency.timesPerDay },
          startedAt: med.startedAt,
        })) ?? [],
      riskFactors: medicalRecord.riskFactors,
      surgicalHistory:
        medicalRecord.surgicalHistory?.map((surgery) => ({
          surgeryName: surgery.surgeryName,
          surgeryDate: surgery.surgeryDate,
        })) ?? [],
      familyHistory: medicalRecord.familyHistory.map((fh) => ({
        relationship: fh.relationship.getValue(),
        diseaseId: fh.diseaseId,
      })),
      summary: medicalRecord.summary ?? undefined,
    };
  }
}
