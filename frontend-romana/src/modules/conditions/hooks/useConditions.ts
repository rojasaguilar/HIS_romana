import { useQuery } from "@tanstack/react-query";
import {
  getConditionsRequest,
  getConditionByIdRequest,
} from "../api/conditions.api";

// ==============================
// GET ALL CONDITIONS
// ==============================

export const useConditions = () => {
  return useQuery({
    queryKey: ["conditions"],

    queryFn: getConditionsRequest,
  });
};

// ==============================
// GET CONDITION BY ID
// ==============================

export const useCondition = (conditionId?: string) => {
  return useQuery({
    queryKey: ["condition", conditionId],

    queryFn: () => getConditionByIdRequest(conditionId!),

    enabled: !!conditionId,
  });
};
