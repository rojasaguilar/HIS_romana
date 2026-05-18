// dtos/lab-test.dto.ts

export const CATEGORIAS_ESTUDIOS_LAB = {
  SANGRE: "SANGRE",
  ORINA: "ORINA",
  HECES: "HECES",
  TEJIDOS: "TEJIDOS",
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
