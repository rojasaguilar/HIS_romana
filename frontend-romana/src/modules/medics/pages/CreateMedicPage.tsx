import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCreateMedic } from "../hooks/useCreateMedic";
import type { MedicType } from "../types/medic.types";
import { useSpecialities } from "@/modules/specialities/hooks/useSpecialities";
import { MoveLeft, User, Award, Stethoscope, Save } from "lucide-react";
import { MessagePortal } from "@/shared/components/feedback/modal/MessagePortal";

export const CreateMedicPage = () => {
  const navigate = useNavigate();
  const createMedic = useCreateMedic();
  const { data: specialities } = useSpecialities();

  // Estados mantenidos exactamente igual
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [healthLicenseNumber, setHealthLicenseNumber] = useState("");
  const [professionalLicenceNumber, setProfessionalLicenceNumber] =
    useState("");
  const [languages, setLanguages] = useState("");
  const [specialityIds, setSpecialityIds] = useState<string[]>([]);
  const [medicalSchool, setMedicalSchool] = useState("");
  const [startPracticeDate, setStartPracticeDate] = useState("");
  const [bio, setBio] = useState("");
  const [consultationFee, setConsultationFee] = useState(0);
  const [profilePictureUrl, setProfilePictureUrl] = useState("");
  const [type, setType] = useState<MedicType>("INTERNAL");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | "info">(
    "info",
  );
  const [showMessage, setShowMessage] = useState(false);

  // Lógica de handlers intacta
  const handleSpecialityChange = (specialityId: string) => {
    setSpecialityIds((prev) => {
      if (prev.includes(specialityId)) {
        return prev.filter((id) => id !== specialityId);
      }
      return [...prev, specialityId];
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    createMedic.mutate(
      {
        name,
        email,
        phoneNumber,
        healthLicenseNumber,
        professionalLicenceNumber,
        languages:
          languages.length > 0
            ? languages.split(",").map((language) => language.trim())
            : [],
        specialityIds,
        medicalSchool,
        startPracticeDate,
        bio,
        consultationFee,
        profilePictureUrl,
        type,
        password: type === "INTERNAL" ? password : undefined,
      },
      {
        onSuccess: () => {
          setMessageType("success");
          setMessage("El medico fue registrado correctamente");
          setShowMessage(true);

          setTimeout(() => {
            navigate("/medics");
          }, 1500);
        },
        onError: (error: any) => {
          setMessageType("error");

          setMessage(
            error?.response?.data?.message ||
              "Ocurrió un error al crear el plan",
          );

          setShowMessage(true);
        },
      },
    );
  };

  // Clases base para reutilizar
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
              to="/medics"
              className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-indigo-600 transition"
            >
              <MoveLeft className="w-4 h-4" />
              Volver a Médicos
            </Link>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Registrar Nuevo Médico
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Configura el perfil, credenciales y especialidades del
              profesional.
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
                  placeholder="Ej. Carlos Ruiz"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={inputClassName}
                />
              </div>

              <div>
                <label className={labelClassName}>Correo Electrónico</label>
                <input
                  type="email"
                  required
                  placeholder="carlos@clinica.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={inputClassName}
                />
              </div>

              <div>
                <label className={labelClassName}>Teléfono</label>
                <input
                  required
                  placeholder="555-0100"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className={inputClassName}
                />
              </div>

              <div>
                <label className={labelClassName}>
                  URL Fotografía de Perfil (Opcional)
                </label>
                <input
                  placeholder="https://..."
                  value={profilePictureUrl}
                  onChange={(e) => setProfilePictureUrl(e.target.value)}
                  className={inputClassName}
                />
              </div>

              <div className="md:col-span-2">
                <label className={labelClassName}>Idiomas</label>
                <input
                  placeholder="Ej. Español, Inglés, Francés (Separados por coma)"
                  value={languages}
                  onChange={(e) => setLanguages(e.target.value)}
                  className={inputClassName}
                />
              </div>

              <div className="md:col-span-2">
                <label className={labelClassName}>Biografía / Resumen</label>
                <textarea
                  rows={3}
                  placeholder="Breve resumen de su trayectoria profesional..."
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className={`${inputClassName} resize-none`}
                />
              </div>
            </div>
          </div>

          {/* TARJETA 2: Información Profesional */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-2 mb-6 border-b border-gray-100 pb-4">
              <Award className="w-5 h-5 text-indigo-500" />
              <h2 className="text-lg font-bold text-gray-900">
                Credenciales Médicas
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={labelClassName}>Licencia de Salud</label>
                <input
                  required
                  placeholder="Ej. SALUD-12345"
                  value={healthLicenseNumber}
                  onChange={(e) => setHealthLicenseNumber(e.target.value)}
                  className={inputClassName}
                />
              </div>

              <div>
                <label className={labelClassName}>Cédula Profesional</label>
                <input
                  required
                  placeholder="Ej. MED-67890"
                  value={professionalLicenceNumber}
                  onChange={(e) => setProfessionalLicenceNumber(e.target.value)}
                  className={inputClassName}
                />
              </div>

              <div>
                <label className={labelClassName}>Escuela de Medicina</label>
                <input
                  required
                  placeholder="Ej. Universidad Nacional"
                  value={medicalSchool}
                  onChange={(e) => setMedicalSchool(e.target.value)}
                  className={inputClassName}
                />
              </div>

              <div>
                <label className={labelClassName}>
                  Fecha de Inicio de Práctica
                </label>
                <input
                  type="date"
                  required
                  value={startPracticeDate}
                  onChange={(e) => setStartPracticeDate(e.target.value)}
                  className={inputClassName}
                />
              </div>

              <div>
                <label className={labelClassName}>Tipo de Médico</label>
                {/* CORRECCIÓN: Opciones ajustadas a tu MedicType real */}
                <select
                  value={type}
                  onChange={(e) => {
                    const newType = e.target.value as MedicType;

                    setType(newType);

                    // Si cambia a EXTERNAL, limpiar password
                    if (newType === "EXTERNAL") {
                      setPassword("");
                    }
                  }}
                  className={inputClassName}
                >
                  <option value="INTERNAL">Interno (Plantilla)</option>
                  <option value="EXTERNAL">Externo (Asociado)</option>
                </select>
              </div>
              <div>
                <label className={labelClassName}>Contraseña</label>

                <input
                  type="password"
                  placeholder={
                    type === "INTERNAL"
                      ? "Ingresa una contraseña"
                      : "No aplica para médicos externos"
                  }
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={type === "EXTERNAL"}
                  required={type === "INTERNAL"}
                  className={`${inputClassName} ${
                    type === "EXTERNAL"
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : ""
                  }`}
                />

                {type === "EXTERNAL" && (
                  <p className="mt-1 text-xs text-gray-400">
                    Los médicos externos no requieren acceso al sistema.
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* TARJETA 3: Especialidades y Honorarios */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6 border-b border-gray-100 pb-4">
              <div className="flex items-center gap-2">
                <Stethoscope className="w-5 h-5 text-indigo-500" />
                <h2 className="text-lg font-bold text-gray-900">
                  Especialidades y Costos
                </h2>
              </div>

              {/* Honorarios en la cabecera para destacar */}
              <div className="flex items-center gap-3">
                <label className={`${labelClassName} mb-0`}>
                  Honorario / Comisión (%)
                </label>
                <input
                  type="number"
                  required
                  min="0"
                  max="100"
                  placeholder="0"
                  value={consultationFee === 0 ? "" : consultationFee}
                  onChange={(e) => setConsultationFee(Number(e.target.value))}
                  className="w-24 px-3 py-1.5 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-right font-medium"
                />
              </div>
            </div>

            <div>
              <label className={`${labelClassName} mb-3`}>
                Selecciona las especialidades
              </label>
              {/* Grid de checkboxes para mejor UX en lugar de una lista vertical infinita */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {specialities?.map((speciality) => (
                  <label
                    key={speciality.id}
                    className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition-colors ${
                      specialityIds.includes(speciality.id)
                        ? "border-indigo-500 bg-indigo-50"
                        : "border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500"
                      checked={specialityIds.includes(speciality.id)}
                      onChange={() => handleSpecialityChange(speciality.id)}
                    />
                    <span className="text-sm font-medium text-gray-700 select-none">
                      {speciality.name}
                    </span>
                  </label>
                ))}

                {specialities?.length === 0 && (
                  <p className="text-sm text-gray-500 col-span-full">
                    No hay especialidades registradas.
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* BOTONES DE ACCIÓN */}
          <div className="flex justify-end gap-4 mt-2">
            <Link
              to="/medics"
              className="px-6 py-2.5 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </Link>

            <button
              type="submit"
              disabled={createMedic.isPending}
              className="flex items-center gap-2 px-6 py-2.5 text-sm font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 disabled:opacity-70 disabled:cursor-not-allowed transition-colors shadow-sm"
            >
              <Save className="w-4 h-4" />
              {createMedic.isPending ? "Guardando..." : "Guardar Médico"}
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
