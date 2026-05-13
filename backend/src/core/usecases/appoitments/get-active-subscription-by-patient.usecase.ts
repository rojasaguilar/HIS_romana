import { ISubscriptionRepository } from '../../domain/repositories/subscription.repository.interface';

import { IServicesRepository } from '../../domain/repositories/services.repository.interface';
import { ActiveSubscriptionResponseDTO } from '../../domain/dtos/subscription.dto';

export class GetActiveSubscriptionByPatientUseCase {
  constructor(
    private readonly subscriptionRepository: ISubscriptionRepository,

    private readonly serviceRepository: IServicesRepository,
  ) {}

  async execute(
    patientId: string,
  ): Promise<ActiveSubscriptionResponseDTO | null> {
    const subscription =
      await this.subscriptionRepository.findActiveByPatientId(patientId);

    if (!subscription) return null;

    const currentMonth = new Date().getMonth() + 1;

    // console.log(currentMonth);

    const currentYear = new Date().getFullYear();

    const visits = await Promise.all(
      subscription.monthlyVisitsIncluded.map(async (item) => {
        const service = await this.serviceRepository.findById(item.serviceId);

        const usage = subscription.visitsUsed.find(
          (v) =>
            v.serviceId === item.serviceId &&
            v.month === currentMonth &&
            v.year === currentYear,
        );

        const used = usage?.used ?? 0;

        return {
          serviceId: item.serviceId,

          serviceName: service?.name ?? 'Servicio',

          allowed: item.visits,

          used,

          remaining: item.visits - used,
        };
      }),
    );

    return {
      id: subscription.id ?? '',

      patientId: subscription.patientId,

      planId: subscription.planId,

      status: subscription.status,

      monthlyVisitsIncluded: visits,
    };
  }
}
