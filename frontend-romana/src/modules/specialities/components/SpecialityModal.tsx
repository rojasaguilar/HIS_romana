import { useState, useEffect } from "react";
import { X } from "lucide-react";
import type { Speciality } from "../types/speciality.types";


interface SpecialityModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Partial<Speciality>) => void;
  initialData?: Speciality | null;
  isLoading?: boolean;
}

export const SpecialityModal = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  isLoading = false,
}: SpecialityModalProps) => {
  const [name, setName] = useState("");
  const [isActive, setIsActive] = useState(true);

  // Sincronizar el estado local cuando se abre el modal o cambia la data inicial
  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setName(initialData.name);
        setIsActive(initialData.isActive);
      } else {
        setName("");
        setIsActive(true); // Por defecto, una nueva especialidad está activa
      }
    }
  }, [isOpen, initialData]);

  if (!isOpen) return null;

  const isEditing = !!initialData;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) return; // Aquí podrías meter un toast de error si quieres

    // Si es edición mandamos el ID, si es creación no
    const payload: Partial<Speciality> = isEditing 
      ? { id: initialData.id, name: name.trim(), isActive }
      : { name: name.trim(), isActive };

    onSubmit(payload);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h3 className="text-lg font-bold text-gray-900">
            {isEditing ? "Editar Especialidad" : "Nueva Especialidad"}
          </h3>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
            disabled={isLoading}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body/Form */}
        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="specialityName" className="text-sm font-semibold text-gray-700">
              Nombre de la especialidad *
            </label>
            <input
              id="specialityName"
              type="text"
              required
              autoFocus
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ej. Cardiología, Pediatría..."
              className="w-full px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-colors"
              disabled={isLoading}
            />
          </div>

          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-xl bg-gray-50/50 mt-2">
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-gray-900">Estado de la especialidad</span>
              <span className="text-xs text-gray-500">
                {isActive ? "Visible para asignar a médicos" : "Oculta temporalmente"}
              </span>
            </div>
            
            {/* Toggle Switch Personalizado */}
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer" 
                checked={isActive}
                onChange={(e) => setIsActive(e.target.checked)}
                disabled={isLoading}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
            </label>
          </div>

          {/* Footer / Actions */}
          <div className="flex items-center justify-end gap-3 mt-4 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              disabled={isLoading}
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isLoading || !name.trim()}
              className="px-5 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
            >
              {isLoading 
                ? "Guardando..." 
                : isEditing ? "Guardar cambios" : "Crear especialidad"
              }
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};