import { Link } from "react-router-dom";
import { useMedics } from "../hooks/useMedics";
import { useSpecialities } from "@/modules/specialities/hooks/useSpecialities";
import { Search, Plus, Phone, Filter, ChevronDown, GraduationCap, Mail } from "lucide-react";

export const MedicsPage = () => {
  const { data: medics, isLoading, isError } = useMedics();
  const { data: specialities } = useSpecialities();

  const getSpecialityName = (specialityId: string) =>
    specialities?.find((spec) => spec.id === specialityId)?.name ?? "GENERAL";

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-gray-500 font-medium">Cargando médicos...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-red-500 font-medium">Error al cargar la lista de médicos.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      
      {/* 1. Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Médicos</h1>
          <p className="text-sm text-gray-500 mt-1">Gestiona el personal médico de la clínica</p>
        </div>
        <Link 
          to="/medics/create"
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Nuevo Médico
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

        {/* List Header (Grid) - Proporciones ajustadas */}
        <div className="grid grid-cols-[2fr_2fr_1fr_1.5fr_1fr_1fr] items-center px-6 py-3 bg-gray-50/50 border-b border-gray-200 text-xs font-semibold text-gray-500 uppercase tracking-wider">
          <span>Médico / Especialidad</span>
          <span>Contacto</span>
          <span>Tipo</span>
          <span>Escuela de Medicina</span>
          <span>Honorarios</span>
          <span>Estado</span>
        </div>

        {/* List Body */}
        <div className="flex flex-col">
          {medics?.map((medic) => {
            const initials = medic.name?.substring(0, 2).toUpperCase() || "MD";
            const specialitiesText = medic.specialityIds?.map((spec) => getSpecialityName(spec)).join(", ");

            return (
              <Link
                key={medic.id}
                to={`/medics/${medic.id}`}
                className="grid grid-cols-[2fr_2fr_1fr_1.5fr_1fr_1fr] items-center px-6 py-4 border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer group last:border-b-0"
              >
                {/* Columna Nombre y Especialidad (Sin el email) */}
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-sm font-bold flex-shrink-0">
                    {initials}
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-sm font-semibold text-gray-900 truncate group-hover:text-indigo-600 transition-colors">
                      Dr. {medic.name}
                    </span>
                    <span className="text-xs font-medium text-indigo-500 truncate mt-0.5">
                      {specialitiesText || "General"}
                    </span>
                  </div>
                </div>

                {/* Columna Contacto (Email y Teléfono juntos) */}
                <div className="flex flex-col gap-1 min-w-0 pr-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600 truncate">
                    <Mail className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                    <span className="truncate">{medic.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 truncate">
                    <Phone className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                    <span className="truncate">{medic.phoneNumber}</span>
                  </div>
                </div>

                {/* Columna Tipo */}
                <div>
                  <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${
                    medic.type === 'INTERNAL' ? 'text-purple-700 bg-purple-50' : 'text-orange-700 bg-orange-50'
                  }`}>
                    {medic.type}
                  </span>
                </div>

                {/* Columna Escuela */}
                <div className="flex items-center gap-2 text-sm text-gray-600 truncate pr-4">
                  <GraduationCap className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  <span className="truncate">{medic.medicalSchool}</span>
                </div>

                {/* Columna Honorarios */}
                <div className="text-sm font-medium text-gray-700">
                  {medic.consultationFee}%
                </div>

                {/* Columna Estado */}
                <div>
                  <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${
                    medic.isActive ? 'text-green-700 bg-green-50' : 'text-red-700 bg-red-50'
                  }`}>
                    {medic.isActive ? 'Activo' : 'Inactivo'}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Footer / Paginación */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
          <span className="text-sm text-gray-500">
            Mostrando {medics?.length || 0} de {medics?.length || 0} resultados
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