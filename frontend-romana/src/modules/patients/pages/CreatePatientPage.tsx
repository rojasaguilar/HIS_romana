import { useMemo, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCreatePatient } from "../hooks/useCreatePatient";

import type { BloodType } from "../types/patient.types";

import {
  MoveLeft,
  User,
  MapPin,
  PhoneCall,
  Save,
  ShieldCheck,
} from "lucide-react";

import { useToast } from "@/shared/components/feedback/toast/ToastProvider";

import {
  ESTADO_CIVIL,
  type EstadoCivil,
} from "../types/martialStatus.type";

export const CreatePatientPage = () => {
  const navigate = useNavigate();

  const createPatient = useCreatePatient();

  const { showToast } = useToast();

  // =========================
  // PERSONAL INFO
  // =========================

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [phoneNumber, setPhoneNumber] = useState("");

  const [birthDate, setBirthDate] = useState("");

  const [bloodType, setBloodType] = useState<BloodType>("O+");

  const [allergies, setAllergies] = useState("");

  const [sex, setSex] = useState<"M" | "F">("M");

  const [maritalStatus, setMaritalStatus] =
    useState<EstadoCivil>("Soltero(a)");

  const [nationality, setNationality] = useState("");

  const [ethnicity, setEthnicity] = useState("");

  // =========================
  // ADDRESS
  // =========================

  const [street, setStreet] = useState("");

  const [number, setNumber] = useState("");

  const [city, setCity] = useState("");

  const [state, setState] = useState("");

  const [zipCode, setZipCode] = useState("");

  // =========================
  // EMERGENCY CONTACT
  // =========================

  const [emergencyName, setEmergencyName] = useState("");

  const [emergencyPhone, setEmergencyPhone] = useState("");

  const [relationship, setRelationship] = useState("");

  // =========================
  // LEGAL GUARDIAN
  // =========================

  const [guardianName, setGuardianName] = useState("");

  const [guardianRelationship, setGuardianRelationship] = useState("");

  // =========================
  // MINOR VALIDATION
  // =========================

  const isMinor = useMemo(() => {
    if (!birthDate) return false;

    const today = new Date();

    const birth = new Date(birthDate);

    let age = today.getFullYear() - birth.getFullYear();

    const monthDifference = today.getMonth() - birth.getMonth();

    if (
      monthDifference < 0 ||
      (monthDifference === 0 &&
        today.getDate() < birth.getDate())
    ) {
      age--;
    }

    return age < 18;
  }, [birthDate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // VALIDAR TUTOR SI ES MENOR

    if (isMinor) {
      if (!guardianName || !guardianRelationship) {
        showToast(
          "Los pacientes menores de edad deben tener tutor legal",
          "error",
        );

        return;
      }
    }

    createPatient.mutate(
      {
        name,

        email,

        phoneNumber,

        birthDate,

        bloodType,

        sex,

        maritalStatus,

        nationality,

        ethnicity: ethnicity || undefined,

        allergies:
          allergies.trim().length > 0
            ? allergies.split(",").map((a) => a.trim())
            : [],

        address: {
          street,
          number,
          city,
          state,
          zipCode,
        },

        emergencyContact:
          emergencyName &&
          emergencyPhone &&
          relationship
            ? {
                name: emergencyName,
                phoneNumber: emergencyPhone,
                relationship,
              }
            : undefined,

        legalGuardian: isMinor
          ? {
              name: guardianName,
              relationship: guardianRelationship,
            }
          : undefined,
      },
      {
        onSuccess: () => {
          showToast(
            "Paciente creado correctamente",
            "success",
          );

          setTimeout(() => {
            navigate("/patients");
          }, 1200);
        },

        onError: (error: any) => {
          showToast(
            error?.response?.data?.message ||
              "Error al crear paciente",
            "error",
          );
        },
      },
    );
  };

  const inputClassName =
    "w-full px-4 py-2 mt-1 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-colors";

  const labelClassName =
    "block text-xs font-semibold text-gray-500 uppercase tracking-wider";

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto pb-10">
      {/* HEADER */}

      <div className="flex flex-col gap-4">
        <div>
          <Link
            to="/patients"
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-indigo-600 transition"
          >
            <MoveLeft className="w-4 h-4" />
            Volver a Pacientes
          </Link>
        </div>

        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Registrar Nuevo Paciente
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            Ingresa la información del paciente.
          </p>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-6"
      >
        {/* ========================= */}
        {/* PERSONAL INFO */}
        {/* ========================= */}

        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-2 mb-6 border-b border-gray-100 pb-4">
            <User className="w-5 h-5 text-indigo-500" />

            <h2 className="text-lg font-bold text-gray-900">
              Información Personal
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={labelClassName}>
                Nombre Completo
              </label>

              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ej. Juan Pérez"
                className={inputClassName}
              />
            </div>

            <div>
              <label className={labelClassName}>
                Correo Electrónico
              </label>

              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="juan@email.com"
                className={inputClassName}
              />
            </div>

            <div>
              <label className={labelClassName}>
                Teléfono
              </label>

              <input
                required
                value={phoneNumber}
                onChange={(e) =>
                  setPhoneNumber(e.target.value)
                }
                placeholder="555-0100"
                className={inputClassName}
              />
            </div>

            <div>
              <label className={labelClassName}>
                Fecha de Nacimiento
              </label>

              <input
                type="date"
                required
                value={birthDate}
                onChange={(e) =>
                  setBirthDate(e.target.value)
                }
                className={inputClassName}
              />
            </div>

            <div>
              <label className={labelClassName}>
                Tipo de Sangre
              </label>

              <select
                value={bloodType}
                onChange={(e) =>
                  setBloodType(
                    e.target.value as BloodType,
                  )
                }
                className={inputClassName}
              >
                <option value="O+">O+</option>
                <option value="O-">O-</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
              </select>
            </div>

            <div>
              <label className={labelClassName}>
                Sexo
              </label>

              <select
                value={sex}
                onChange={(e) =>
                  setSex(e.target.value as "M" | "F")
                }
                className={inputClassName}
              >
                <option value="M">Masculino</option>

                <option value="F">Femenino</option>
              </select>
            </div>

            <div>
              <label className={labelClassName}>
                Estado Civil
              </label>

              <select
                value={maritalStatus}
                onChange={(e) =>
                  setMaritalStatus(
                    e.target.value as EstadoCivil,
                  )
                }
                className={inputClassName}
              >
                {Object.values(ESTADO_CIVIL).map(
                  (estado) => (
                    <option
                      key={estado}
                      value={estado}
                    >
                      {estado}
                    </option>
                  ),
                )}
              </select>
            </div>

            <div>
              <label className={labelClassName}>
                Nacionalidad
              </label>

              <input
                required
                value={nationality}
                onChange={(e) =>
                  setNationality(e.target.value)
                }
                placeholder="Ej. Mexicana"
                className={inputClassName}
              />
            </div>

            <div>
              <label className={labelClassName}>
                Etnia (Opcional)
              </label>

              <input
                value={ethnicity}
                onChange={(e) =>
                  setEthnicity(e.target.value)
                }
                placeholder="Ej. Mestizo"
                className={inputClassName}
              />
            </div>

            <div className="md:col-span-2">
              <label className={labelClassName}>
                Alergias
              </label>

              <input
                value={allergies}
                onChange={(e) =>
                  setAllergies(e.target.value)
                }
                placeholder="Penicilina, Polen..."
                className={inputClassName}
              />
            </div>
          </div>
        </div>

        {/* ========================= */}
        {/* ADDRESS */}
        {/* ========================= */}

        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-2 mb-6 border-b border-gray-100 pb-4">
            <MapPin className="w-5 h-5 text-indigo-500" />

            <h2 className="text-lg font-bold text-gray-900">
              Dirección
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={labelClassName}>
                Calle
              </label>

              <input
                required
                value={street}
                onChange={(e) =>
                  setStreet(e.target.value)
                }
                className={inputClassName}
              />
            </div>

            <div>
              <label className={labelClassName}>
                Número
              </label>

              <input
                required
                value={number}
                onChange={(e) =>
                  setNumber(e.target.value)
                }
                className={inputClassName}
              />
            </div>

            <div>
              <label className={labelClassName}>
                Ciudad
              </label>

              <input
                required
                value={city}
                onChange={(e) =>
                  setCity(e.target.value)
                }
                className={inputClassName}
              />
            </div>

            <div>
              <label className={labelClassName}>
                Estado
              </label>

              <input
                required
                value={state}
                onChange={(e) =>
                  setState(e.target.value)
                }
                className={inputClassName}
              />
            </div>

            <div>
              <label className={labelClassName}>
                Código Postal
              </label>

              <input
                required
                value={zipCode}
                onChange={(e) =>
                  setZipCode(e.target.value)
                }
                className={inputClassName}
              />
            </div>
          </div>
        </div>

        {/* ========================= */}
        {/* LEGAL GUARDIAN */}
        {/* ========================= */}

        {isMinor && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-2 mb-6 border-b border-amber-200 pb-4">
              <ShieldCheck className="w-5 h-5 text-amber-600" />

              <h2 className="text-lg font-bold text-amber-900">
                Tutor Legal
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={labelClassName}>
                  Nombre del Tutor
                </label>

                <input
                  required={isMinor}
                  value={guardianName}
                  onChange={(e) =>
                    setGuardianName(e.target.value)
                  }
                  className={inputClassName}
                />
              </div>

              <div>
                <label className={labelClassName}>
                  Relación / Parentesco
                </label>

                <input
                  required={isMinor}
                  value={guardianRelationship}
                  onChange={(e) =>
                    setGuardianRelationship(
                      e.target.value,
                    )
                  }
                  placeholder="Madre, Padre, Tutor..."
                  className={inputClassName}
                />
              </div>
            </div>
          </div>
        )}

        {/* ========================= */}
        {/* EMERGENCY CONTACT */}
        {/* ========================= */}

        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-2 mb-6 border-b border-gray-100 pb-4">
            <PhoneCall className="w-5 h-5 text-indigo-500" />

            <h2 className="text-lg font-bold text-gray-900">
              Contacto de Emergencia
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className={labelClassName}>
                Nombre
              </label>

              <input
                value={emergencyName}
                onChange={(e) =>
                  setEmergencyName(e.target.value)
                }
                className={inputClassName}
              />
            </div>

            <div>
              <label className={labelClassName}>
                Teléfono
              </label>

              <input
                value={emergencyPhone}
                onChange={(e) =>
                  setEmergencyPhone(e.target.value)
                }
                className={inputClassName}
              />
            </div>

            <div>
              <label className={labelClassName}>
                Relación
              </label>

              <input
                value={relationship}
                onChange={(e) =>
                  setRelationship(e.target.value)
                }
                className={inputClassName}
              />
            </div>
          </div>
        </div>

        {/* ACTIONS */}

        <div className="flex justify-end gap-4 mt-2">
          <Link
            to="/patients"
            className="px-6 py-2.5 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancelar
          </Link>

          <button
            type="submit"
            disabled={createPatient.isPending}
            className="flex items-center gap-2 px-6 py-2.5 text-sm font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 disabled:opacity-70 disabled:cursor-not-allowed transition-colors"
          >
            <Save className="w-4 h-4" />

            {createPatient.isPending
              ? "Guardando..."
              : "Guardar Paciente"}
          </button>
        </div>
      </form>
    </div>
  );
};