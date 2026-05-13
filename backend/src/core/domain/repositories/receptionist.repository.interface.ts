import { ReceptionistEntity } from '../entities/receptionist.entity';
import { ClientSession } from 'mongoose';

export interface IReceptionistRepository {
  save(
  entity: ReceptionistEntity,
  session?: ClientSession,
): Promise<ReceptionistEntity>;

  findById(id: string): Promise<ReceptionistEntity | null>;

  getAll(): Promise<ReceptionistEntity[]>;
}
