import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useSpecialities } from "@/modules/specialities/hooks/useSpecialities";
import type { ServiceModality } from "../types/service.types";
import {
  MoveLeft,
  Activity,
  Save,
  X,
  Pencil,
  Clock,
  Banknote,
  Stethoscope,
} from "lucide-react";
import { useService, useUpdateService } from "../hooks/useService";

export const ServiceDetailsPage = () => {
  const { id } = useParams<{ id: string }>();

  // Hooks de datos
  const { data: service, isLoading, isError } = useService(id!);
  const updateService = useUpdateService();
  const { data: specialities } = useSpecialities();

  // Estado para controlar la vista
  const [isEditing, setIsEditing] = useState(false);

  // Estados del formulario local
  const [name, setName] = useState("");
  const [duration, setDuration] = useState(0);
  const [cost, setCost] = useState(0);
  const [modalities, setModalities] = useState<ServiceModality[]>([]);
  const [specialityId, setSpecialityId] = useState("");

  // Sincronizar el estado local con los datos del backend al cargar o al cancelar edición
  useEffect(() => {
    if (service) {
      setName(service.name);
      setDuration(service.duration);
      setCost(service.cost);
      setModalities(service.modalities);
      setSpecialityId(service.specialityId);
    }
  }, [service, isEditing]);

  const getSpecialityName = (specId: string) =>
    specialities?.find((s) => s.id === specId)?.name ??
    "Especialidad no asignada";

  const toggleModality = (modality: ServiceModality) => {
    setModalities((prev) =>
      prev.includes(modality)
        ? prev.filter((m) => m !== modality)
        : [...prev, modality],
    );
  };

  const handleUpdate = async () => {
    updateService.mutate(
      {
        serviceId: id!,
        data: { name, duration, cost, modalities, specialityId },
      },
      {
        onSuccess: () => {
          setIsEditing(false); // Salir del modo edición al guardar con éxito
        },
      },
    );
  };

  if (isLoading)
    return (
      <div className="p-8 text-center text-gray-500 font-medium">
        Cargando servicio...
      </div>
    );
  if (isError || !service)
    return (
      <div className="p-8 text-center text-red-500 font-medium">
        Error al cargar el servicio.
      </div>
    );

  // Clases utilitarias
  const inputClassName =
    "w-full px-4 py-2 mt-1 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-colors";
  const labelClassName =
    "block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1";

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto pb-10">
      {/* HEADER Y NAVEGACIÓN */}
      <div className="flex flex-col gap-4">
        <div>
          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-indigo-600 transition"
          >
            <MoveLeft className="w-4 h-4" />
            Volver a Servicios
          </Link>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {isEditing ? "Editar Servicio" : "Detalles del Servicio"}
            </h1>
          </div>

          {/* BOTONES DE ACCIÓN PRINCIPALES */}
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Pencil className="w-4 h-4" />
              Editar Servicio
            </button>
          ) : (
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsEditing(false)}
                disabled={updateService.isPending}
                className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <X className="w-4 h-4" />
                Cancelar
              </button>
              <button
                onClick={handleUpdate}
                disabled={updateService.isPending}
                className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 disabled:opacity-70 transition-colors shadow-sm"
              >
                <Save className="w-4 h-4" />
                {updateService.isPending ? "Guardando..." : "Guardar Cambios"}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* TARJETA PRINCIPAL DE DATOS */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
        <div className="flex items-center gap-2 mb-6 border-b border-gray-100 pb-4">
          <Activity className="w-5 h-5 text-indigo-500" />
          <h2 className="text-lg font-bold text-gray-900">
            Información del Servicio
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* NOMBRE */}
          <div className="md:col-span-2">
            <label className={labelClassName}>Nombre del Servicio</label>
            {isEditing ? (
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={inputClassName}
              />
            ) : (
              <p className="text-lg font-medium text-gray-900">
                {service.name}
              </p>
            )}
          </div>

          {/* DURACIÓN Y COSTO */}
          <div className="flex flex-col gap-2">
            <label className={labelClassName}>Duración (Minutos)</label>
            {isEditing ? (
              <input
                type="number"
                min="0"
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                className={inputClassName}
              />
            ) : (
              <div className="flex items-center gap-2 text-base text-gray-900 font-medium">
                <Clock className="w-4 h-4 text-gray-400" />
                {service.duration} min
              </div>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className={labelClassName}>Costo Base ($ MXN)</label>
            {isEditing ? (
              <input
                type="number"
                min="0"
                value={cost}
                onChange={(e) => setCost(Number(e.target.value))}
                className={inputClassName}
              />
            ) : (
              <div className="flex items-center gap-2 text-base text-gray-900 font-medium">
                <Banknote className="w-4 h-4 text-gray-400" />${service.cost}
              </div>
            )}
          </div>

          {/* ESPECIALIDAD */}
          <div className="flex flex-col gap-2">
            <label className={labelClassName}>Especialidad Relacionada</label>
            {isEditing ? (
              <select
                value={specialityId}
                onChange={(e) => setSpecialityId(e.target.value)}
                className={inputClassName}
              >
                <option value="" disabled>
                  Selecciona una especialidad
                </option>
                {specialities?.map((spec) => (
                  <option key={spec.id} value={spec.id}>
                    {spec.name}
                  </option>
                ))}
              </select>
            ) : (
              <div className="flex items-center gap-2 text-base text-indigo-600 font-medium">
                <Stethoscope className="w-4 h-4" />
                {getSpecialityName(service.specialityId)}
              </div>
            )}
          </div>

          {/* MODALIDADES */}
          <div className="flex flex-col gap-2">
            <label className={labelClassName}>Modalidades Disponibles</label>
            {isEditing ? (
              <div className="flex gap-4 mt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                    checked={modalities.includes("IN_PERSON")}
                    onChange={() => toggleModality("IN_PERSON")}
                  />
                  <span className="text-sm font-medium text-gray-700">
                    Presencial
                  </span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                    checked={modalities.includes("ONLINE")}
                    onChange={() => toggleModality("ONLINE")}
                  />
                  <span className="text-sm font-medium text-gray-700">
                    En Línea
                  </span>
                </label>
              </div>
            ) : (
              <div className="flex gap-2 mt-1">
                {service.modalities.map((mod) => (
                  <span
                    key={mod}
                    className="px-2.5 py-1 text-xs font-semibold text-gray-600 bg-gray-100 border border-gray-200 rounded-md uppercase tracking-wide"
                  >
                    {mod === "IN_PERSON" ? "Presencial" : "En Línea"}
                  </span>
                ))}
                {service.modalities.length === 0 && (
                  <span className="text-sm text-gray-400 italic">
                    Sin modalidades asignadas
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
