import { Link } from "react-router-dom";
import { useSubscriptions } from "../hooks/useSubscriptions";
import { usePatients } from "@/modules/patients/hooks/usePatients";
import { usePlans } from "@/modules/plans/hooks/usePlans";
import { Search, Plus, Filter, ChevronDown, User, Calendar, ShieldCheck } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";

export const SubscriptionsPage = () => {
  const { data: subscriptions, isLoading } = useSubscriptions();
  const { data: patients } = usePatients();
  const { data: plans } = usePlans();

  // Lógica intacta, respetando tus propiedades
  const getPatientName = (patientId: string) => {
    return patients?.find((p) => p.id === patientId)?.name ?? "Desconocido";
  };

  const getPlanName = (planId: string) => {
    return plans?.find((p) => p.id === planId)?.name ?? "Plan Desconocido";
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-gray-500 font-medium">Cargando suscripciones...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      
      {/* 1. Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Suscripciones</h1>
          <p className="text-sm text-gray-500 mt-1">Gestiona los planes y membresías activas de los pacientes</p>
        </div>
        <Link 
          to="/subscriptions/create"
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Suscribir paciente
        </Link>
      </div>

      {/* 2. Main List Container */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm flex flex-col">
        
        {/* Toolbar */}
        <div className="flex items-center gap-4 p-4 border-b border-gray-200">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Buscar por paciente o plan..." 
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
        <div className="grid grid-cols-[2fr_1.5fr_1fr_1fr_1fr_1fr] items-center px-6 py-3 bg-gray-50/50 border-b border-gray-200 text-xs font-semibold text-gray-500 uppercase tracking-wider">
          <span>Paciente</span>
          <span>Plan</span>
          <span>Duración</span>
          <span>Estado</span>
          <span>Inicio</span>
          <span>Vencimiento</span>
        </div>

        {/* List Body */}
        <div className="flex flex-col">
          {subscriptions?.map((subscription) => {
            // Manejo de fechas seguro
            const startDate = new Date(subscription._startDate);
            const endDate = new Date(subscription._endDate);

            return (
              <div
                key={subscription.id}
                className="grid grid-cols-[2fr_1.5fr_1fr_1fr_1fr_1fr] items-center px-6 py-4 border-b border-gray-100 hover:bg-gray-50 transition-colors last:border-b-0"
              >
                {/* Columna Paciente */}
                <div className="flex items-center gap-3 overflow-hidden pr-4">
                  <div className="w-8 h-8 rounded-full bg-indigo-50 text-indigo-500 flex items-center justify-center flex-shrink-0">
                    <User className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-semibold text-gray-900 truncate">
                    {getPatientName(subscription._patientId)}
                  </span>
                </div>

                {/* Columna Plan */}
                <div className="flex items-center gap-2 text-sm font-medium text-indigo-600 truncate pr-4">
                  <ShieldCheck className="w-4 h-4 flex-shrink-0" />
                  <span className="truncate">{getPlanName(subscription._planId)}</span>
                </div>

                {/* Columna Versión / Duración */}
                <div className="text-sm text-gray-600">
                  {subscription._durationInMonths} meses
                </div>

                {/* Columna Estado */}
                <div>
                  <span className={`px-2.5 py-1 text-xs font-medium rounded-full border ${
                    subscription._status === 'ACTIVE' || subscription._status === 'ACTIVO' // Ajusta según tu enum real
                      ? 'text-green-700 bg-green-50 border-green-100'
                      : 'text-gray-700 bg-gray-100 border-gray-200'
                  }`}>
                    {subscription._status}
                  </span>
                </div>

                {/* Columna Inicio */}
                <div className="flex items-center gap-1.5 text-sm text-gray-600">
                  <Calendar className="w-3.5 h-3.5 text-gray-400" />
                  {format(startDate, "dd MMM yyyy", { locale: es })}
                </div>

                {/* Columna Fin (Vencimiento) */}
                <div className="flex items-center gap-1.5 text-sm font-medium text-gray-900">
                  <Calendar className="w-3.5 h-3.5 text-gray-400" />
                  {format(endDate, "dd MMM yyyy", { locale: es })}
                </div>
              </div>
            );
          })}

          {subscriptions?.length === 0 && (
            <div className="p-8 text-center text-gray-500 text-sm">
              No hay suscripciones registradas.
            </div>
          )}
        </div>

        {/* Footer / Paginación */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
          <span className="text-sm text-gray-500">
            Mostrando {subscriptions?.length || 0} de {subscriptions?.length || 0} resultados
          </span>
          <div className="flex items-center gap-1">
            <button className="px-3 py-1.5 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-md hover:bg-gray-50 disabled:opacity-50">
              Anterior
            </button>
            <button className="px-3 py-1.5 text-sm font-medium text-white bg-indigo-500 rounded-md">
              1
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