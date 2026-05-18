export const CATEGORIAS_ESTUDIOS_LAB = {
  SANGRE: 'SANGRE',
  ORINA: 'ORINA',
  HECES: 'HECES',
  TEJIDOS: 'TEJIDOS',
} as const;

export type CategoriaEstudiosLab =
  (typeof CATEGORIAS_ESTUDIOS_LAB)[keyof typeof CATEGORIAS_ESTUDIOS_LAB];

export const parseStatus = (categoria: string) => {
  const values = Object.values(CATEGORIAS_ESTUDIOS_LAB);

  if (!values.includes(categoria as CategoriaEstudiosLab))
    throw new Error(`Categoria: ${categoria} no valida `);

  return categoria as CategoriaEstudiosLab;
};
