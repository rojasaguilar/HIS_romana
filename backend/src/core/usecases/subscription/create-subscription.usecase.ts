import { SubscriptionEntity } from '../../domain/entities/subscription.entity';

import { ISubscriptionRepository } from '../../domain/repositories/subscription.repository.interface';

import { IServicesRepository } from '../../domain/repositories/services.repository.interface';

import { IPlanRepository } from '../../domain/repositories/plan.repository.interface';

import { CreateSubscriptionDTO } from '../../domain/dtos/subscription.dto';

export class CreateSubscriptionUseCase {
  constructor(
    private subscriptionRepo: ISubscriptionRepository,

    private serviceRepo: IServicesRepository,

    private planRepo: IPlanRepository,
  ) {}

  async execute(dto: CreateSubscriptionDTO): Promise<SubscriptionEntity> {
    /**
     * VALIDAR SI YA TIENE SUSCRIPCIÓN ACTIVA
     */
    const active = await this.subscriptionRepo.findActiveByPatientId(
      dto.patientId,
    );

    if (active) {
      throw new Error('El paciente ya tiene una suscripción activa');
    }

    /**
     * OBTENER PLAN
     */
    const plan = await this.planRepo.findById(dto.planId);

    if (!plan) {
      throw new Error('Plan no encontrado');
    }

    /**
     * BUSCAR VARIANTE
     */
    console.log(plan.getVariants());

    const variant = plan
      .getVariants()
      .find((variant) => variant.id === dto.variantId);

    if (!variant) {
      throw new Error('Variante no encontrada');
    }

    /**
     * VALIDAR SERVICIOS
     */
    for (const service of variant.monthlyVisitsIncluded) {
      const exists = await this.serviceRepo.findById(service.serviceId);

      if (!exists) {
        throw new Error(`Servicio inválido: ${service.serviceId}`);
      }
    }

    /**
     * CALCULAR FECHAS
     */
    const startDate = new Date();

    const endDate = new Date(startDate);

    endDate.setMonth(endDate.getMonth() + variant.durationInMonths);

    /**
     * CREAR SUBSCRIPTION
     */
    const subscription = new SubscriptionEntity(
      dto.patientId,

      dto.planId,

      variant.durationInMonths,

      variant.price,

      startDate,

      endDate,

      variant.monthlyVisitsIncluded,

      [],

      'active',
    );

    return this.subscriptionRepo.create(subscription);
  }
}
