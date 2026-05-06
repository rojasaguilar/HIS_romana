import { ISubscriptionRepository } from '../../domain/repositories/subscription.repository.interface';
import { SubscriptionEntity } from '../../domain/entities/subscription.entity';
import { IServicesRepository } from '../../domain/repositories/services.repository.interface';
import { CreateSubscriptionDTO } from '../../domain/dtos/subscription.dto';

export class CreateSubscriptionUseCase {
  constructor(
    private subscriptionRepo: ISubscriptionRepository,
    private serviceRepo: IServicesRepository,
  ) {}

  async execute(dto: CreateSubscriptionDTO): Promise<SubscriptionEntity> {
    const active = await this.subscriptionRepo.findActiveByPatientId(
      dto.patientId,
    );
    if (active) {
      throw new Error('El paciente ya tiene una suscripción activa');
    }

    // 🔥 validar servicios existen
    for (const service of dto.monthlyVisitsIncluded) {
      const exists = await this.serviceRepo.findById(service.serviceId);
      if (!exists) {
        throw new Error(`Servicio inválido: ${service.serviceId}`);
      }
    }

    const startDate = new Date(dto.startDate);
    const endDate = new Date(startDate);
    endDate.setMonth(endDate.getMonth() + dto.durationInMonths);

    const subscription = new SubscriptionEntity(
      dto.patientId,
      dto.planId,
      dto.durationInMonths,
      dto.price,
      startDate,
      endDate,
      dto.monthlyVisitsIncluded,
      [],
      'active',
    );

    return this.subscriptionRepo.create(subscription);
  }
}
