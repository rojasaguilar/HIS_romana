// import type { CreateEncounterLabTestDTO } from "@/modules/lab-test/dtos/lab-test.dto";

// // Extraemos la receta a su propia interfaz para que sea más fácil tipar formularios
// export interface PrescriptionDTO {
//   medicationName: string;
//   dosage: { amount: number; unit: string };
//   frequency: string;
//   startDate: string; // Se manda/recibe como ISO string (ej. "2026-05-14T10:00:00.000Z")
//   endDate: string; // Se manda/recibe como ISO string
// }

// export interface CreateEncounterDTO {
//   patientId: string;
//   medicId: string;
//   appointmentId: string;
//   symptoms: string;
//   notes?: string; // Opcional, como el default: null de Mongoose
//   preliminaryDiagnosis: string;
//   differentialDiagnosis: string;
//   prescriptions: PrescriptionDTO[];
//   labTests?: CreateEncounterLabTestDTO[];
// }

// // La entidad completa que te devuelve el backend al hacer un GET o un POST exitoso
// export interface Encounter extends CreateEncounterDTO {
//   id: string; // Mongoose devuelve _id, pero asumo que en tu backend lo mapeas a id
//   createdAt: Date;
// }

export interface PrescriptionDTO {
  nombre: string;
  tipo: string;

  dosis: string;
  frecuencia: string;

  routeAdministration: string;

  fechaInicio: string; // ISO
  fechaFin: string; // ISO

  duracion?: string;
  indicacion?: string;

  respuestaTratamiento?: string;

  efectosAdversos?: string[];

  suspendido?: boolean;
  motivoSuspension?: string;

  observaciones?: string;
}

export interface SignosVitalesDTO {
  tensionArterial: {
    sistolica: number;
    diastolica: number;
    unidad: "mmHg";
  };

  temperatura: {
    valor: number;
    unidad: "°C";
  };

  frecuenciaCardiaca: {
    valor: number;
    unidad: "lpm";
  };

  frecuenciaRespiratoria: {
    valor: number;
    unidad: "rpm";
  };

  peso: {
    valor: number;
    unidad: "kg" | "lb";
  };

  talla: {
    valor: number;
    unidad: "cm";
  };

  imc: {
    valor: number;
    clasificacion: string;
  };

  icc: {
    valor: number;
    clasificacion: string;
  };
}

export const DIAGNOSTICO_TIPO = {
  PRESUNTIVO: "presuntivo",
  DEFINITIVO: "definitivo",
  DIFERENCIAL: "diferencial",
  SINDROMATICO: "sindromatico",
  ETIOLOGICO: "etiologico",
  NOSOLOGICO: "nosologico",
  TOPOGRAFICO: "topografico",
  FUNCIONAL: "funcional",
} as const;

export type DiagnosticoTipo =
  (typeof DIAGNOSTICO_TIPO)[keyof typeof DIAGNOSTICO_TIPO];

export const parseDiagnosticoTipo = (tipo: string): DiagnosticoTipo => {
  const values = Object.values(DIAGNOSTICO_TIPO);

  if (!values.includes(tipo as DiagnosticoTipo)) {
    throw new Error(`Tipo de diagnóstico inválido: ${tipo}`);
  }

  return tipo as DiagnosticoTipo;
};

export interface IntegracionDiagnosticaDTO {
  conditionId?: string;

  diagnostico: string; // DIAGNOSTICO_TIPO

  cie10: string;

  tipo: DiagnosticoTipo;
  estado: string;

  principal?: boolean;

  fechaDiagnostico?: string;

  observaciones?: string;
}

export interface ExploracionFisicaDTO {
  sistema: string;
  normal: boolean;

  hallazgos?: string;
  descripcion?: string;
  observaciones?: string;
}

export interface InterrogatorioSistemaDTO {
  system: string;
  normal: boolean;

  sintomas?: string;
  notas?: string;
}

export interface CreateEncounterDTO {
  patientId: string;
  medicId: string;
  appointmentId: string;

  symptoms: string;
  notes?: string;

  interrogatorioAparatosSistemas: InterrogatorioSistemaDTO[];

  signosVitales: SignosVitalesDTO;

  integracionDiagnostica: IntegracionDiagnosticaDTO[];

  exploracionFisica: ExploracionFisicaDTO[];

  prescriptions: PrescriptionDTO[];
}
