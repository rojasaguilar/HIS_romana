import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { getPlanByIdRequest, getPlansRequest, updatePlanRequest } from "../api/plans.api";

export const usePlans = () => {
  return useQuery({
    queryKey: ["plans"],

    queryFn:
      getPlansRequest,
  });
};

export const usePlanDetails = (id: string) => {
  return useQuery({
    queryKey: ["plans", id],
    queryFn: () => getPlanByIdRequest(id),
    enabled: !!id,
  });
};

export const useUpdatePlan = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => updatePlanRequest(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["plans", variables.id] });
      queryClient.invalidateQueries({ queryKey: ["plans"] });
    },
  });
};