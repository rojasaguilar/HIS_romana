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
