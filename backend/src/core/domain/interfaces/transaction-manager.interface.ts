import { ClientSession } from 'mongoose';

export interface ITransactionManager {
  runInTransaction<T>(
    callback: (
      session: ClientSession,
    ) => Promise<T>,
  ): Promise<T>;
}