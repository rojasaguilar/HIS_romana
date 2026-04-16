import { MedicEntity } from './medic.entity';

export class ServiceEntity {
  constructor(
    public name: string,
    public duration: number,
    public cost: number,
    public specialityId: string,
    public readonly id?: string,
  ) {}

  public canBePerformedByMedic(medic: MedicEntity): boolean {
    return medic.hasSpeciality(this.specialityId);
  }
}
