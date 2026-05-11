import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";
import { Mail, Lock, LogIn, AlertCircle } from "lucide-react";

export const LoginPage = () => {
  const navigate = useNavigate();
  const login = useLogin();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    login.mutate(
      { email, password },
      {
        onSuccess: () => {
          navigate("/dashboard");
        },
      },
    );
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full">
        {/* Logo / Brand Section */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-xl shadow-indigo-200 mb-4">
            <span className="text-white font-bold text-2xl">R</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Bienvenido</h1>
          <p className="text-gray-500 mt-2 font-medium">
            Centro médico Romana • Gestión Integral
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Email Input */}
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">
                Correo Electrónico
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  required
                  placeholder="admin@romana.com"
                  className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">
                Contraseña
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            {/* Error Message */}
            {login.isError && (
              <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-100 text-red-600 rounded-xl text-xs font-medium animate-in fade-in slide-in-from-top-1">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                Error: Credenciales inválidas o problema de servidor.
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={login.isPending}
              className="w-full mt-2 flex items-center justify-center gap-2 py-3.5 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-500/30 transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-indigo-100"
            >
              {login.isPending ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <LogIn className="w-5 h-5" />
                  Entrar al sistema
                </>
              )}
            </button>
          </form>
        </div>

        {/* Footer info */}
        <p className="text-center text-gray-400 text-xs mt-8">
          ¿Problemas para entrar? Contacta a soporte técnico.
        </p>
      </div>
    </div>
  );
};
