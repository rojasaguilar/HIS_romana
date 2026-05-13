import { ClientSession } from 'mongoose';
import { SystemAccount } from '../entities/systemAccout.entity';

export interface ISystemAccountRepository {
  save(
  entity: SystemAccount,
  session?: ClientSession,
): Promise<SystemAccount>;

  findById(id: string): Promise<SystemAccount | null>;

  findByEmail(email: string): Promise<SystemAccount | null>;

  getAll(): Promise<SystemAccount[]>;
}
