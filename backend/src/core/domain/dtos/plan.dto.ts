export interface CreatePlanDTO {
  name: string;
  description: string;
  isActive?: boolean;
  variants: {
    durationInMonths: number;
    price: number;
    monthlyVisitsIncluded: {
      service: string;
      visits: number;
    }[];
  }[];
}

export interface UpdatePlanDTO {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
  variants: {
    durationInMonths: number;
    price: number;
    monthlyVisitsIncluded: {
      service: string;
      visits: number;
    }[];
  }[];
}
