import { CreatePlanDTO } from '../../domain/dtos/plan.dto';
import { PlanEntity } from '../../domain/entities/plan.entity';
import { IPlanRepository } from '../../domain/repositories/plan.repository.interface';
import { IServicesRepository } from '../../domain/repositories/services.repository.interface';
import { PlanDescription } from '../../domain/value-objects/planDescription.vo';

export class CreatePlanUseCase {
  constructor(
    private readonly planRepo: IPlanRepository,
    private readonly serviceRepo: IServicesRepository,
  ) {}

  async execute(dto: CreatePlanDTO): Promise<PlanEntity> {
    const existing = await this.planRepo.findByName(dto.name);
    if (existing) {
      throw new Error('Ya existe un plan con ese nombre');
    }

    //validar duplicados POR VARIANT
    for (const variant of dto.variants) {
      const serviceIds = variant.monthlyVisitsIncluded.map((s) => s.serviceId);

      const unique = new Set(serviceIds);

      if (unique.size !== serviceIds.length) {
        throw new Error(
          `Servicios duplicados en duration ${variant.durationInMonths}`,
        );
      }
    }

    //juntar todos para validar existencia
    const allServiceIds = dto.variants.flatMap((v) =>
      v.monthlyVisitsIncluded.map((s) => s.serviceId),
    );

    const uniqueIds = [...new Set(allServiceIds)];

    const servicesFound = await this.serviceRepo.findByIds(uniqueIds);

    if (servicesFound.length !== uniqueIds.length) {
      const foundIds = new Set(servicesFound.map((s) => s.id));

      const missing = uniqueIds.filter((id) => !foundIds.has(id));

      throw new Error(`Servicios no encontrados: ${missing.join(', ')}`);
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
