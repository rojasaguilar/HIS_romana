// --- SUB-ENTIDADES (Útiles para tipar componentes de formularios o tablas pequeñas) ---

export interface CurrentCondition {
  diseaseId: number;
  since: string; // ISO string de la fecha
  diagnosedBy?: string;
}

export interface ChronicMedication {
  medicationName: string;
  dosage: { 
    amount: number; 
    unit: string; 
  };
  frequency: { 
    timesPerDay: number; 
  };
  startedAt: string; // ISO string de la fecha
}

export interface FamilyHistory {
  relationship: string;
  diseaseId: string;
}

export interface SurgicalHistory {
  surgeryName: string;
  surgeryDate: string; // ISO string de la fecha
}


// --- ENTIDAD PRINCIPAL (Lo que devuelve el backend en los GET) ---

export interface MedicalRecord {
  id: string;
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


