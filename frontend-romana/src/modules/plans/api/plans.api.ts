import { api } from "@/shared/lib/axios";

import type {
  Plan,
} from "../types/plan.types";

import type {
  CreatePlanDTO,
} from "../dtos/create-plan.dto";
import { planMapper } from "../mappers/plan.mapper";

export const getPlansRequest =
  async (): Promise<
    Plan[]
  > => {
    const response =
      await api.get("/plans");

    return response.data.map(
      planMapper,
    );
  };

export const createPlanRequest =
  async (
    data: CreatePlanDTO
  ): Promise<Plan> => {
    const response =
      await api.post(
        "/plans",
        data
      );

     return response.data.map(
      planMapper,
    );
  };