import { useMutation } from "@tanstack/react-query";

import { createPlanRequest } from "../api/plans.api";

export const useCreatePlan =
  () => {
    return useMutation({
      mutationFn:
        createPlanRequest,
    });
  };