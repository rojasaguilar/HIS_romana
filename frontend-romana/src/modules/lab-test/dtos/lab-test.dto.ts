// dtos/lab-test.dto.ts

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

export interface LabFileDTO {
  url: string;
  name: string;
  uploadedAt: Date;
}

export interface CreateLabTestDTO {
  patientId: string;
  orderedBy: string;
  encounterId?: string;
  category: CategoriaEstudiosLab;
  testName: string;
  instructions?: string;
}

export interface CreateEncounterLabTestDTO {
  category: CategoriaEstudiosLab;

  testName: string;

  instructions?: string;
}

export interface UpdateLabTestResultsDTO {
  status: "PENDING" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED";
  files?: LabFileDTO[];
  notes?: string;
}
