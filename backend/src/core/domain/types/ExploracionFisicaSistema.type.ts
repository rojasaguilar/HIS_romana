export const EXPLORACION_FISICA_SISTEMA = {
  HABITUS_EXTERIOR: "habitusExterior",
  CABEZA: "cabeza",
  OJOS: "ojos",
  OIDOS: "oidos",
  NARIZ: "nariz",
  BOCA: "boca",
  CUELLO: "cuello",
  TORAX: "torax",
  CARDIOVASCULAR: "cardiovascular",
  RESPIRATORIO: "respiratorio",
  ABDOMEN: "abdomen",
  GENITOURINARIO: "genitourinario",
  EXTREMIDADES: "extremidades",
  MUSCULOESQUELETICO: "musculoesqueletico",
  NEUROLOGICO: "neurologico",
  PIEL_MUCOSAS_ANEXOS: "pielMucosasAnexos",
  COLUMNA: "columna",
  LINFATICO: "linfatico",
} as const;

export type ExploracionFisicaSistema =
  (typeof EXPLORACION_FISICA_SISTEMA)[keyof typeof EXPLORACION_FISICA_SISTEMA];

export const parseExploracionFisicaSistema = (
  sistema: string,
): ExploracionFisicaSistema => {
  const values = Object.values(EXPLORACION_FISICA_SISTEMA);

  if (!values.includes(sistema as ExploracionFisicaSistema)) {
    throw new Error(
      `Sistema de exploración física inválido: ${sistema}`,
    );
  }

  return sistema as ExploracionFisicaSistema;
};