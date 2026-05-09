import { useQuery } from "@tanstack/react-query";

import { getSpecialitiesRequest } from "../api/specialities.api";

export const useSpecialities =
  () => {
    return useQuery({
      queryKey: [
        "specialities",
      ],

      queryFn:
        getSpecialitiesRequest,
    });
  };