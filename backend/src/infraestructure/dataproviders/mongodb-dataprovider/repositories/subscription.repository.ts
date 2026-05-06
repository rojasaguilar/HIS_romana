import { SubscriptionEntity } from '../../../../core/domain/entities/subscription.entity';
import { ISubscriptionRepository } from '../../../../core/domain/repositories/subscription.repository.interface';
import { SubscriptionMapper } from '../mappers/subscription.mapper';
import { SubscriptionModel } from '../models/subscription.model';

export class SubscriptionRepository implements ISubscriptionRepository {
  async create(
    subscription: SubscriptionEntity,
  ): Promise<SubscriptionEntity> {
    const data = SubscriptionMapper.toPersistence(subscription);

    const created = await SubscriptionModel.create(data);

    return SubscriptionMapper.toDomain(created);
  }

  async findById(id: string): Promise<SubscriptionEntity | null> {
    const doc = await SubscriptionModel.findById(id);
    return doc ? SubscriptionMapper.toDomain(doc) : null;
  }

  async findByPatientId(patientId: string): Promise<SubscriptionEntity[]> {
    const docs = await SubscriptionModel.find({ patientId });
    return docs.map(SubscriptionMapper.toDomain);
  }

  async findActiveByPatientId(
    patientId: string,
  ): Promise<SubscriptionEntity | null> {
    const doc = await SubscriptionModel.findOne({
      patientId,
      status: 'active',
      endDate: { $gte: new Date() }, // 🔥 evita traer expiradas
    });

    return doc ? SubscriptionMapper.toDomain(doc) : null;
  }

  async findAll(): Promise<SubscriptionEntity[]> {
    const docs = await SubscriptionModel.find();
    return docs.map(SubscriptionMapper.toDomain);
  }

  async update(
    id: string,
    subscription: SubscriptionEntity,
  ): Promise<SubscriptionEntity | null> {
    const data = SubscriptionMapper.toPersistence(subscription);

    const updated = await SubscriptionModel.findByIdAndUpdate(id, data, {
      new: true,
    });

    return updated ? SubscriptionMapper.toDomain(updated) : null;
  }

  async cancel(id: string): Promise<void> {
    await SubscriptionModel.findByIdAndUpdate(id, {
      status: 'cancelled',
    });
  }

  async expire(id: string): Promise<void> {
    await SubscriptionModel.findByIdAndUpdate(id, {
      status: 'expired',
    });
  }

  async delete(id: string): Promise<void> {
    await SubscriptionModel.findByIdAndDelete(id);
  }
}