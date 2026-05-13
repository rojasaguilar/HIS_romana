import { api } from "@/shared/lib/axios";

import type { CreateSubscriptionDTO } from "./../dtos/create-subscription.dto";

export const createSubscriptionRequest = async (
  data: CreateSubscriptionDTO,
) => {
  const response = await api.post("/subscriptions", data);

  return response.data;
};

export const getSubscriptionsRequest = async () => {
  const response = await api.get("/subscriptions");

  return response.data;
};

export const getActiveSubscriptionRequest = async (patientId: string) => {
  const response = await api.get(`/subscriptions/patient/${patientId}/active`);

  return response.data;
};
