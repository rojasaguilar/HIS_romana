import { MedicEntity } from '../entities/medic.entity';

export interface IPatientRepository {
  save(medic: MedicEntity): Promise<MedicEntity>;

  findById(id: string): Promise<MedicEntity | null>;

  getAll(): Promise<MedicEntity[]>;
}
