import { EncounterProps, EncounterEntity } from "../../domain/entities/encounter.entity";
import { IEncounterRepository } from "../../domain/repositories/encounter.repository.interface";

export class CreateEncounterUseCase {
  constructor(private readonly encounterRepository: IEncounterRepository) {}

  public async execute(data: EncounterProps): Promise<EncounterEntity> {
    const encounter = EncounterEntity.create(data);
    return await this.encounterRepository.create(encounter);
  }
}