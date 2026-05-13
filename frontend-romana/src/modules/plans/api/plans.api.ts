import { api } from "@/shared/lib/axios";

import type { Plan } from "../types/plan.types";

import type { CreatePlanDTO } from "../dtos/create-plan.dto";
import { planMapper } from "../mappers/plan.mapper";

export const getPlansRequest = async (): Promise<Plan[]> => {
  const response = await api.get("/plans");

  return response.data.map(planMapper);
};

export const createPlanRequest = async (data: CreatePlanDTO): Promise<Plan> => {
  const response = await api.post("/plans", data);

  return response.data.map(planMapper);
};

export const getPlanByIdRequest = async (id: string): Promise<Plan> => {
  const response = await api.get(`/plans/${id}`);
  console.log("respuesta", planMapper(response.data));

  return planMapper(response.data);
  // return response.data.map();
  // return response.data.map(planMapper);
};

/**
 * Actualiza un plan existente.
 * Recibe el ID y el DTO con los cambios (usualmente Partial<Plan>)
 */
export const updatePlanRequest = async (
  id: string,
  data: Partial<Plan>,
): Promise<Plan> => {
  const response = await api.patch(`/plans/${id}`, data);

  return response.data.map(planMapper);
};
