import { createMedicalRecordDTO } from '../dtos/medicalRecord.dto';
import { FamilyHistory } from '../value-objects/familyHistory.vo';
import { Relationship } from '../value-objects/relationship.vo';

export class MedicalRecordEntity {
  private constructor(
    public readonly patientId: string,
    public allergies: string[],
    public height: number,
    public weight: number,
    public activeProblem: {
      diseaseId: number;
      since: Date;
      status: string;
      diagnosedBy?: string;
    },
    public chronicMedications: {
      medicationName: string;
      dosage: { amount: number; unit: string };
      frequency: { timesPerDay: number };
      startedAt: Date;
    },
    public riskFactors: string[],
    public surgicalHistory?: { surgeryName: string; surgeryDate: Date }[],
    public familyHistory?: FamilyHistory[],
    public summary?: string,
    public id?: string,
  ) {}

  public static create(data: createMedicalRecordDTO) {
    
    const familyHistory = data.familyHistory
      ? data.familyHistory.map((fh) => {
          //create relationship based on dto relationship
          const relationShip = Relationship.create(fh.relation);
          //return a Family member with it's disease
          return new FamilyHistory(relationShip, fh.diseaseId);
        })
      : undefined;

    return new MedicalRecordEntity(
      data.patientId,
      data.allergies,
      data.height,
      data.weight,
      familyHistory,
    );
  }
}
