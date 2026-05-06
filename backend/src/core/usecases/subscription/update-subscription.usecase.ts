import { ISubscriptionRepository } from '../../domain/repositories/subscription.repository.interface';
import { SubscriptionEntity } from '../../domain/entities/subscription.entity';
import { IServicesRepository } from '../../domain/repositories/services.repository.interface';
import { UpdateSubscriptionDTO } from '../../domain/dtos/subscription.dto';

export class UpdateSubscriptionUseCase {
  constructor(
    private subscriptionRepo: ISubscriptionRepository,
    private serviceRepo: IServicesRepository,
  ) {}

  async execute(dto: UpdateSubscriptionDTO): Promise<SubscriptionEntity> {
    const existing = await this.subscriptionRepo.findById(dto.id);

    if (!existing) {
      throw new Error('Suscripción no encontrada');
    }

    // 🔥 validar servicios si cambiaron
    for (const service of dto.monthlyVisitsIncluded) {
      const exists = await this.serviceRepo.findById(service.serviceId);
      if (!exists) {
        throw new Error(`Servicio inválido: ${service.serviceId}`);
      }
    }

    const startDate = new Date(dto.startDate);
    const endDate = new Date(startDate);
    endDate.setMonth(endDate.getMonth() + dto.durationInMonths);

    const updated = new SubscriptionEntity(
      dto.patientId,
      dto.planId,
      dto.durationInMonths,
      dto.price,
      startDate,
      endDate,
      dto.monthlyVisitsIncluded,
      existing.visitsUsed, // 🔥 no pierdes historial
      dto.status,
    );

    const result = await this.subscriptionRepo.update(dto.id, updated);

    if (!result) {
      throw new Error('Error al actualizar la suscripción');
    }

    return result;
  }
}
