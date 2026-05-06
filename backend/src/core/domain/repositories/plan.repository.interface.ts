import { PlanEntity } from './../entities/plan.entity';

export interface IPlanRepository {
  create(plan: PlanEntity): Promise<PlanEntity>;

  findById(id: string): Promise<PlanEntity | null>;

  findAll(): Promise<PlanEntity[]>;

  findActive(): Promise<PlanEntity[]>;

  findByName(name: string): Promise<PlanEntity | null>;

  update(id: string, plan: PlanEntity): Promise<PlanEntity | null>;

  activate(id: string): Promise<void>;

  deactivate(id: string): Promise<void>;

  delete(id: string): Promise<void>;
}
