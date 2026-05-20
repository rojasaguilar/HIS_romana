export const ESTADO_CIVIL = {
  SOLTERO: 'Soltero(a)',
  CASADO: 'Casado(a)',
  DIVORCIADO: 'Divorciado(a)',
  VIUDO: 'Viudo(a)',
  UNION_LIBRE: 'Unión Libre',
} as const;

export type EstadoCivil = (typeof ESTADO_CIVIL)[keyof typeof ESTADO_CIVIL];

export const parseEstadoCivil = (estadoCivil: string): EstadoCivil => {
  const values = Object.values(ESTADO_CIVIL);

  if (!values.includes(estadoCivil as EstadoCivil)) {
    throw new Error(`Estado civil inválido: ${estadoCivil}`);
  }

  return estadoCivil as EstadoCivil;
};
