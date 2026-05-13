import mongoose, {
  ClientSession,
} from 'mongoose';
import { ITransactionManager } from '../../../core/domain/interfaces/transaction-manager.interface';


export class MongooseTransactionManager
  implements ITransactionManager
{
  async runInTransaction<T>(
    callback: (
      session: ClientSession,
    ) => Promise<T>,
  ): Promise<T> {
    const session =
      await mongoose.startSession();

    session.startTransaction();

    try {
      const result =
        await callback(session);

      await session.commitTransaction();

      return result;
    } catch (error) {
      await session.abortTransaction();

      throw error;
    } finally {
      await session.endSession();
    }
  }
}