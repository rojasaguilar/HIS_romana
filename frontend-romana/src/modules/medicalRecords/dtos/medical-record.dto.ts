// --- DTOs (Lo que envías desde el frontend en POST/PUT) ---

import type { ChronicMedication, CurrentCondition, FamilyHistory, SurgicalHistory } from "../types/medical-record.types";

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
  summary?: string;
}

// Para el Update, es exactamente igual al Create, pero sin el patientId.
// Usamos Omit de TypeScript para mantener el código limpio y evitar repetir.
export type UpdateMedicalRecordDTO = Omit<CreateMedicalRecordDTO, 'patientId'>;