import { SystemAccount } from '../../../../core/domain/entities/systemAccout.entity';
import { ISystemAccountRepository } from '../../../../core/domain/repositories/systemAccount.repository.interface';
import systemAccountModel from '../models/systemAccount.model';

export class SystemAccountRepository implements ISystemAccountRepository {
  async save(account: SystemAccount): Promise<SystemAccount> {
    const savedAccount = await systemAccountModel.create({
      userId: account.getUserId(),
      email: account.email,
      roles: account.roles,
      password: account.getPassword(),
      profileType: account.getProfileType(),
    });

    return new SystemAccount(
      savedAccount.userId,
      savedAccount.email,
      savedAccount.roles,
      savedAccount.password,
      savedAccount.profileType,
      savedAccount.isActive,
    );
    
  }
  findById(id: string): Promise<SystemAccount | null> {
    throw new Error('Method not implemented.');
  }
  findByEmail(email: string): Promise<SystemAccount | null> {
    throw new Error('Method not implemented.');
  }
  getAll(): Promise<SystemAccount[]> {
    throw new Error('Method not implemented.');
  }
}
