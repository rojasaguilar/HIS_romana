import { api } from "@/shared/lib/axios";

import { useAuthStore } from "../store/auth.store";

import { refreshTokenRequest } from "../api/auth.api";

let isRefreshing = false;

let failedQueue: {
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
}[] = [];

const processQueue = (
  error: unknown,
  token: string | null = null
) => {
  failedQueue.forEach((promise) => {
    if (error) {
      promise.reject(error);
    } else if (token) {
      promise.resolve(token);
    }
  });

  failedQueue = [];
};

api.interceptors.request.use(
  (config) => {
    const token =
      useAuthStore.getState()
        .accessToken;

    if (token) {
      config.headers.Authorization =
        `Bearer ${token}`;
    }

    return config;
  }
);

api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest =
      error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      if (isRefreshing) {
        return new Promise(
          (resolve, reject) => {
            failedQueue.push({
              resolve,
              reject,
            });
          }
        ).then((token) => {
          originalRequest.headers.Authorization =
            `Bearer ${token}`;

          return api(originalRequest);
        });
      }

      originalRequest._retry = true;

      isRefreshing = true;

      try {
        const response =
          await refreshTokenRequest();

        const newAccessToken =
          response.accessToken;

        useAuthStore
          .getState()
          .setAccessToken(
            newAccessToken
          );

        processQueue(
          null,
          newAccessToken
        );

        originalRequest.headers.Authorization =
          `Bearer ${newAccessToken}`;

        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError);

        useAuthStore
          .getState()
          .logout();

        window.location.href =
          "/login";

        return Promise.reject(
          refreshError
        );
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);