export type SubscriptionStatus =
  | "active"
  | "expired"
  | "cancelled";

export interface MonthlyVisits {
  serviceId: string;

  visits: number;
}

export interface VisitUsage {
  serviceId: string;

  used: number;
}

export interface Subscription {
  id: string;

  patientId: string;

  planId: string;

  durationInMonths: number;

  price: number;

  startDate: string;

  endDate: string;

  monthlyVisitsIncluded:
    MonthlyVisits[];

  visitsUsed: VisitUsage[];

  status: SubscriptionStatus;
}