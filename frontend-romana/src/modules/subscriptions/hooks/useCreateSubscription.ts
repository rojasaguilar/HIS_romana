import { useMutation } from "@tanstack/react-query";

import { createSubscriptionRequest } from "../api/subscriptions.api";

export const useCreateSubscription =
  () => {
    return useMutation({
      mutationFn:
        createSubscriptionRequest,
    });
  };