import { useState } from "react";
import { useEncounterByAppointment } from "../hooks/useEncounter";
import {
  Activity,
  CalendarClock,
  FileText,
  Pill,
  PlusCircle,
} from "lucide-react"; // Asumiendo que usas Lucide
import { EncounterForm } from "./EncounterForm";

export const EncounterSection = ({
  appointment,
  isMedic,
}: {
  appointment: any;
  isMedic: boolean;
}) => {
  const { data: encounter, isLoading } = useEncounterByAppointment(
    appointment.id,
  );

  // Estado para controlar si mostramos el botón o el formulario
  const [isEditing, setIsEditing] = useState(false);

  if (isLoading) {
    return (
      <div className="p-6 text-center text-gray-500">
        Cargando nota clínica...
      </div>
    );
  }

  // Si no hay nota
  if (!encounter) {
    return (
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Nota Clínica</h3>

        {!isEditing ? (
          <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50">
            <p className="text-sm text-gray-500 mb-4 text-center">
              Aún no has llenado la nota para esta cita.
            </p>
            {isMedic && (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <PlusCircle className="w-4 h-4" />
                Comenzar a llenar nota
              </button>
            )}
          </div>
        ) : (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
            {/* Aquí renderizas tu componente de formulario de creación */}
            {/* Pásale setIsEditing para que el form pueda cerrarse al cancelar o guardar */}
            <div className="p-4 bg-blue-50 border border-blue-100 rounded-lg text-blue-700 text-sm mb-4">
              <EncounterForm
                appointment={appointment}
                onCancel={() => setIsEditing(false)}
              />
            </div>

            <button
              onClick={() => setIsEditing(false)}
              className="text-sm font-medium text-red-600 hover:text-red-700"
            >
              Cancelar
            </button>
          </div>
        )}
      </div>
    );
  }

  // Si hay nota, la mostramos (modo lectura)
  // Si hay nota, la mostramos (modo lectura)
  if (encounter) {
    return (
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 mt-6">
        <div className="flex items-center gap-2 mb-6 border-b border-gray-100 pb-4">
          <FileText className="w-6 h-6 text-blue-600" />
          <h3 className="text-xl font-bold text-gray-900">
            Nota Clínica de la Sesión
          </h3>
        </div>

        <div className="flex flex-col gap-6">
          {/* SECCIÓN DE EVALUACIÓN CLÍNICA */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-1.5">
              <h4 className="flex items-center gap-1.5 text-sm font-semibold text-gray-700">
                <Activity className="w-4 h-4 text-gray-400" /> Síntomas / Motivo
              </h4>
              <p className="text-sm text-gray-600 bg-gray-50 p-3.5 rounded-xl border border-gray-100 leading-relaxed h-full">
                {encounter.symptoms || "No especificado"}
              </p>
            </div>

            <div className="flex flex-col gap-1.5">
              <h4 className="flex items-center gap-1.5 text-sm font-semibold text-gray-700">
                <FileText className="w-4 h-4 text-gray-400" /> Diagnóstico
                Preliminar
              </h4>
              <p className="text-sm text-gray-600 bg-gray-50 p-3.5 rounded-xl border border-gray-100 leading-relaxed h-full">
                {encounter.preliminaryDiagnosis || "No especificado"}
              </p>
            </div>

            <div className="flex flex-col gap-1.5">
              <h4 className="flex items-center gap-1.5 text-sm font-semibold text-gray-700">
                <FileText className="w-4 h-4 text-gray-400" /> Diagnóstico
                Diferencial
              </h4>
              <p className="text-sm text-gray-600 bg-gray-50 p-3.5 rounded-xl border border-gray-100 leading-relaxed h-full">
                {encounter.differentialDiagnosis || "No especificado"}
              </p>
            </div>

            <div className="flex flex-col gap-1.5">
              <h4 className="flex items-center gap-1.5 text-sm font-semibold text-gray-700">
                <FileText className="w-4 h-4 text-gray-400" /> Notas Adicionales
              </h4>
              <p className="text-sm text-gray-600 bg-gray-50 p-3.5 rounded-xl border border-gray-100 leading-relaxed h-full">
                {encounter.notes || "Sin notas adicionales"}
              </p>
            </div>
          </div>

          {/* SECCIÓN DE TRATAMIENTO Y RECETA */}
          <div className="pt-6 border-t border-gray-100">
            <h4 className="flex items-center gap-2 text-md font-bold text-gray-800 mb-4">
              <Pill className="w-5 h-5 text-blue-600" /> Tratamiento Recetado
            </h4>

            {!encounter.prescriptions ||
            encounter.prescriptions.length === 0 ? (
              <p className="text-sm text-gray-500 italic bg-gray-50 p-4 rounded-xl text-center border border-dashed border-gray-200">
                No se recetaron medicamentos en esta sesión.
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {encounter.prescriptions.map((p: any, idx: number) => (
                  <div
                    key={idx}
                    className="p-4 bg-white border border-gray-200 rounded-xl shadow-sm flex flex-col gap-2.5 relative overflow-hidden transition-all hover:shadow-md hover:border-blue-200"
                  >
                    <div className="absolute top-0 left-0 w-1 h-full bg-blue-500"></div>

                    <div className="flex justify-between items-start gap-2">
                      <span className="font-bold text-gray-900 leading-tight">
                        {p.medicationName}
                      </span>
                      <span className="shrink-0 text-xs font-bold text-blue-700 bg-blue-50 px-2 py-1 rounded-md border border-blue-100">
                        {p.dosage?.amount} {p.dosage?.unit}
                      </span>
                    </div>

                    <div className="text-sm text-gray-600 flex flex-col gap-1">
                      <span className="flex items-baseline gap-1">
                        <span className="font-medium text-gray-700 text-xs uppercase tracking-wider">
                          Frecuencia:
                        </span>
                        {p.frequency}
                      </span>
                    </div>

                    <div className="flex items-center justify-center gap-1.5 text-xs font-medium text-gray-500 mt-1 bg-gray-50 p-1.5 rounded-md">
                      <CalendarClock className="w-3.5 h-3.5 text-gray-400" />
                      <span>{new Date(p.startDate).toLocaleDateString()}</span>
                      <span>-</span>
                      <span>{new Date(p.endDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return null;
};
