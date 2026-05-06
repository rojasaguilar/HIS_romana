import { ISubscriptionRepository } from '../../domain/repositories/subscription.repository.interface';
import { SubscriptionEntity } from '../../domain/entities/subscription.entity';

export class FindSubscriptionByIdUseCase {
  constructor(private subscriptionRepo: ISubscriptionRepository) {}

  async execute(id: string): Promise<SubscriptionEntity> {
    const subscription = await this.subscriptionRepo.findById(id);

    if (!subscription) {
      throw new Error('Suscripción no encontrada');
    }

    return subscription;
  }
}
