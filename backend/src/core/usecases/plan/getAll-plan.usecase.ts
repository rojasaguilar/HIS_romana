import { IPlanRepository } from '../../domain/repositories/plan.repository.interface';
import { PlanEntity } from '../../domain/entities/plan.entity';

export class FindAllPlansUseCase {
  constructor(private readonly planRepo: IPlanRepository) {}

  async execute(): Promise<PlanEntity[]> {
    return this.planRepo.findAll();
  }
}