import { PlanEntity } from '../../../../core/domain/entities/plan.entity';
import { IPlanRepository } from '../../../../core/domain/repositories/plan.repository.interface';
import { PlanMapper } from '../mappers/plan.mapper';
import { PlanModel } from '../models/plan.model';

export class PlanRepository implements IPlanRepository {
  async create(plan: PlanEntity): Promise<PlanEntity> {
    const data = PlanMapper.toPersistence(plan);
    const created = await PlanModel.create(data);
    return PlanMapper.toDomain(created);
  }

  async findById(id: string): Promise<PlanEntity | null> {
    const doc = await PlanModel.findById(id);
    return doc ? PlanMapper.toDomain(doc) : null;
  }

  async findAll(): Promise<PlanEntity[]> {
    const docs = await PlanModel.find();
    return docs.map(PlanMapper.toDomain);
  }

  async findActive(): Promise<PlanEntity[]> {
    const docs = await PlanModel.find({ isActive: true });
    return docs.map(PlanMapper.toDomain);
  }

  async findByName(name: string): Promise<PlanEntity | null> {
    const doc = await PlanModel.findOne({ name });
    return doc ? PlanMapper.toDomain(doc) : null;
  }

  async update(id: string, plan: PlanEntity): Promise<PlanEntity | null> {
    const data = PlanMapper.toPersistence(plan);

    const updated = await PlanModel.findByIdAndUpdate(id, data, {
      new: true,
    });

    return updated ? PlanMapper.toDomain(updated) : null;
  }

  async activate(id: string): Promise<void> {
    await PlanModel.findByIdAndUpdate(id, { isActive: true });
  }

  async deactivate(id: string): Promise<void> {
    await PlanModel.findByIdAndUpdate(id, { isActive: false });
  }

  async delete(id: string): Promise<void> {
    await PlanModel.findByIdAndDelete(id);
  }
}
