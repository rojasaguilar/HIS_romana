export interface CreateMedicalRecordDTO {
  patientId: string;
  allergies: string[];
  height: number;
  weight: number;
  currentConditions: {
    diseaseId: number;
    since: Date;
    diagnosedBy?: string;
  }[];
  chronicMedications: {
    medicationName: string;
    dosage: { amount: number; unit: string };
    frequency: { timesPerDay: number };
    startedAt: Date;
  }[];
  familyHistory: { relation: string; diseaseId: string }[];
  riskFactors: string[];
  surgicalHistory: { surgeryName: string; surgeryDate: Date }[];
  summary?: string;
  id?: string;
}
