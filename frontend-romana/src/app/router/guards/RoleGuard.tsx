import {
  Navigate,
  Outlet,
} from "react-router-dom";

import { useAuthStore } from "@/modules/auth/store/auth.store";

interface Props {
  allowedRoles: string[];
}

export const RoleGuard = ({
  allowedRoles,
}: Props) => {
  const user =
    useAuthStore(
      (state) => state.user
    );

  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  const hasRole =
    user.roles.some(
      (role) =>
        allowedRoles.includes(
          role
        )
    );

  if (!hasRole) {
    return (
      <Navigate
        to="/unauthorized"
        replace
      />
    );
  }

  return <Outlet />;
};