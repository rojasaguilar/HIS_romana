import { MedicalRecordEntity } from '../../../../core/domain/entities/medicalRecord.entity';
import { ChronicMedication } from '../../../../core/domain/value-objects/chronicMedication.vo';
import { CurrentCondition } from '../../../../core/domain/value-objects/currentCondition.vo';
import { medicalRecordDocument } from '../models/medicalRecord.model';

export class MedicalRecordMapper {
  static toDomain(doc: medicalRecordDocument): MedicalRecordEntity {
    return MedicalRecordEntity.create({
      patientId: doc.patientId,
      allergies: doc.allergies,
      height: doc.height,
      weight: doc.weight,
      currentConditions: doc.currentConditions?.map(
        (condition) =>
          new CurrentCondition(
            condition.conditionId.toString(),
            condition.since,
            condition.diagnosedBy,
          ),
      ),
      chronicMedications: doc.chronicMedications?.map(
        (m) =>
          new ChronicMedication(
            m.medicationName,
            m.dosage,
            m.frequency,
            m.startedAt,
          ),
      ),
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
      height: medicalRecord.height,
      weight: medicalRecord.weight,
      currentConditions: medicalRecord.currentConditions,
      chronicMedications: medicalRecord.chronicMedications,
      riskFactors: medicalRecord.riskFactors,
      surgicalHistory: medicalRecord.surgicalHistory,
      familyHistory: medicalRecord.familyHistory?.map((fh) => ({
        relationship: fh.relationship.getValue(),
        diseaseId: fh.diseaseId,
      })),
      summary: medicalRecord.summary,
    };
  }
}
