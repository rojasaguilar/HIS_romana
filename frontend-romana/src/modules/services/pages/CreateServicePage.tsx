import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCreateService } from "../hooks/useCreateService";
import type { ServiceModality } from "../types/service.types";
import { useSpecialities } from "@/modules/specialities/hooks/useSpecialities";
import { MoveLeft, Activity, Clock, Banknote, Stethoscope, Save, Globe, UserRound } from "lucide-react";

export const CreateServicePage = () => {
  const navigate = useNavigate();
  const createService = useCreateService();
  const { data: specialities } = useSpecialities();

  const [name, setName] = useState("");
  // Ahora manejamos estos como strings para mejor control del input
  const [duration, setDuration] = useState("30");
  const [cost, setCost] = useState("0");
  const [specialityId, setSpecialityId] = useState("");
  const [modalities, setModalities] = useState<ServiceModality[]>([]);

  const handleModalityChange = (modality: ServiceModality) => {
    setModalities((prev) => {
      if (prev.includes(modality)) {
        return prev.filter((m) => m !== modality);
      }
      return [...prev, modality];
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Convertimos a número justo antes de la mutación
    createService.mutate(
      { 
        name, 
        duration: Number(duration), 
        cost: Number(cost), 
        specialityId, 
        modalities 
      },
      {
        onSuccess: () => {
          navigate("/services");
        },
      }
    );
  };

  const inputClassName = "w-full px-4 py-2 mt-1 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-colors";
  const labelClassName = "block text-xs font-semibold text-gray-500 uppercase tracking-wider";

  return (
    <div className="flex flex-col gap-6 max-w-3xl mx-auto pb-10">
      <div className="flex flex-col gap-4">
        <div>
          <Link to="/services" className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-indigo-600 transition">
            <MoveLeft className="w-4 h-4" />
            Volver a Servicios
          </Link>
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Crear Nuevo Servicio</h1>
          <p className="text-sm text-gray-500 mt-1">Define el nombre, costos y modalidades de las consultas.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-2 mb-6 border-b border-gray-100 pb-4 text-indigo-500">
            <Activity className="w-5 h-5" />
            <h2 className="text-lg font-bold text-gray-900">Detalles del Servicio</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className={labelClassName}>Nombre del Servicio</label>
              <input 
                required 
                placeholder="Ej. Consulta General de Nutrición" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                className={inputClassName} 
              />
            </div>

            {/* DURACIÓN - Ahora como texto */}
            <div>
              <label className={labelClassName}>Duración (Minutos)</label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input 
                  type="text" // Input de texto para mejor UX
                  inputMode="numeric" // Muestra el teclado numérico en móviles
                  required 
                  value={duration} 
                  onChange={(e) => {
                    // Solo permitimos números
                    const val = e.target.value.replace(/\D/g, "");
                    setDuration(val);
                  }} 
                  className={`${inputClassName} pl-10`} 
                  placeholder="30"
                />
              </div>
            </div>

            {/* COSTO - Ahora como texto */}
            <div>
              <label className={labelClassName}>Costo Base ($ MXN)</label>
              <div className="relative">
                <Banknote className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input 
                  type="text"
                  inputMode="numeric"
                  required 
                  value={cost} 
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, "");
                    setCost(val);
                  }} 
                  className={`${inputClassName} pl-10`} 
                  placeholder="0"
                />
              </div>
            </div>

            <div className="md:col-span-2">
              <label className={labelClassName}>Especialidad Relacionada</label>
              <div className="relative">
                <Stethoscope className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <select 
                  required
                  value={specialityId} 
                  onChange={(e) => setSpecialityId(e.target.value)} 
                  className={`${inputClassName} pl-10 appearance-none`}
                >
                  <option value="" disabled>Selecciona una especialidad</option>
                  {specialities?.map((speciality) => (
                    <option key={speciality.id} value={speciality.id}>
                      {speciality.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="md:col-span-2">
              <label className={`${labelClassName} mb-3`}>Modalidades Disponibles</label>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { id: "ONLINE", label: "En Línea", icon: Globe },
                  { id: "IN_PERSON", label: "Presencial", icon: UserRound },
                ].map((item) => {
                  const isSelected = modalities.includes(item.id as ServiceModality);
                  return (
                    <div
                      key={item.id}
                      onClick={() => handleModalityChange(item.id as ServiceModality)}
                      className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        isSelected 
                          ? "border-indigo-500 bg-indigo-50/50 text-indigo-700 shadow-sm" 
                          : "border-gray-200 bg-white text-gray-500 hover:border-indigo-200 hover:bg-gray-50"
                      }`}
                    >
                      <item.icon className={`w-5 h-5 ${isSelected ? "text-indigo-600" : "text-gray-400"}`} />
                      <span className="text-sm font-bold">{item.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4 mt-2">
          <Link 
            to="/services"
            className="px-6 py-2.5 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancelar
          </Link>
          
          <button
            type="submit"
            disabled={createService.isPending}
            className="flex items-center gap-2 px-8 py-2.5 text-sm font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 disabled:opacity-70 disabled:cursor-not-allowed transition-colors shadow-lg shadow-indigo-100"
          >
            <Save className="w-4 h-4" />
            {createService.isPending ? "Guardando..." : "Crear Servicio"}
          </button>
        </div>
      </form>
    </div>
  );
};