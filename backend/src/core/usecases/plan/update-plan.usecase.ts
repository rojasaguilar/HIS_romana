import { IPlanRepository } from '../../domain/repositories/plan.repository.interface';
import { PlanEntity } from '../../domain/entities/plan.entity';
import { PlanDescription } from '../../domain/value-objects/planDescription.vo';
import { UpdatePlanDTO } from '../../domain/dtos/plan.dto';

export class UpdatePlanUseCase {
  constructor(private readonly planRepo: IPlanRepository) {}

  async execute(dto: UpdatePlanDTO): Promise<PlanEntity> {
    const existing = await this.planRepo.findById(dto.id);

    if (!existing) {
      throw new Error('Plan no encontrado');
    }

    const variants = dto.variants.map(
      (v) =>
        new PlanDescription(
          v.durationInMonths,
          v.price,
          v.monthlyVisitsIncluded,
        ),
    );

    const updatedPlan = new PlanEntity(
      dto.name,
      variants,
      dto.description,
      dto.isActive,
    );

    const result = await this.planRepo.update(dto.id, updatedPlan);

    if (!result) {
      throw new Error('Error al actualizar el plan');
    }

    return result;
  }
}
