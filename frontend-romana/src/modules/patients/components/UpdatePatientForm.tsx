import { useState } from "react";
import { Save, User, MapPin, PhoneCall } from "lucide-react";

import { useToast } from "@/shared/components/feedback/toast/ToastProvider";

import type { BloodType, Patient } from "../types/patient.types";

import { ESTADO_CIVIL, type EstadoCivil } from "../types/martialStatus.type";
import { useUpdatePatient } from "../hooks/useUpdatePatient";

interface Props {
  patient: Patient;
  onSuccess: () => void;
  onCancel: () => void;
}

export const UpdatePatientForm = ({ patient, onSuccess, onCancel }: Props) => {
  const updatePatient = useUpdatePatient();

  const { showToast } = useToast();

  // =========================
  // STATES
  // =========================

  const [name, setName] = useState(patient.name);

  const [email, setEmail] = useState(patient.email);

  const [phoneNumber, setPhoneNumber] = useState(patient.phoneNumber);

  const [birthDate, setBirthDate] = useState(
    patient.birthDate
      ? new Date(patient.birthDate).toISOString().split("T")[0]
      : "",
  );

  const [bloodType, setBloodType] = useState<BloodType>(patient.bloodType);

  const [sex, setSex] = useState<"M" | "F">(patient.sex);

  const [maritalStatus, setMaritalStatus] = useState<EstadoCivil>(
    patient.maritalStatus,
  );

  const [allergies, setAllergies] = useState(
    patient.allergies?.join(", ") || "",
  );

  // ADDRESS

  const [street, setStreet] = useState(patient.address?.street || "");

  const [city, setCity] = useState(patient.address?.city || "");

  const [state, setState] = useState(patient.address?.state || "");

  const [zipCode, setZipCode] = useState(patient.address?.zipCode || "");

  // EMERGENCY CONTACT

  const [emergencyName, setEmergencyName] = useState(
    patient.emergencyContact?.name || "",
  );

  const [emergencyPhone, setEmergencyPhone] = useState(
    patient.emergencyContact?.phoneNumber || "",
  );

  const [relationship, setRelationship] = useState(
    patient.emergencyContact?.relationship || "",
  );

  // =========================
  // SUBMIT
  // =========================

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    updatePatient.mutate(
      {
        id: patient.id,

        data: {
          name,
          email,
          phoneNumber,
          birthDate,
          bloodType,

          sex,
          maritalStatus,

          allergies:
            allergies.length > 0
              ? allergies.split(",").map((a) => a.trim())
              : [],

          address: {
            street,
            city,
            state,
            zipCode,
          },

          emergencyContact:
            emergencyName && emergencyPhone && relationship
              ? {
                  name: emergencyName,
                  phoneNumber: emergencyPhone,
                  relationship,
                }
              : undefined,
        },
      },
      {
        onSuccess: () => {
          showToast("Paciente actualizado correctamente", "success");

          onSuccess();
        },

        onError: (error: any) => {
          showToast(
            error?.response?.data?.message || "Error al actualizar paciente",
            "error",
          );
        },
      },
    );
  };

  // =========================
  // STYLES
  // =========================

  const inputClassName =
    "w-full px-4 py-2 mt-1 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-colors";

  const labelClassName =
    "block text-xs font-semibold text-gray-500 uppercase tracking-wider";

  // =========================
  // UI
  // =========================

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      {/* PERSONAL */}
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputClassName}
            />
          </div>

          <div>
            <label className={labelClassName}>Teléfono</label>

            <input
              required
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className={inputClassName}
            />
          </div>

          <div>
            <label className={labelClassName}>Fecha de Nacimiento</label>

            <input
              type="date"
              required
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              className={inputClassName}
            />
          </div>

          <div>
            <label className={labelClassName}>Tipo de Sangre</label>

            <select
              value={bloodType}
              onChange={(e) => setBloodType(e.target.value as BloodType)}
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
            <label className={labelClassName}>Sexo</label>

            <select
              value={sex}
              onChange={(e) => setSex(e.target.value as "M" | "F")}
              className={inputClassName}
            >
              <option value="M">Masculino</option>

              <option value="F">Femenino</option>
            </select>
          </div>

          <div>
            <label className={labelClassName}>Estado Civil</label>

            <select
              value={maritalStatus}
              onChange={(e) => setMaritalStatus(e.target.value as EstadoCivil)}
              className={inputClassName}
            >
              {Object.values(ESTADO_CIVIL).map((estado) => (
                <option key={estado} value={estado}>
                  {estado}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className={labelClassName}>Alergias</label>

            <input
              value={allergies}
              onChange={(e) => setAllergies(e.target.value)}
              placeholder="Penicilina, Polen..."
              className={inputClassName}
            />
          </div>
        </div>
      </div>

      {/* ADDRESS */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
        <div className="flex items-center gap-2 mb-6 border-b border-gray-100 pb-4">
          <MapPin className="w-5 h-5 text-indigo-500" />

          <h2 className="text-lg font-bold text-gray-900">Dirección</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className={labelClassName}>Calle y Número</label>

            <input
              required
              value={street}
              onChange={(e) => setStreet(e.target.value)}
              className={inputClassName}
            />
          </div>

          <div>
            <label className={labelClassName}>Ciudad</label>

            <input
              required
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className={inputClassName}
            />
          </div>

          <div>
            <label className={labelClassName}>Estado</label>

            <input
              required
              value={state}
              onChange={(e) => setState(e.target.value)}
              className={inputClassName}
            />
          </div>

          <div>
            <label className={labelClassName}>Código Postal</label>

            <input
              required
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              className={inputClassName}
            />
          </div>
        </div>
      </div>

      {/* EMERGENCY */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
        <div className="flex items-center gap-2 mb-6 border-b border-gray-100 pb-4">
          <PhoneCall className="w-5 h-5 text-indigo-500" />

          <h2 className="text-lg font-bold text-gray-900">
            Contacto de Emergencia
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className={labelClassName}>Nombre</label>

            <input
              value={emergencyName}
              onChange={(e) => setEmergencyName(e.target.value)}
              className={inputClassName}
            />
          </div>

          <div>
            <label className={labelClassName}>Teléfono</label>

            <input
              value={emergencyPhone}
              onChange={(e) => setEmergencyPhone(e.target.value)}
              className={inputClassName}
            />
          </div>

          <div>
            <label className={labelClassName}>Parentesco</label>

            <input
              value={relationship}
              onChange={(e) => setRelationship(e.target.value)}
              className={inputClassName}
            />
          </div>
        </div>
      </div>

      {/* ACTIONS */}
      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-2.5 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Cancelar
        </button>

        <button
          type="submit"
          disabled={updatePatient.isPending}
          className="flex items-center gap-2 px-6 py-2.5 text-sm font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 disabled:opacity-70 disabled:cursor-not-allowed transition-colors"
        >
          <Save className="w-4 h-4" />

          {updatePatient.isPending ? "Actualizando..." : "Actualizar Paciente"}
        </button>
      </div>
    </form>
  );
};
