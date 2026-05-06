import { ISubscriptionRepository } from '../../domain/repositories/subscription.repository.interface';
import { SubscriptionEntity } from '../../domain/entities/subscription.entity';

export class FindAllSubscriptionsUseCase {
  constructor(private subscriptionRepo: ISubscriptionRepository) {}

  async execute(): Promise<SubscriptionEntity[]> {
    return this.subscriptionRepo.findAll();
  }
}
