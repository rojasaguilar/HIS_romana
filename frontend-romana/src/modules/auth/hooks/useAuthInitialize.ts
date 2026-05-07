import { useEffect } from "react";

import { meRequest } from "../api/auth.api";

import { useAuthStore } from "../store/auth.store";

export const useAuthInitialize =
  () => {
    const setAccessToken =
      useAuthStore(
        (state) =>
          state.setAccessToken
      );

    const setUser =
      useAuthStore(
        (state) => state.setUser
      );

    const logout =
      useAuthStore(
        (state) => state.logout
      );

    useEffect(() => {
      const initialize =
        async () => {
          try {
            const data =
              await meRequest();

            setAccessToken(
              data.accessToken
            );

            setUser(data.user);
          } catch {
            logout();
          }
        };

      initialize();
    }, []);
  };