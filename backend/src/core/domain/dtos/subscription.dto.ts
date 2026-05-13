export interface UpdateSubscriptionDTO {
  id: string;
  patientId: string;
  planId: string;
  durationInMonths: number;
  price: number;
  startDate: Date;
  monthlyVisitsIncluded: {
    serviceId: string;
    visits: number;
  }[];
  status: 'active' | 'cancelled' | 'expired';
}

export interface CreateSubscriptionDTO {
  patientId: string;

  planId: string;

  variantId: string;

  startDate: Date;
}

export interface ActiveSubscriptionResponseDTO {
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
