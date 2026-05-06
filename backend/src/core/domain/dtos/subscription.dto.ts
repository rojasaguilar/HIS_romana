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
  durationInMonths: number;
  price: number;
  startDate: Date;
  monthlyVisitsIncluded: {
    serviceId: string;
    visits: number;
  }[];
}
