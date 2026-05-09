import { useQuery } from "@tanstack/react-query";

import { getMedicsRequest } from "../api/medics.api";

export const useMedics = () => {
  return useQuery({
    queryKey: ["medics"],

    queryFn: getMedicsRequest,
  });
};