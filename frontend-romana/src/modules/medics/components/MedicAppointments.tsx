import { useMedicAppointments } from "../hooks/useMedic";
import {
  User,
  Calendar,
  Clock,
  Clock4,
  CheckCircle2,
  ChevronRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { useServices } from "@/modules/services/hooks/useServices";
import { usePatients } from "@/modules/patients/hooks/usePatients";

interface Props {
  medicId: string;
}

// Interfaz adaptada a tu payload real
interface AppointmentPayload {
  id: string;
  startDate: string;
  endTime: string;
  patientId: string | any; // 'any' temporal por si haces el populate con un objeto
  medicId: string;
  serviceId: string | any;
  status: "PROGRAMADA" | "COMPLETADA" | "CANCELADA"; // Ajusta según tus enums
  type: string;
}

export const MedicAppointments = ({ medicId }: Props) => {
  const {
    data: appointments,
    isLoading,
    isError,
  } = useMedicAppointments(medicId);

  const { data: services } = useServices();
  const { data: patients } = usePatients();

  const getServiceName = (serviceId: string) =>
    services?.find((s) => s.id === serviceId)?.name;

  const getPatientName = (patientId: string) =>
    patients?.find((p) => p.id === patientId)?.name;

  // Helper para pintar el badge de estado dinámicamente según lo que escupa el backend
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "PROGRAMADA":
        return (
          <span className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-blue-700 bg-blue-50 rounded-full border border-blue-100">
            <Clock4 className="w-3.5 h-3.5" /> Programada
          </span>
        );
      case "COMPLETADA":
        return (
          <span className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-green-700 bg-green-50 rounded-full border border-green-100">
            <CheckCircle2 className="w-3.5 h-3.5" /> Completada
          </span>
        );
      default:
        return (
          <span className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-gray-700 bg-gray-100 rounded-full">
            {status}
          </span>
        );
    }
  };

  if (isLoading)
    return (
      <div className="p-8 text-center text-gray-500">
        Cargando historial de citas...
      </div>
    );
  if (isError)
    return (
      <div className="p-8 text-center text-red-500">
        Error al cargar las citas.
      </div>
    );

  return (
    <div className="flex flex-col mt-6">
      {/* Tab Header */}
      <div className="flex border-b border-gray-200 mb-6">
        <button className="px-4 py-3 text-sm font-semibold text-blue-600 border-b-2 border-blue-600">
          Historial de Citas
        </button>
      </div>

      {/* Lista de Citas */}
      <div className="flex flex-col gap-4">
        {appointments?.length === 0 ? (
          <p className="text-gray-500 text-sm">
            No hay citas registradas para este médico.
          </p>
        ) : (
          appointments?.map((appointment: AppointmentPayload) => {
            const start = new Date(appointment.startDate);

            return (
              // TODA la tarjeta es ahora un componente <Link>
              <Link
                key={appointment.id}
                to={`/appointments/${appointment.id}`}
                className="group flex items-center justify-between p-5 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md hover:border-blue-200 transition-all duration-200 cursor-pointer"
              >
                <div className="flex flex-col gap-2.5">
                  {/* Fila 1: Título (Service) y Estado */}
                  <div className="flex items-center gap-3">
                    <h3 className="text-base font-semibold text-gray-900 group-hover:text-blue-700 transition-colors">
                      {/* Asumiendo que harás populate de serviceId.name, si no, mostramos el ID */}
                      {getServiceName(appointment.serviceId)}
                    </h3>
                    {getStatusBadge(appointment.status)}
                  </div>

                  {/* Fila 2: Detalles (Paciente, Fecha, Hora de inicio) */}
                  <div className="flex items-center gap-6 text-sm text-gray-500">
                    <span className="flex items-center gap-1.5">
                      <User className="w-4 h-4 text-gray-400" />
                      {/* Asumiendo populate de patientId.name */}
                      <span className="font-medium text-gray-700">
                        {getPatientName(appointment.patientId)}
                      </span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      {format(start, "dd MMM yyyy", { locale: es })}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-gray-400" />
                      {format(start, "hh:mm a")}
                    </span>
                  </div>
                </div>

                {/* Indicador visual de que es clickeable */}
                <div className="flex items-center gap-1 text-sm font-medium text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">
                  Ver detalles
                  <ChevronRight className="w-4 h-4" />
                </div>
              </Link>
            );
          })
        )}
      </div>
    </div>
  );
};
