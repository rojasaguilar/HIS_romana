import { ServiceInconsistentStateError } from '../errors/service.error';
import { ServiceModality } from '../types/service.type';
import { MedicEntity } from './medic.entity';

export class ServiceEntity {
  private constructor(
    public name: string,
    public duration: number,
    public cost: number,
    public modalities: ServiceModality[],
    public specialityId: string,
    public readonly id?: string,
  ) {}

  public static create(data: {
    name: string;
    duration: number;
    cost: number;
    modalities: ServiceModality[];
    specialityId: string;
    id?: string;
  }): ServiceEntity {
    if (!data.name || data.name.trim().length === 0) {
      throw new ServiceInconsistentStateError('Name is required');
    }

    if (data.duration <= 0) {
      throw new ServiceInconsistentStateError(
        'Duration must be greater than 0',
      );
    }

    if (data.cost < 0) {
      throw new ServiceInconsistentStateError('Cost cannot be negative');
    }

    if (!data.modalities || data.modalities.length === 0) {
      throw new ServiceInconsistentStateError(
        'At least one service type is required',
      );
    }

    return new ServiceEntity(
      data.name.trim(),
      data.duration,
      data.cost,
      data.modalities,
      data.specialityId,
      data.id,
    );
  }

  public canBePerformedByMedic(medic: MedicEntity): boolean {
    return medic.hasSpeciality(this.specialityId);
  }

  public containsModality(modality: ServiceModality): boolean {
    return this.modalities.includes(modality);
  }
}
