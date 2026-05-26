// --- DTOs (Frontend -> Backend) ---

import type {
  ChronicMedication,
  CurrentCondition,
  FamilyHistory,
  SurgicalHistory,
  AntecedentesGinecoObstetricos,
  AntecedentesPersonalesPatologicos,
} from "../types/medical-record.types";

export interface CreateMedicalRecordDTO {
  patientId: string;

  allergies: string[];

  height: number;

  weight: number;

  currentConditions: CurrentCondition[];

  chronicMedications: ChronicMedication[];

  familyHistory: FamilyHistory[];

  riskFactors: string[];

  surgicalHistory: SurgicalHistory[];

  antecedentesPersonalesPatologicos: AntecedentesPersonalesPatologicos;

  antecedentesGinecoObstetricos?: AntecedentesGinecoObstetricos;

  summary?: string;
}

// Update DTO
export type UpdateMedicalRecordDTO = Omit<
  CreateMedicalRecordDTO,
  "patientId"
>;