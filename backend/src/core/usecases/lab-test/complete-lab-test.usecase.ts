import { LabTestEntity, LabFile } from '../../domain/entities/lab-test.entity';
import { ILabTestRepository } from '../../domain/repositories/lab-test.respository.interface';

export interface CompleteLabTestRequest {
  labTestId: string;
  files: LabFile[];
  notes?: string;
}

export class CompleteLabTestUseCase {
  constructor(private readonly labTestRepository: ILabTestRepository) {}

  public async execute(data: CompleteLabTestRequest): Promise<LabTestEntity> {
    // 1. Buscamos la entidad existente
    const labTest = await this.labTestRepository.findById(data.labTestId);
    if (!labTest) {
      throw new Error('Estudio de laboratorio no encontrado.');
    }

    // 2. Ejecutamos la regla de negocio (esto valida estados y actualiza campos)
    labTest.completeTest(data.files, data.notes);

    // 3. Guardamos los cambios
    return await this.labTestRepository.update(labTest);
  }
}