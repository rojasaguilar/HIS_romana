import { EncounterEntity } from "../../domain/entities/encounter.entity";
import { IEncounterRepository } from "../../domain/repositories/encounter.repository.interface";

export class GetEncounterByAppointmentUseCase {
  constructor(private readonly encounterRepository: IEncounterRepository) {}

  public async execute(appointmentId: string): Promise<EncounterEntity | null> {
    if (!appointmentId) throw new Error("El appointmentId es requerido.");
    return await this.encounterRepository.findByAppointmentId(appointmentId);
  }
}