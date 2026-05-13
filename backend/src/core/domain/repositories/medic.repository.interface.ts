import { MedicEntity } from '../entities/medic.entity';
import { ClientSession } from 'mongoose';

export interface IMedicRepository {
  save(medic: MedicEntity, session?: ClientSession): Promise<MedicEntity>;

  findById(id: string): Promise<MedicEntity | null>;

  getAll(): Promise<MedicEntity[]>;
}
