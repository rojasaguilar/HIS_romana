export interface Subscription {
  id: string;

  patientId: string;

  planId: string;

  durationInMonths: number;

  price: number;

  startDate: string;

  endDate: string;

  status: string;
}

export interface CreateSubscriptionDTO {
  patientId: string;

  planId: string;

  variantId: string;

  startDate: string;
}