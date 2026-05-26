import { MedicalRecordEntity } from "../../../../core/domain/entities/medicalRecord.entity";

import { medicalRecordDocument } from "../models/medicalRecord.model";

export class MedicalRecordMapper {
  static toDomain(
    doc: medicalRecordDocument,
  ): MedicalRecordEntity {
    return MedicalRecordEntity.create({
      patientId: doc.patientId.toString(),

      allergies: doc.allergies,

      height: doc.height,

      weight: doc.weight,

      currentConditions:
        doc.currentConditions?.map((condition) => ({
          conditionId:
            condition.conditionId.toString(),

          since: condition.since,

          diagnosedBy: condition.diagnosedBy,
        })) ?? [],

      chronicMedications:
        doc.chronicMedications?.map((m) => ({
          medicationName: m.medicationName,

          routeAdministration:
            m.routeAdministration,

          dosage: m.dosage,

          frequency: m.frequency,

          startedAt: m.startedAt,
        })) ?? [],

      familyHistory:
        doc.familyHistory?.map((fh) => ({
          relationship: fh.relationship,

          diseaseId: fh.diseaseId.toString(),
        })) ?? [],

      riskFactors: doc.riskFactors ?? [],

      surgicalHistory:
        doc.surgicalHistory?.map((s) => ({
          surgeryName: s.surgeryName,

          surgeryDate: s.surgeryDate,
        })) ?? [],

      antecedentesPersonalesPatologicos:
        doc.antecedentesPersonalesPatologicos,

      antecedentesGinecoObstetricos:
        doc.antecedentesGinecoObstetricos,

      summary: doc.summary,

      id: doc._id.toString(),
    });
  }

  static toPersistance(
    medicalRecord: MedicalRecordEntity,
  ) {
    return {
      patientId: medicalRecord.patientId,

      allergies: medicalRecord.allergies,

      height: medicalRecord.height,

      weight: medicalRecord.weight,

      currentConditions:
        medicalRecord.currentConditions.map(
          (condition) => ({
            conditionId: condition.conditionId,

            since: condition.since,

            diagnosedBy:
              condition.diagnosedBy,
          }),
        ),

      chronicMedications:
        medicalRecord.chronicMedications.map(
          (m) => ({
            medicationName:
              m.medicationName,

            routeAdministration:
              m.routeAdministration,

            dosage: m.dosage,

            frequency: m.frequency,

            startedAt: m.startedAt,
          }),
        ),

      riskFactors:
        medicalRecord.riskFactors,

      surgicalHistory:
        medicalRecord.surgicalHistory.map(
          (surgery) => ({
            surgeryName:
              surgery.surgeryName,

            surgeryDate:
              surgery.surgeryDate,
          }),
        ),

      familyHistory:
        medicalRecord.familyHistory.map(
          (fh) => ({
            relationship:
              fh.relationship.getValue(),

            diseaseId: fh.diseaseId,
          }),
        ),

      antecedentesGinecoObstetricos:
        medicalRecord
          .antecedentesGinecoObstetricos
          ?.toValue(),

      antecedentesPersonalesPatologicos:
        medicalRecord
          .antecedentesPersonalesPatologicos
          .toValue(),

      summary: medicalRecord.summary,
    };
  }
}