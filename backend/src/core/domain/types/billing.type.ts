export type Billing =
  | { source: 'DIRECT' }
  | { source: 'SUBSCRIPTION'; subscriptionId: string }
  | { source: 'PROMOTION'; promotionId: string };
