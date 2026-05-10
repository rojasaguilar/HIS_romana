import { useQuery } from "@tanstack/react-query";

import { getSubscriptionsRequest } from "../api/subscriptions.api";

export const useSubscriptions =
  () => {
    return useQuery({
      queryKey: [
        "subscriptions",
      ],

      queryFn:
        getSubscriptionsRequest,
    });
  };