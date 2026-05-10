import type { Plan } from "../types/plan.types";

export const planMapper = (data: any): Plan => {
  return {
    id: data.id,

    name: data._name,

    description: data._description,

    isActive: data._isActive,

    variants: data._variants.map((variant: any) => ({
      durationInMonths: variant._durationInMonths,

      price: variant._price,

      monthlyVisitsIncluded: variant._monthlyVisitsIncluded,
      id: variant.id,
    })),
  };
};
