import { Link } from "react-router-dom";
import {
  CalendarClock,
  FileText,
  Pill,
  Activity,
  ChevronRight,
  AlertCircle,
} from "lucide-react";
import { usePatientEncounters } from "@/modules/encounters/hooks/useEncounter";

interface PatientEncounterHistoryProps {
  patientId?: string;
}

export const PatientEncountersList = ({
  patientId,
}: PatientEncounterHistoryProps) => {
  const {
    data: encounters,
    isLoading,
    isError,
  } = usePatientEncounters(patientId);

  console.log(encounters);

  if (isLoading) {
    return (
      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
        <p className="text-sm text-gray-500">Cargando historial de citas...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
        <p className="text-sm text-red-700">
          Ocurrió un error al cargar el historial clínico.
        </p>
      </div>
    );
  }

  if (!encounters || encounters.length === 0) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-8 flex flex-col items-center justify-center text-center">
        <div className="w-14 h-14 rounded-full bg-yellow-100 flex items-center justify-center mb-4">
          <AlertCircle className="w-7 h-7 text-yellow-600" />
        </div>

        <h3 className="text-md font-bold text-yellow-800">
          Sin citas asistidas
        </h3>

        <p className="text-sm text-yellow-700 mt-1 max-w-md">
          Este paciente aún no tiene notas clínicas finalizadas.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {encounters.map((encounter: any) => (
        <Link
          key={encounter.id}
          to={`/appointments/${encounter.appointmentId}`}
          className="group bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-blue-200 transition-all"
        >
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
            {/* INFO */}
            <div className="flex flex-col gap-4 flex-1">
              {/* HEADER */}
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-700 transition-colors">
                    {encounter.preliminaryDiagnosis ||
                      "Consulta médica registrada"}
                  </h3>

                  <div className="flex items-center gap-1.5 mt-1 text-sm text-gray-500">
                    <CalendarClock className="w-4 h-4" />

                    <span>
                      {/* {new Date(
                        encounter.createdAt || encounter.updatedAt,
                      ).toLocaleString()} */}
                      {encounter?.createdAt}
                    </span>
                  </div>
                </div>

                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors shrink-0" />
              </div>

              {/* SÍNTOMAS */}
              <div className="bg-gray-50 border border-gray-100 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Activity className="w-4 h-4 text-gray-500" />

                  <span className="text-sm font-semibold text-gray-700">
                    Motivo de consulta
                  </span>
                </div>

                <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
                  {encounter.symptoms || "Sin síntomas registrados"}
                </p>
              </div>

              {/* FOOTER */}
              <div className="flex flex-wrap gap-3">
                <div className="flex items-center gap-2 px-3 py-2 bg-blue-50 border border-blue-100 rounded-xl">
                  <Pill className="w-4 h-4 text-blue-600" />

                  <span className="text-xs font-medium text-blue-700">
                    {encounter.prescriptions?.length || 0} medicamento(s)
                  </span>
                </div>

                <div className="flex items-center gap-2 px-3 py-2 bg-purple-50 border border-purple-100 rounded-xl">
                  <FileText className="w-4 h-4 text-purple-600" />

                  <span className="text-xs font-medium text-purple-700">
                    {encounter.labTests?.length || 0} estudio(s)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};
