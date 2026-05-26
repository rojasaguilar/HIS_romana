// --- SUB-ENTIDADES (Útiles para tipar componentes de formularios o tablas pequeñas) ---

export interface CurrentCondition {
  conditionId: string;
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
  startedAt: Date; // ISO string de la fecha
}

export interface FamilyHistory {
  relationship: string;
  diseaseId: string;
}

export interface SurgicalHistory {
  surgeryName: string;
  surgeryDate: Date; // ISO string de la fecha
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

export interface AntecedentesGinecoObstetricos {
  menarca: {
    edad: number;
    observaciones: string;
  };

  fum: {
    fecha: string;
    ciclosRegulares: boolean;
    duracionCicloDias: number;
    observaciones: string;
  };

  inicioVidaSexualActiva: {
    edad: number;
    observaciones: string;
  };

  gestas: {
    embarazos: number;
    partos: number;
    cesareas: number;
    abortos: number;
    hijosVivos: number;
    observaciones: string;
  };

  metodoPlanificacionFamiliar: {
    usaMetodo: boolean;
    metodo: string;
    tiempoUso: string;
    observaciones: string;
  };
}

export interface AntecedentesPersonalesPatologicos {
  tabaquismo: {
    consume: boolean;
    frecuencia: string;
    cantidad: string;
    tiempoConsumo: string;
    fechaUltimoConsumo: string;
    observaciones: string;
  };

  alcoholismo: {
    consume: boolean;
    frecuencia: string;
    cantidad: string;
    tiempoConsumo: string;
    fechaUltimoConsumo: string;
    observaciones: string;
  };

  toxicomanias: {
    consume: boolean;
    sustancias: string[];
    frecuencia: string;
    tiempoConsumo: string;
    fechaUltimoConsumo: string;
    observaciones: string;
  };

  quirurgicos: {
    procedimiento: string;
    fecha: string;
    hospital: string;
    complicaciones: string;
    observaciones: string;
  }[];

  hemotransfusiones: {
    haRecibido: boolean;
    cantidad: number;
    fechaUltima: string;
    motivo: string;
    reaccionesAdversas: boolean;
    observaciones: string;
  };

  fracturas: {
    hueso: string;
    fecha: string;
    causa: string;
    tratamiento: string;
    secuelas: string;
    observaciones: string;
  }[];

  infectocontagiosas: {
    enfermedad: string;
    fechaDiagnostico: string;
    tratamiento: string;
    secuelas: string;
    observaciones: string;
  }[];

  hospitalizacionesPrevias: {
    motivo: string;
    hospital: string;
    fechaIngreso: string;
    fechaEgreso: string;
    tratamiento: string;
    observaciones: string;
  }[];

  cronicoDegenerativo: {
    enfermedad: string;
    fechaDiagnostico: string;
    tratamientoActual: string;
    controlada: boolean;
    observaciones: string;
  }[];
}

export const ROUTE_ADMINISTRATION_VALUES = {
  ORAL: "oral",
  INTRAVENOSA: "intravenosa",
  INTRAMUSCULAR: "intramuscular",
  SUBCUTANEA: "subcutanea",
  TOPICA: "topica",
  INHALADA: "inhalada",
  RECTAL: "rectal",
  SUBLINGUAL: "sublingual",
  OFTALMICA: "oftalmica",
  OTICA: "otica",
  OTRA: "otra",
} as const;

export type RouteAdministration =
  (typeof ROUTE_ADMINISTRATION_VALUES)[keyof typeof ROUTE_ADMINISTRATION_VALUES];

export const parseRouteAdministration = (routeAdministration: string) => {
  const values = Object.values(ROUTE_ADMINISTRATION_VALUES);

  if (!values.includes(routeAdministration as RouteAdministration)) {
    throw new Error(`Route administration: ${routeAdministration} not valid`);
  }

  return routeAdministration as RouteAdministration;
};
