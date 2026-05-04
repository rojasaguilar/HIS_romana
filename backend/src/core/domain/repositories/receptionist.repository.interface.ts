import { ReceptionistEntity } from '../entities/receptionist.entity';

export interface IReceptionistRepository {
  save(recepcionist: ReceptionistEntity): Promise<ReceptionistEntity>;

  findById(id: string): Promise<ReceptionistEntity | null>;

  getAll(): Promise<ReceptionistEntity[]>;
}
