import { Link } from "react-router-dom";
import { useServices } from "../hooks/useServices";
import { useSpecialities } from "@/modules/specialities/hooks/useSpecialities";
import { Search, Plus, Filter, ChevronDown, Activity, Clock, Banknote, Stethoscope } from "lucide-react";

export const ServicesPage = () => {
  const { data: services, isLoading, isError } = useServices();
  const { data: specialities } = useSpecialities();

  const getSpecialityName = (specialityId: string) => {
    return (
      specialities?.find((speciality) => speciality.id === specialityId)?.name ?? "General"
    );
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-gray-500 font-medium">Cargando servicios...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-red-500 font-medium">Error al cargar el catálogo de servicios.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      
      {/* 1. Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Servicios</h1>
          <p className="text-sm text-gray-500 mt-1">Gestiona el catálogo de consultas, procedimientos y estudios</p>
        </div>
        <Link 
          to="/services/create"
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Nuevo Servicio
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
              placeholder="Buscar servicio por nombre..." 
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
        <div className="grid grid-cols-[2.5fr_1fr_1fr_1.5fr_1.5fr] items-center px-6 py-3 bg-gray-50/50 border-b border-gray-200 text-xs font-semibold text-gray-500 uppercase tracking-wider">
          <span>Nombre del Servicio</span>
          <span>Duración</span>
          <span>Costo Base</span>
          <span>Modalidades</span>
          <span>Especialidad</span>
        </div>

        {/* List Body */}
        <div className="flex flex-col">
          {services?.map((service) => (
            <Link
              key={service.id}
              to={`/services/${service.id}`}
              className="grid grid-cols-[2.5fr_1fr_1fr_1.5fr_1.5fr] items-center px-6 py-4 border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer group last:border-b-0"
            >
              {/* Columna Nombre */}
              <div className="flex items-center gap-3 overflow-hidden pr-4">
                {/* <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center flex-shrink-0"> */}
                  {/* <Activity className="w-5 h-5" /> */}
                {/* </div> */}
                <span className="text-sm font-bold text-gray-900 group-hover:text-indigo-600 transition-colors truncate">
                  {service.name}
                </span>
              </div>

              {/* Columna Duración */}
              <div className="flex items-center gap-1.5 text-sm font-medium text-gray-700">
                <Clock className="w-4 h-4 text-gray-400" />
                {service.duration} min
              </div>

              {/* Columna Costo */}
              <div className="flex items-center gap-1.5 text-sm font-medium text-gray-900">
                <Banknote className="w-4 h-4 text-gray-400" />
                ${service.cost}
              </div>

              {/* Columna Modalidades (Convertidas en Badges) */}
              <div className="flex flex-wrap gap-1.5 pr-4">
                {service.modalities.map((modality, index) => (
                  <span 
                    key={index}
                    className="px-2 py-0.5 text-[10px] font-semibold text-gray-600 bg-gray-100 border border-gray-200 rounded-md uppercase tracking-wide"
                  >
                    {modality}
                  </span>
                ))}
              </div>

              {/* Columna Especialidad */}
              <div className="flex items-center gap-2 text-sm text-indigo-600 font-medium truncate">
                <Stethoscope className="w-4 h-4 flex-shrink-0" />
                <span className="truncate">{getSpecialityName(service.specialityId)}</span>
              </div>
            </Link>
          ))}

          {services?.length === 0 && (
            <div className="p-8 text-center text-gray-500 text-sm">
              No hay servicios registrados en el sistema.
            </div>
          )}
        </div>

        {/* Footer / Paginación */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
          <span className="text-sm text-gray-500">
            Mostrando {services?.length || 0} de {services?.length || 0} resultados
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