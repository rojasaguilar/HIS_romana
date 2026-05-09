import { useQuery } from "@tanstack/react-query";

import { getServicesRequest } from "../api/services.api";

export const useServices =
  () => {
    return useQuery({
      queryKey: ["services"],

      queryFn:
        getServicesRequest,
    });
  };