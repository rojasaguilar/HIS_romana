import { useMutation } from "@tanstack/react-query";

import { loginRequest } from "../api/auth.api";

import { useAuthStore } from "../store/auth.store";

import { decodeAccessToken } from "../services/auth.service";

export const useLogin = () => {
  const setAccessToken =
    useAuthStore(
      (state) =>
        state.setAccessToken
    );

  const setUser =
    useAuthStore(
      (state) => state.setUser
    );

  return useMutation({
    mutationFn: loginRequest,

    onSuccess: (data) => {
      const user =
        decodeAccessToken(
          data.accessToken
        );

      setAccessToken(
        data.accessToken
      );

      setUser(user);
    },
  });
};