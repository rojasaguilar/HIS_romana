import { BillingInconsistentError } from '../errors/billing.error';
import { Billing } from '../types/billing.type';

export class BillingVO {
  private constructor(
    public readonly source: 'DIRECT' | 'PROMOTION' | 'SUBSCRIPTION',
    public readonly promotionId?: string,
    public readonly subscriptionId?: string,
  ) {}

  static create(data: Billing) {
    switch (data.source) {
      case 'DIRECT':
        return new BillingVO('DIRECT', undefined, undefined);

      case 'SUBSCRIPTION':
        if (!data.subscriptionId)
          throw new BillingInconsistentError(
            `subscriptionId required when billing type is SUBSCRIPTION`,
          );
        return new BillingVO('SUBSCRIPTION', undefined, data.subscriptionId);

      case 'PROMOTION':
        if (!data.promotionId)
          throw new BillingInconsistentError(
            `promotionId required when billing type is PROMOTION`,
          );
        return new BillingVO('PROMOTION', data.promotionId, undefined);

      default:
        throw new BillingInconsistentError('Invalid billing type');
    }
  }
}
