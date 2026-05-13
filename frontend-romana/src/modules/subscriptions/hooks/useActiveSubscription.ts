// modules/subscriptions/hooks/useActiveSubscription.ts

import { useQuery } from "@tanstack/react-query";

import { getActiveSubscriptionRequest } from "../api/subscriptions.api";
import type { ActiveSubscription } from "../types/subscription.types";

export const useActiveSubscription = (patientId?: string) => {
  return useQuery<ActiveSubscription>({
    queryKey: ["active-subscription", patientId],

    enabled: !!patientId,

    queryFn: async () => {
      try {
        return await getActiveSubscriptionRequest(patientId!);
      } catch (error: any) {
        if (error.response?.status === 404) {
          return null;
        }

        throw error;
      }
    },
  });
};
