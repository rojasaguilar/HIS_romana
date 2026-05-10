import type {
  MonthlyVisits,
} from "../types/subscription.types";

export interface CreateSubscriptionDTO {
  patientId: string;

  planId: string;

  durationInMonths: number;

  price: number;

  startDate: string;

  monthlyVisitsIncluded:
    MonthlyVisits[];
}