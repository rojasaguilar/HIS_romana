import { useState } from "react";
import { useSpecialities } from "../hooks/useSpecialities";
import { useCreateSpeciality } from "../hooks/useCreateSpeciality";
import { useUpdateSpeciality } from "../hooks/useUpdateSpeciality"; // <-- IMPORTAMOS EL NUEVO HOOK
import { Search, Plus, Filter, ChevronDown, Stethoscope } from "lucide-react";
import { SpecialityModal } from "../components/SpecialityModal";
import type { Speciality } from "../types/speciality.types";
import { useToast } from "@/shared/components/feedback/toast/ToastProvider";

export const SpecialitiesPage = () => {
  const { data: specialities, isLoading } = useSpecialities();
  
  const createSpeciality = useCreateSpeciality();
  const updateSpeciality = useUpdateSpeciality(); // <-- INICIALIZAMOS EL HOOK
  const { showToast } = useToast();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSpeciality, setSelectedSpeciality] = useState<Speciality | null>(null);

  const handleOpenCreate = () => {
    setSelectedSpeciality(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (speciality: Speciality) => {
    setSelectedSpeciality(speciality);
    setIsModalOpen(true);
  };

  const handleModalSubmit = (payload: Partial<Speciality>) => {
    if (payload.id) {
      // ES UNA ACTUALIZACIÓN
      updateSpeciality.mutate(
        { 
          id: payload.id, 
          name: payload.name!, 
          isActive: payload.isActive! 
        },
        {
          onSuccess: () => {
            showToast("Especialidad actualizada correctamente", "success");
            setIsModalOpen(false);
          },
          onError: () => {
            showToast("Error al actualizar la especialidad", "error");
          },
        }
      );
    } else {
      // ES UNA CREACIÓN
      createSpeciality.mutate(
        { 
          name: payload.name!,
          // isActive: payload.isActive! // Asegúrate de que tu createRequest también acepte este campo
        },
        {
          onSuccess: () => {
            showToast("Especialidad creada correctamente", "success");
            setIsModalOpen(false);
          },
          onError: () => {
            showToast("Error al crear la especialidad", "error");
          },
        }
      );
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-gray-500 font-medium">Cargando especialidades...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 relative">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Especialidades</h1>
          <p className="text-sm text-gray-500 mt-1">
            Gestiona el catálogo de especialidades médicas de la clínica
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" />
          Nueva Especialidad
        </button>
      </div>

      {/* Main List Container */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm flex flex-col">
        {/* Toolbar */}
        <div className="flex items-center gap-4 p-4 border-b border-gray-200">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar por nombre de especialidad..."
              className="w-full pl-9 pr-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50">
            <Filter className="w-4 h-4 text-gray-500" />
            Filtros
            <ChevronDown className="w-4 h-4 text-gray-500" />
          </button>
        </div>

        {/* List Header */}
        <div className="grid grid-cols-[1fr_200px] items-center px-6 py-3 bg-gray-50/50 border-b border-gray-200 text-xs font-semibold text-gray-500 uppercase tracking-wider">
          <span>Nombre de la Especialidad</span>
          <span>Estado</span>
        </div>

        {/* List Body */}
        <div className="flex flex-col">
          {specialities?.map((speciality) => (
            <div
              key={speciality.id}
              onClick={() => handleOpenEdit(speciality)}
              className="grid grid-cols-[1fr_200px] items-center px-6 py-4 border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer group last:border-b-0"
            >
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center flex-shrink-0 group-hover:bg-indigo-100 transition-colors">
                  <Stethoscope className="w-5 h-5" />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-sm font-semibold text-gray-900 truncate group-hover:text-indigo-600 transition-colors">
                    {speciality.name}
                  </span>
                </div>
              </div>

              <div>
                <span
                  className={`px-2.5 py-1 text-xs font-medium rounded-full ${
                    speciality.isActive
                      ? "text-green-700 bg-green-50 border border-green-200"
                      : "text-gray-600 bg-gray-100 border border-gray-200"
                  }`}
                >
                  {speciality.isActive ? "Activo" : "Inactivo"}
                </span>
              </div>
            </div>
          ))}

          {specialities?.length === 0 && (
            <div className="p-8 text-center text-gray-500 text-sm">
              No hay especialidades registradas.
            </div>
          )}
        </div>
      </div>

      {/* RENDERIZADO DEL MODAL */}
      <SpecialityModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleModalSubmit}
        initialData={selectedSpeciality}
        isLoading={createSpeciality.isPending || updateSpeciality.isPending} 
      />
    </div>
  );
};