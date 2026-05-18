import { CategoriaEstudiosLab } from '../types/lab-test.categories.type';

// Archivo físico o resultado digital
export interface LabFileDTO {
  url: string;
  name: string;
  uploadedAt: Date;
}

export interface CreateLabTestDTO {
  patientId: string;
  orderedBy: string; // medicId
  encounterId?: string; // Opcional, por si un médico lo ordena fuera de consulta
  category: CategoriaEstudiosLab;
  testName: string; // Ej: "Química Sanguínea de 27 elementos"
  instructions?: string; // Ej: "Ayuno de 12 horas"
}

// Para cuando el recepcionista o médico sube los resultados
export interface UpdateLabTestResultsDTO {
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
  files?: LabFileDTO[];
  notes?: string; 
}
