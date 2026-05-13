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

export interface ActiveSubscription {
  id: string;

  patientId: string;

  planId: string;

  status: string;

  monthlyVisitsIncluded: {
    serviceId: string;

    serviceName: string;

    allowed: number;

    used: number;

    remaining: number;
  }[];
}