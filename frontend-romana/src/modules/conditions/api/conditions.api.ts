import { api } from "@/shared/lib/axios";
import type { Condition } from "../types/condition.type";


export const getConditionsRequest = async (): Promise<Condition[]> => {
  const response = await api.get("/conditions");

  return response.data;
};

export const getConditionByIdRequest = async (
  conditionId: string,
): Promise<Condition> => {
  const response = await api.get(`/conditions/${conditionId}`);

  return response.data;
};

// export const createConditionRequest = async (
//   data: CreateConditionDTO,
// ): Promise<Condition> => {
//   const response = await api.post("/conditions", data);

//   return response.data;
// };

// export const updateConditionRequest = async (
//   conditionId: string,
//   data: UpdateConditionDTO,
// ): Promise<Condition> => {
//   const response = await api.patch(
//     `/conditions/${conditionId}`,
//     data,
//   );

//   return response.data;
// };

// export const deleteConditionRequest = async (
//   conditionId: string,
// ): Promise<void> => {
//   await api.delete(`/conditions/${conditionId}`);
// };
