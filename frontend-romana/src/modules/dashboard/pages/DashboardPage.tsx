import { useAuthStore } from "@/modules/auth/store/auth.store";

export const DashboardPage = () => {
  const user = useAuthStore(
    (state) => state.user
  );

  const token = useAuthStore(
    (state) => state.accessToken
  );

  return (
    <div>
      <h1>Dashboard</h1>

      <pre>
        {JSON.stringify(
          user,
          null,
          2
        )}
      </pre>

      <p>
        Token:
        {token
          ? "Existe"
          : "No existe"}
      </p>
    </div>
  );
};