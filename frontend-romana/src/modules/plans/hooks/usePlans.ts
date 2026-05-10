import { useQuery } from "@tanstack/react-query";

import { getPlansRequest } from "../api/plans.api";

export const usePlans = () => {
  return useQuery({
    queryKey: ["plans"],

    queryFn:
      getPlansRequest,
  });
};