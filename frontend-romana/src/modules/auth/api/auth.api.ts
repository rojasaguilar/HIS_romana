import { api } from "@/shared/lib/axios";

import type {
  LoginDTO,
  LoginResponse,
  MeResponse,
} from "../types/auth.types";

export const loginRequest = async (
  data: LoginDTO
): Promise<LoginResponse> => {
  const response = await api.post(
    "/auth/login",
    data
  );

  return response.data;
};

export const refreshTokenRequest =
  async (): Promise<{
    accessToken: string;
  }> => {
    const response = await api.post(
      "/auth/refresh"
    );

    return response.data;
  };

export const logoutRequest =
  async (): Promise<void> => {
    await api.post("/auth/logout");
  };

export const meRequest =
  async (): Promise<MeResponse> => {
    const response =
      await api.get("/auth/me");

    return response.data;
  };