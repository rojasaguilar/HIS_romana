export type Billing =
  | { source: 'DIRECT' }
  | { source: 'SUBSCRIPTION'; suscriptionId: string }
  | { source: 'PROMOTION'; promotionId: string };
