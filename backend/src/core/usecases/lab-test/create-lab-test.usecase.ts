import { LabTestEntity } from '../../domain/entities/lab-test.entity';
import { CreateLabTestDTO } from '../../domain/dtos/lab-test.dto';
import * as crypto from 'crypto'; // O uuid, para generar IDs puros en dominio
import { ILabTestRepository } from '../../domain/repositories/lab-test.respository.interface';

export class CreateLabTestUseCase {
  constructor(private readonly labTestRepository: ILabTestRepository) {}

  public async execute(data: CreateLabTestDTO): Promise<LabTestEntity> {
    console.log(data);
    // 1. Creamos la entidad pura con las reglas de negocio
    const newLabTest = LabTestEntity.create({
      id: crypto.randomUUID(), // El dominio genera su propio ID independiente de Mongo
      patientId: data.patientId,
      orderedBy: data.orderedBy,
      category: data.category,
      testName: data.testName,
      encounterId: data.encounterId,
      instructions: data.instructions,
    });

    // 2. Persistimos en la base de datos
    return await this.labTestRepository.create(newLabTest);
  }
}
