import { BillingInconsistentError } from '../errors/billing.error';
import { Billing } from '../types/billing.type';

export class BillingVO {
  private constructor(
    public readonly source: 'DIRECT' | 'PROMOTION' | 'SUBSCRIPTION',
    private readonly promotionId?: string,
    private readonly subscriptionId?: string,
  ) {
    this.validate();
  }

  private validate() {
    switch (this.source) {
      case 'DIRECT':
        if (this.subscriptionId || this.promotionId)
          throw new BillingInconsistentError(
            `When billing type is DIRECT, there can not be either subscriptionId or promotionId `,
          );
        break;
      case 'SUBSCRIPTION':
        if (!this.subscriptionId)
          throw new BillingInconsistentError(
            `subscriptionId required when billing type is SUBSCRIPTION`,
          );

        if (this.promotionId)
          throw new BillingInconsistentError(
            `When billing type is SUBSCRIPTION there can not be a promotionId`,
          );
        break;
      case 'PROMOTION':
        if (!this.promotionId)
          throw new BillingInconsistentError(
            `promotionId required when billing type is PROMOTION`,
          );

        if (this.subscriptionId)
          throw new BillingInconsistentError(
            `When billing type is PROMOTION there can not be a subscriptionId`,
          );
        break;
      default:
        throw new BillingInconsistentError('Invalid billing type');
    }
  }

  getPromotionId(): string | undefined {
    return this.source === 'PROMOTION' ? this.promotionId : undefined;
  }

  getSubscriptionId(): string | undefined {
    return this.source === 'SUBSCRIPTION' ? this.subscriptionId : undefined;
  }

//   static create(billingType: Billing):BillingVO{
// switch(billingType){
// case: ''
// }

//   }

  static createFromDirect(): BillingVO {
    return new BillingVO('DIRECT');
  }

  static createFromSubscription(subscriptionId: string): BillingVO {
    return new BillingVO('SUBSCRIPTION', undefined, subscriptionId);
  }

  static createFromPromotion(promotionId: string): BillingVO {
    return new BillingVO('PROMOTION', promotionId);
  }
}
