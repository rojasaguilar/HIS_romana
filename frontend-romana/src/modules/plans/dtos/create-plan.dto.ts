import type {
  PlanVariant,
} from "../types/plan.types";

export interface CreatePlanDTO {
  name: string;

  description: string;

  isActive: boolean;

  variants: PlanVariant[];
}