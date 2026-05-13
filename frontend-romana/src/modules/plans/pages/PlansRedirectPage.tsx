import { Navigate } from "react-router-dom";

import { useAuthStore } from "@/modules/auth/store/auth.store";

export const PlansRedirectPage = () => {
  const user = useAuthStore((state) => state.user);

  const isAdmin = user?.roles.includes("ADMIN");

  console.log(user);

  if (isAdmin) {
    return <Navigate to="/plans/admin" replace />;
  }

  return <Navigate to="/plans/available" replace />;
};
