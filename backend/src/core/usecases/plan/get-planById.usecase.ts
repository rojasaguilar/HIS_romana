import { PlanEntity } from '../../domain/entities/plan.entity';
import { IPlanRepository } from '../../domain/repositories/plan.repository.interface';

export class FindPlanByIdUseCase {
  constructor(private readonly planRepo: IPlanRepository) {}

  async execute(id: string): Promise<PlanEntity> {
    const plan = await this.planRepo.findById(id);

    if (!plan) {
      throw new Error('Plan no encontrado');
    }

    return plan;
  }
}
