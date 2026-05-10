import { api } from "@/shared/lib/axios";

import type {
  CreateSubscriptionDTO,
} from "../types/subscription.types";

export const createSubscriptionRequest =
  async (
    data: CreateSubscriptionDTO,
  ) => {
    const response =
      await api.post(
        "/subscriptions",
        data,
      );

    return response.data;
  };

export const getSubscriptionsRequest =
  async () => {
    const response =
      await api.get(
        "/subscriptions",
      );

    return response.data;
  };