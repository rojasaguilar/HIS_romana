export interface MonthlyVisit {
  serviceId: string;

  visits: number;
}

export interface PlanVariant {
  durationInMonths: number;

  price: number;

  monthlyVisitsIncluded:
    MonthlyVisit[];
}

export interface Plan {
  id: string;

  name: string;

  description: string;

  isActive: boolean;

  variants: PlanVariant[];
}