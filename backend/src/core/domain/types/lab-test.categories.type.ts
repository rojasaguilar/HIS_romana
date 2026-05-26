export const CATEGORIAS_ESTUDIOS_LAB = {
// Muestras Biológicas Principales
  SANGRE: 'SANGRE',                     // Hematología, Química Clínica, Coagulación
  ORINA: 'ORINA',                       // Uroanálisis, Orina de 24 hrs
  HECES: 'HECES',                       // Coprológico, Coproparasitoscópico, Sangre oculta
  TEJIDOS: 'TEJIDOS',                   // Biopsias, Histopatología, Piezas quirúrgicas
  
  // Líquidos y Secreciones Especiales
  EXUDADOS_SECRECIONES: 'EXUDADOS_SECRECIONES', // Faríngeo, vaginal, uretral, óptico, heridas
  ESPUTO: 'ESPUTO',                     // Baciloscopias (BAAR), cultivos pulmonares
  LIQUIDOS_CORPORALES: 'LIQUIDOS_CORPORALES',   // Líquido Cefalorraquídeo (LCR), sinovial, pleural, ascítico
  
  // Especialidades de Laboratorio Avanzadas
  MICROBIOLOGIA_CULTIVOS: 'MICROBIOLOGIA_CULTIVOS', // Bacteriología, Micología, Antibiogramas
  INMUNOLOGIA_SEROLOGIA: 'INMUNOLOGIA_SEROLOGIA',   // Anticuerpos, VIH, Hepatitis, VDRL, Reumatología
  BIOLOGIA_MOLECULAR_GENETICA: 'BIOLOGIA_MOLECULAR_GENETICA', // PCR (Covid, Papiloma), Cariotipos, ADN
  ENDOCRINOLOGIA_HORMONAS: 'ENDOCRINOLOGIA_HORMONAS', // Perfil tiroideo, ginecológico, fertilidad, diabetes
  TOXICOLOGIA: 'TOXICOLOGIA',           // Antidoping, metales pesados, niveles de medicamentos
  
  // Otras Categorías Clínicas
  CITOLOGIA: 'CITOLOGIA',               // Papanicolaou, citología exfoliativa o de líquidos
  ALERGIAS: 'ALERGIAS',                 // Paneles de alérgenos IgE específicos
  PRUEBAS_FUNCIONALES: 'PRUEBAS_FUNCIONALES'
} as const;

export type CategoriaEstudiosLab =
  (typeof CATEGORIAS_ESTUDIOS_LAB)[keyof typeof CATEGORIAS_ESTUDIOS_LAB];

export const parseStatus = (categoria: string) => {
  const values = Object.values(CATEGORIAS_ESTUDIOS_LAB);

  if (!values.includes(categoria as CategoriaEstudiosLab))
    throw new Error(`Categoria: ${categoria} no valida `);

  return categoria as CategoriaEstudiosLab;
};
