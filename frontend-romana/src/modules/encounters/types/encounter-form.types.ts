export type EncounterFormValues = {
  symptoms: string;
  notes?: string;

  interrogatorioAparatosSistemas: {
    system: string;
    normal: boolean;
    sintomas?: string;
    notas?: string;
  }[];

  signosVitales: {
    tensionArterial: {
      sistolica: number;
      diastolica: number;
      unidad: "mmHg";
    };
    temperatura: { valor: number; unidad: "°C" };
    frecuenciaCardiaca: { valor: number; unidad: "lpm" };
    frecuenciaRespiratoria: { valor: number; unidad: "rpm" };
    peso: { valor: number; unidad: "kg" | "lb" };
    talla: { valor: number; unidad: "cm" };
    imc: { valor: number; clasificacion: string };
    icc: { valor: number; clasificacion: string };
  };

  integracionDiagnostica: {
    conditionId?: string;
    diagnostico: string;
    cie10: string;
    tipo: string;
    estado: string;
    principal?: boolean;
    observaciones?: string;
  }[];

  exploracionFisica: {
    sistema: string;
    normal: boolean;
    hallazgos?: string;
    descripcion?: string;
    observaciones?: string;
  }[];

  prescriptions: {
    nombre: string;
    tipo: string;
    dosis: string;
    frecuencia: string;
    routeAdministration: string;
    fechaInicio: string;
    fechaFin: string;
  }[];
};