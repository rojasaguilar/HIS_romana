import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCreateReceptionist } from "../hooks/useCreateReceptionist";
import { MoveLeft, User, ShieldCheck, Save } from "lucide-react";
import { MessagePortal } from "@/shared/components/feedback/modal/MessagePortal";

export const CreateReceptionistPage = () => {
  const navigate = useNavigate();
  const createReceptionist = useCreateReceptionist();

  // Estados basados en CreateReceptionistDTO
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [languages, setLanguages] = useState("");
  const [profilePictureUrl, setProfilePictureUrl] = useState("");

  // Estados para el MessagePortal
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | "info">("info");
  const [showMessage, setShowMessage] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    createReceptionist.mutate(
      {
        name,
        email,
        password,
        phoneNumber,
        languages:
          languages.length > 0
            ? languages.split(",").map((language) => language.trim())
            : [],
        profilePictureUrl: profilePictureUrl || undefined,
      },
      {
        onSuccess: () => {
          setMessageType("success");
          setMessage("El recepcionista fue registrado correctamente");
          setShowMessage(true);

          setTimeout(() => {
            navigate("/receptionists");
          }, 1500);
        },
        onError: (error: any) => {
          setMessageType("error");
          setMessage(
            error?.response?.data?.message ||
              "Ocurrió un error al crear el recepcionista",
          );
          setShowMessage(true);
        },
      },
    );
  };

  // Clases base reutilizadas de tu diseño
  const inputClassName =
    "w-full px-4 py-2 mt-1 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-colors";
  const labelClassName =
    "block text-xs font-semibold text-gray-500 uppercase tracking-wider";

  return (
    <>
      <div className="flex flex-col gap-6 max-w-4xl mx-auto pb-10">
        {/* HEADER DE LA PÁGINA */}
        <div className="flex flex-col gap-4">
          <div>
            <Link
              to="/receptionists"
              className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-indigo-600 transition"
            >
              <MoveLeft className="w-4 h-4" />
              Volver a Recepcionistas
            </Link>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Registrar Nuevo Recepcionista
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Configura el perfil y los accesos del personal de mostrador.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {/* TARJETA 1: Información Personal y Contacto */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-2 mb-6 border-b border-gray-100 pb-4">
              <User className="w-5 h-5 text-indigo-500" />
              <h2 className="text-lg font-bold text-gray-900">
                Información Personal
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={labelClassName}>Nombre Completo</label>
                <input
                  required
                  placeholder="Ej. Ana García"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={inputClassName}
                />
              </div>

              <div>
                <label className={labelClassName}>Teléfono Móvil</label>
                <input
                  required
                  placeholder="10 dígitos"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ""))}
                  className={inputClassName}
                />
              </div>

              <div>
                <label className={labelClassName}>
                  URL Fotografía de Perfil (Opcional)
                </label>
                <input
                  type="url"
                  placeholder="https://..."
                  value={profilePictureUrl}
                  onChange={(e) => setProfilePictureUrl(e.target.value)}
                  className={inputClassName}
                />
              </div>

              <div>
                <label className={labelClassName}>Idiomas</label>
                <input
                  placeholder="Ej. Español, Inglés (Separados por coma)"
                  value={languages}
                  onChange={(e) => setLanguages(e.target.value)}
                  className={inputClassName}
                />
              </div>
            </div>
          </div>

          {/* TARJETA 2: Credenciales de Acceso */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-2 mb-6 border-b border-gray-100 pb-4">
              <ShieldCheck className="w-5 h-5 text-indigo-500" />
              <h2 className="text-lg font-bold text-gray-900">
                Credenciales del Sistema
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={labelClassName}>Correo Electrónico (Usuario)</label>
                <input
                  type="email"
                  required
                  placeholder="ana@romana.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={inputClassName}
                />
              </div>

              <div>
                <label className={labelClassName}>Contraseña de Acceso</label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={inputClassName}
                />
                <p className="mt-1 text-xs text-gray-400">
                  El recepcionista utilizará esta contraseña para ingresar.
                </p>
              </div>
            </div>
          </div>

          {/* BOTONES DE ACCIÓN */}
          <div className="flex justify-end gap-4 mt-2">
            <Link
              to="/receptionists"
              className="px-6 py-2.5 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </Link>

            <button
              type="submit"
              disabled={createReceptionist.isPending}
              className="flex items-center gap-2 px-6 py-2.5 text-sm font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 disabled:opacity-70 disabled:cursor-not-allowed transition-colors shadow-sm"
            >
              <Save className="w-4 h-4" />
              {createReceptionist.isPending ? "Guardando..." : "Guardar Recepcionista"}
            </button>
          </div>
        </form>
      </div>

      <MessagePortal
        isOpen={showMessage}
        type={messageType}
        message={message}
        onClose={() => setShowMessage(false)}
      />
    </>
  );
};