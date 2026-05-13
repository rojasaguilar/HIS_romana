import { ClientSession } from 'mongoose';
import { SystemAccount } from '../../../../core/domain/entities/systemAccout.entity';
import { ISystemAccountRepository } from '../../../../core/domain/repositories/systemAccount.repository.interface';
import systemAccountModel from '../models/systemAccount.model';

export class SystemAccountRepository implements ISystemAccountRepository {
  async save(
    account: SystemAccount,
    session?: ClientSession,
  ): Promise<SystemAccount> {
    const savedAccount = await systemAccountModel.create(
      [
        {
          userId: account.getUserId(),
          email: account.email,
          roles: account.roles,
          password: account.getPassword(),
          profileType: account.getProfileType(),
        },
      ],
      { session },
    );

    return new SystemAccount(
      savedAccount[0].userId,
      savedAccount[0].email,
      savedAccount[0].roles,
      savedAccount[0].password,
      savedAccount[0].profileType,
      savedAccount[0].isActive,
    );
  }
  findById(id: string): Promise<SystemAccount | null> {
    throw new Error('Method not implemented.');
  }

  async findByEmail(email: string): Promise<SystemAccount | null> {
    const accountDoc = await systemAccountModel.findOne({ email });

    if (!accountDoc) return null;

    return new SystemAccount(
      accountDoc.userId,
      accountDoc.email,
      accountDoc.roles,
      accountDoc.password,
      accountDoc.profileType,
      accountDoc.isActive,
    );
  }
  getAll(): Promise<SystemAccount[]> {
    throw new Error('Method not implemented.');
  }
}
