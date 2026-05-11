import { Link } from "react-router-dom";
import { usePatients } from "../hooks/usePatients";
import { Search, Plus, Phone, Filter, ChevronDown } from "lucide-react";
import { usePlans } from "@/modules/plans/hooks/usePlans";
import { useSubscriptions } from "@/modules/subscriptions/hooks/useSubscriptions";

export const PatientsPage = () => {
  const { data: patients, isLoading } = usePatients();
  const { data: plans } = usePlans();
  const { data: subscriptions } = useSubscriptions();

  // 2. El método de cruce
  const getPatientPlanName = (patientId: string): string => {
    const activeSubscription = subscriptions?.find(
      (subscription) =>  subscription._patientId === patientId &&
      subscription._status === "active",
    );

    if (!activeSubscription) return "Sin subscripcion";

    const plan = plans?.find((p) => p.id === activeSubscription._planId);

    return plan?.name || "Sin subscripcion";
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-gray-500 font-medium">Cargando pacientes...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {/* 1. Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Pacientes</h1>
          <p className="text-sm text-gray-500 mt-1">
            Gestiona tu directorio de clientes
          </p>
        </div>
        <Link
          to="/patients/create"
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Nuevo Paciente
        </Link>
      </div>

      {/* 2. Main List Container */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm flex flex-col">
        {/* Toolbar (Buscador y Filtros) */}
        <div className="flex items-center gap-4 p-4 border-b border-gray-200">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar por nombre, email o teléfono..."
              className="w-full pl-9 pr-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50">
            <Filter className="w-4 h-4 text-gray-500" />
            Filtros
            <ChevronDown className="w-4 h-4 text-gray-500" />
          </button>
        </div>

        {/* List Header (Grid) */}
        {/* Usamos grid con proporciones para las 5 columnas, omitiendo 'ACCIONES' como pediste */}
        <div className="grid grid-cols-[2fr_1.5fr_1.5fr_1.5fr_1fr] items-center px-6 py-3 bg-gray-50/50 border-b border-gray-200 text-xs font-semibold text-gray-500 uppercase tracking-wider">
          <span>Nombre</span>
          <span>Teléfono</span>
          <span>Suscripción</span>
          <span>Miembro Desde</span>
          <span>Estado</span>
        </div>

        {/* List Body */}
        <div className="flex flex-col">
          {patients?.map((patient) => {
            // Helper para las iniciales del avatar
            const initials =
              patient.name?.substring(0, 2).toUpperCase() || "PA";

            return (
              <Link
                key={patient.id} // <-- CORRECCIÓN: El key va en el elemento más externo del map
                to={`/patients/${patient.id}`}
                className="grid grid-cols-[2fr_1.5fr_1.5fr_1.5fr_1fr] items-center px-6 py-4 border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer group last:border-b-0"
              >
                {/* Columna Nombre */}
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-sm font-bold flex-shrink-0">
                    {initials}
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-sm font-semibold text-gray-900 truncate group-hover:text-indigo-600 transition-colors">
                      {patient.name}
                    </span>
                    <span className="text-xs text-gray-500 truncate flex items-center gap-1">
                      ✉ {patient.email}
                    </span>
                  </div>
                </div>

                {/* Columna Teléfono */}
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Phone className="w-4 h-4 text-gray-400" />
                  {patient.phoneNumber}
                </div>

                {/* Columna Suscripción (Mockup base) */}
                <div>
                  <span className="px-2.5 py-1 text-xs font-medium text-indigo-700 bg-indigo-50 rounded-full">
                    {getPatientPlanName(patient.id)}
                    {/* Reemplazar con datos reales si los tienes en 'patient' */}
                  </span>
                </div>

                {/* Columna Miembro Desde (Mockup base) */}
                <div className="text-sm text-gray-600">
                  12 Ene 2024{" "}
                  {/* Reemplazar con patient.createdAt formateado */}
                </div>

                {/* Columna Estado (Mockup base) */}
                <div>
                  <span className="px-2.5 py-1 text-xs font-medium text-green-700 bg-green-50 rounded-full">
                    activo
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Footer / Paginación */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
          <span className="text-sm text-gray-500">
            Mostrando {patients?.length || 0} de {patients?.length || 0}{" "}
            resultados
          </span>
          <div className="flex items-center gap-1">
            <button className="px-3 py-1.5 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-md hover:bg-gray-50 disabled:opacity-50">
              Anterior
            </button>
            <button className="px-3 py-1.5 text-sm font-medium text-white bg-indigo-500 rounded-md">
              1
            </button>
            <button className="px-3 py-1.5 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-md hover:bg-gray-50">
              2
            </button>
            <button className="px-3 py-1.5 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-md hover:bg-gray-50">
              Siguiente
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
