import { create } from "zustand";

import { persist } from "zustand/middleware";

export interface AuthUser {
  accountId: string;
  userId: string;
  email: string;
  roles: string[];
  profileType: "ADMIN" | "DOCTOR" | "RECEPTIONIST";
}

interface AuthState {
  accessToken: string | null;

  user: AuthUser | null;

  setAccessToken: (token: string | null) => void;

  setUser: (user: AuthUser | null) => void;

  logout: () => void;

  isAuthenticated: () => boolean;
}

export const useAuthStore =
  create<AuthState>()(
    persist(
      (set, get) => ({
        accessToken: null,

        user: null,

        setAccessToken: (
          token
        ) =>
          set({
            accessToken: token,
          }),

        setUser: (user) =>
          set({
            user,
          }),

        logout: () =>
          set({
            accessToken: null,

            user: null,
          }),

        isAuthenticated:
          () => {
            return !!get()
              .accessToken;
          },
      }),

      {
        name: "auth-storage",
      }
    )
  );
