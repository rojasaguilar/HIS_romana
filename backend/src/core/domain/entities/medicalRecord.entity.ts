import { CreateMedicalRecordDTO } from '../dtos/medicalRecord.dto';
import { InconsistantMedicalRecordError } from '../errors/medicalRecord.error';
import { ChronicMedication } from '../value-objects/chronicMedication.vo';
import { CurrentCondition } from '../value-objects/currentCondition.vo';
import { FamilyHistory } from '../value-objects/familyHistory.vo';
import { Relationship } from '../value-objects/relationship.vo';
import { SurgeryRecord } from '../value-objects/surgeryRecord.vo';

export class MedicalRecordEntity {
  private constructor(
    public readonly patientId: string,
    public allergies: string[],
    public height: number,
    public weight: number,
    public currentConditions: CurrentCondition[],
    public chronicMedications: ChronicMedication[],
    public riskFactors: string[],
    public surgicalHistory: SurgeryRecord[],
    public familyHistory: FamilyHistory[],
    public summary?: string,
    public id?: string,
  ) {
    if (patientId.length <= 0)
      throw new InconsistantMedicalRecordError(`Invalid patientId`);
    
    if (height <= 0)
      throw new InconsistantMedicalRecordError(
        `A height of : ${height} is not valid`,
      );

    if (weight <= 0) {
      throw new InconsistantMedicalRecordError(
        `A weight of : ${weight} is not valid`,
      );
    }
  }

  public static create(data: CreateMedicalRecordDTO) {
    const currentConditions = data.currentConditions
      ? data.currentConditions.map(
          (condition) =>
            new CurrentCondition(
              condition.diseaseId,
              condition.since,
              condition.diagnosedBy,
            ),
        )
      : [];

    const chronicMedications = data.chronicMedications
      ? data.chronicMedications.map(
          (medication) =>
            new ChronicMedication(
              medication.medicationName,
              medication.dosage,
              medication.frequency,
              medication.startedAt,
            ),
        )
      : [];

    const surgicalHistory = data.surgicalHistory
      ? data.surgicalHistory.map(
          (surgery) =>
            new SurgeryRecord(surgery.surgeryName, surgery.surgeryDate),
        )
      : [];

    const familyHistory = data.familyHistory
      ? data.familyHistory.map((fh) => {
          //create relationship based on dto relationship
          const relationShip = Relationship.create(fh.relation);
          //return a Family member with it's disease
          return new FamilyHistory(relationShip, fh.diseaseId);
        })
      : [];

    return new MedicalRecordEntity(
      data.patientId,
      data.allergies,
      data.height,
      data.weight,
      currentConditions,
      chronicMedications,
      data.riskFactors,
      surgicalHistory,
      familyHistory,
      data.summary,
      data.id,
    );
  }
}
