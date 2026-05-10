import { api } from "@/shared/lib/axios";

import type {
  Subscription,
} from "../types/subscription.types";

import type {
  CreateSubscriptionDTO,
} from "../dtos/create-subscription.dto";

export const getSubscriptionsRequest =
  async (): Promise<
    Subscription[]
  > => {
    const response =
      await api.get(
        "/subscriptions"
      );

    return response.data;
  };

export const createSubscriptionRequest =
  async (
    data: CreateSubscriptionDTO
  ): Promise<Subscription> => {
    const response =
      await api.post(
        "/subscriptions",
        data
      );

    return response.data;
  };