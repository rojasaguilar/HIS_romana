import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCreatePatient } from "../hooks/useCreatePatient";
import type { BloodType } from "../types/patient.types";
import { MoveLeft, User, MapPin, PhoneCall, Save } from "lucide-react";

export const CreatePatientPage = () => {
  const navigate = useNavigate();
  const createPatient = useCreatePatient();

  // Estados mantenidos exactamente igual (lógica intacta)
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [bloodType, setBloodType] = useState<BloodType>("O+");
  const [allergies, setAllergies] = useState("");

  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");

  const [emergencyName, setEmergencyName] = useState("");
  const [emergencyPhone, setEmergencyPhone] = useState("");
  const [relationship, setRelationship] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    createPatient.mutate(
      {
        name,
        email,
        phoneNumber,
        birthDate,
        bloodType,
        allergies: allergies.length > 0 ? allergies.split(",").map((a) => a.trim()) : [],
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
      {
        onSuccess: () => {
          navigate("/patients");
        },
      }
    );
  };

  // Clases base para inputs para mantener consistencia y no repetir tanto código
  const inputClassName = "w-full px-4 py-2 mt-1 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-colors";
  const labelClassName = "block text-xs font-semibold text-gray-500 uppercase tracking-wider";

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto pb-10">
      {/* 1. Header de la página */}
      <div className="flex flex-col gap-4">
        <div>
          <Link to="/patients" className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-indigo-600 transition">
            <MoveLeft className="w-4 h-4" />
            Volver a Clientes
          </Link>
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Registrar Nuevo Paciente</h1>
          <p className="text-sm text-gray-500 mt-1">Ingresa los datos personales, dirección y contacto de emergencia.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        
        {/* TARJETA 1: Información Personal */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-2 mb-6 border-b border-gray-100 pb-4">
            <User className="w-5 h-5 text-indigo-500" />
            <h2 className="text-lg font-bold text-gray-900">Información Personal</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={labelClassName}>Nombre Completo</label>
              <input required placeholder="Ej. Juan Pérez" value={name} onChange={(e) => setName(e.target.value)} className={inputClassName} />
            </div>

            <div>
              <label className={labelClassName}>Correo Electrónico</label>
              <input type="email" required placeholder="juan@email.com" value={email} onChange={(e) => setEmail(e.target.value)} className={inputClassName} />
            </div>

            <div>
              <label className={labelClassName}>Teléfono</label>
              <input required placeholder="555-0100" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} className={inputClassName} />
            </div>

            <div>
              <label className={labelClassName}>Fecha de Nacimiento</label>
              <input type="date" required value={birthDate} onChange={(e) => setBirthDate(e.target.value)} className={inputClassName} />
            </div>

            <div>
              <label className={labelClassName}>Tipo de Sangre</label>
              <select value={bloodType} onChange={(e) => setBloodType(e.target.value as BloodType)} className={inputClassName}>
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
              <label className={labelClassName}>Alergias (Opcional)</label>
              <input placeholder="Separadas por comas (Ej. Penicilina, Polen)" value={allergies} onChange={(e) => setAllergies(e.target.value)} className={inputClassName} />
            </div>
          </div>
        </div>

        {/* TARJETA 2: Dirección */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-2 mb-6 border-b border-gray-100 pb-4">
            <MapPin className="w-5 h-5 text-indigo-500" />
            <h2 className="text-lg font-bold text-gray-900">Dirección</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className={labelClassName}>Calle y Número</label>
              <input required placeholder="Ej. Av. Siempre Viva 742" value={street} onChange={(e) => setStreet(e.target.value)} className={inputClassName} />
            </div>

            <div>
              <label className={labelClassName}>Ciudad</label>
              <input required placeholder="Ej. Tepic" value={city} onChange={(e) => setCity(e.target.value)} className={inputClassName} />
            </div>

            <div>
              <label className={labelClassName}>Estado</label>
              <input required placeholder="Ej. Nayarit" value={state} onChange={(e) => setState(e.target.value)} className={inputClassName} />
            </div>

            <div>
              <label className={labelClassName}>Código Postal</label>
              <input required placeholder="Ej. 63000" value={zipCode} onChange={(e) => setZipCode(e.target.value)} className={inputClassName} />
            </div>
          </div>
        </div>

        {/* TARJETA 3: Contacto de Emergencia */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-2 mb-6 border-b border-gray-100 pb-4">
            <PhoneCall className="w-5 h-5 text-indigo-500" />
            <h2 className="text-lg font-bold text-gray-900">Contacto de Emergencia (Opcional)</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className={labelClassName}>Nombre del Contacto</label>
              <input placeholder="Ej. María Pérez" value={emergencyName} onChange={(e) => setEmergencyName(e.target.value)} className={inputClassName} />
            </div>

            <div>
              <label className={labelClassName}>Teléfono</label>
              <input placeholder="555-0199" value={emergencyPhone} onChange={(e) => setEmergencyPhone(e.target.value)} className={inputClassName} />
            </div>

            <div>
              <label className={labelClassName}>Parentesco</label>
              <input placeholder="Ej. Madre, Esposo" value={relationship} onChange={(e) => setRelationship(e.target.value)} className={inputClassName} />
            </div>
          </div>
        </div>

        {/* Botones de Acción */}
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
            {createPatient.isPending ? "Guardando..." : "Guardar Paciente"}
          </button>
        </div>

      </form>
    </div>
  );
};