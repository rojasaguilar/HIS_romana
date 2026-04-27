import { Relationship } from '../value-objects/relationship.vo';

export interface createMedicalRecordDTO {
  patientId: string;
  allergies: string[];
  height: number;
  weight: number;
  //activeProblem
  //chronicMedications
  familyHistory: { relation: string; diseaseId: string }[];
  riskFactors: string[];
  //   surgicalHistory
  summary?: string;
  id?: string;
}
