import { SystemAccount } from '../entities/systemAccout.entity';

export interface ISystemAccountRepository {
  save(account: SystemAccount): Promise<SystemAccount>;

  findById(id: string): Promise<SystemAccount | null>;

  findByEmail(email: string): Promise<SystemAccount | null>;

  getAll(): Promise<SystemAccount[]>;
}
