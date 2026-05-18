// types/lab-test.types.ts

import type {
  CategoriaEstudiosLab,
  LabFileDTO,
} from "../dtos/lab-test.dto";

export type LabTestStatus =
  | "PENDING"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "CANCELLED";

export interface LabTest {
  id: string;

  patientId: string;

  orderedBy: string;

  encounterId?: string;

  category: CategoriaEstudiosLab;

  testName: string;

  instructions?: string;

  status: LabTestStatus;

  notes: string | null;

  files: LabFileDTO[];

  completedAt: string | null;

  createdAt: string;

  updatedAt: string;
}