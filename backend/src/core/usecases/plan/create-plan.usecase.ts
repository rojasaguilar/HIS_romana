import { CreatePlanDTO } from '../../domain/dtos/plan.dto';
import { PlanEntity } from '../../domain/entities/plan.entity';
import { IPlanRepository } from '../../domain/repositories/plan.repository.interface';
import { PlanDescription } from '../../domain/value-objects/planDescription.vo';

export class CreatePlanUseCase {
  constructor(private readonly planRepo: IPlanRepository) {}

  async execute(dto: CreatePlanDTO): Promise<PlanEntity> {
    const existing = await this.planRepo.findByName(dto.name);
    if (existing) {
      throw new Error('Ya existe un plan con ese nombre');
    }

    const variants = dto.variants.map(
      (v) =>
        new PlanDescription(
          v.durationInMonths,
          v.price,
          v.monthlyVisitsIncluded,
        ),
    );

    const plan = new PlanEntity(
      dto.name,
      variants,
      dto.description,
      dto.isActive ?? true,
    );

    return this.planRepo.create(plan);
  }
}
