import { EncounterEntity } from "../../domain/entities/encounter.entity";
import { IEncounterRepository } from "../../domain/repositories/encounter.repository.interface";

export class GetPatientEncountersUseCase {
  constructor(private readonly encounterRepository: IEncounterRepository) {}

  public async execute(patientId: string): Promise<EncounterEntity[]> {
    if (!patientId) throw new Error("El patientId es requerido.");
    return await this.encounterRepository.findByPatientId(patientId);
  }
}