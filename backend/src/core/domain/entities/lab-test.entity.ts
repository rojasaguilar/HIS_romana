import { CategoriaEstudiosLab } from '../types/lab-test.categories.type';

export type LabTestStatus =
  | 'PENDING'
  | 'IN_PROGRESS'
  | 'COMPLETED'
  | 'CANCELLED';

export interface LabFile {
  url: string;
  name: string;
  uploadedAt: Date;
}

export interface LabTestProps {
  patientId: string;
  orderedBy: string;
  category: CategoriaEstudiosLab;
  testName: string;
  status?: LabTestStatus; 
  encounterId?: string | null;
  instructions?: string | null;
  notes?: string | null;
  files?: LabFile[];
  completedAt?: Date | null;
  createdAt?: Date;
  updatedAt?: Date;
  id?: string;
}

export class LabTestEntity {
  private constructor(
    public readonly patientId: string,
    public readonly orderedBy: string,
    public readonly category: CategoriaEstudiosLab,
    public readonly testName: string,
    public status: LabTestStatus,
    public readonly encounterId: string | null,
    public instructions: string | null,
    public notes: string | null,
    public files: LabFile[],
    public completedAt: Date | null,
    public readonly createdAt?: Date,
    public updatedAt?: Date,
    public readonly id?: string,
  ) {}

  public static create(props: LabTestProps): LabTestEntity {
    return new LabTestEntity(
      props.patientId,
      props.orderedBy,
      props.category,
      props.testName,
      props.status || 'PENDING',
      props.encounterId || null,
      props.instructions || null,
      props.notes || null,
      props.files || [],
      props.completedAt || null,
      props.createdAt,
      props.updatedAt,
      props.id,
    );
  }


  public markAsInProgress(): void {
    if (this.status === 'CANCELLED') {
      throw new Error('No se puede procesar un estudio cancelado.');
    }
    this.status = 'IN_PROGRESS';
    this.updatedAt = new Date();
  }

  public completeTest(files: LabFile[], notes?: string): void {
    if (this.status === 'CANCELLED') {
      throw new Error('No se puede completar un estudio que fue cancelado.');
    }
    if (!files || files.length === 0) {
      throw new Error(
        'Se requiere al menos un archivo para completar el estudio.',
      );
    }

    this.status = 'COMPLETED';
    this.files = files;
    this.notes = notes || null;
    this.completedAt = new Date();
    this.updatedAt = new Date();
  }

  public cancelTest(): void {
    if (this.status === 'COMPLETED') {
      throw new Error('El estudio ya fue completado y no se puede cancelar.');
    }
    this.status = 'CANCELLED';
    this.updatedAt = new Date();
  }
}
