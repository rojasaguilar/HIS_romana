import { RouteAdministration } from '../types/routeAdministration.type';
import type { AntecedentesGinecoObstetricosProps } from '../value-objects/antecedentesGinecoObstetricos.vo';

import type { AntecedentesPersonalesPatologicosProps } from '../value-objects/antecedentesPersonalesPatologicos.vo';

export interface CreateMedicalRecordDTO {
  patientId: string;

  allergies: string[];

  height: number;

  weight: number;

  currentConditions: {
    conditionId: string;
    since: string;
    diagnosedBy?: string;
  }[];

  chronicMedications: {
    medicationName: string;
    routeAdministration: RouteAdministration;

    dosage: {
      amount: number;
      unit: string;
    };

    frequency: {
      timesPerDay: number;
    };

    startedAt: Date;
  }[];

  familyHistory: {
    relationship: string;
    diseaseId: string;
  }[];

  riskFactors: string[];

  surgicalHistory: {
    surgeryName: string;
    surgeryDate: Date;
  }[];

  antecedentesPersonalesPatologicos: AntecedentesPersonalesPatologicosProps;

  antecedentesGinecoObstetricos?: AntecedentesGinecoObstetricosProps;

  summary?: string;

  id?: string;
}

export interface UpdateMedicalRecordDTO {
  allergies: string[];

  height: number;

  weight: number;

  currentConditions: {
    conditionId: string;
    since: string;
    diagnosedBy?: string;
  }[];

  chronicMedications: {
    medicationName: string;

    routeAdministration: RouteAdministration;

    dosage: {
      amount: number;
      unit: string;
    };

    frequency: {
      timesPerDay: number;
    };

    startedAt: Date;
  }[];

  familyHistory: {
    relationship: string;
    diseaseId: string;
  }[];

  riskFactors: string[];

  surgicalHistory: {
    surgeryName: string;
    surgeryDate: Date;
  }[];

  antecedentesPersonalesPatologicos: AntecedentesPersonalesPatologicosProps;

  antecedentesGinecoObstetricos?: AntecedentesGinecoObstetricosProps;

  summary?: string;
}
