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

export const parseDiagnosticoTipo = (
  tipo: string,
): DiagnosticoTipo => {
  const values = Object.values(DIAGNOSTICO_TIPO);

  if (!values.includes(tipo as DiagnosticoTipo)) {
    throw new Error(
      `Tipo de diagnóstico inválido: ${tipo}`,
    );
  }

  return tipo as DiagnosticoTipo;
};