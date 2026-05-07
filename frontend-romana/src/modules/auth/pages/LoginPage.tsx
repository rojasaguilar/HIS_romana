import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { useLogin } from "../hooks/useLogin";

export const LoginPage = () => {
  const navigate = useNavigate();

  const login = useLogin();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    login.mutate(
      {
        email,
        password,
      },

      {
        onSuccess: () => {
          navigate("/dashboard");
        },
      }
    );
  };

  return (
    <div>
      <h1>Login</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(
              e.target.value
            )
          }
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
        />

        <button
          type="submit"
          disabled={login.isPending}
        >
          {login.isPending
            ? "Loading..."
            : "Login"}
        </button>
      </form>

      {login.isError && (
        <p>
          Error al iniciar sesión
        </p>
      )}
    </div>
  );
};