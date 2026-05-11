import { useParams, Link } from "react-router-dom";
import { useAppointmentDetails } from "../hooks/useAppointment";
// Asumiendo las rutas de tus otros módulos:
import { useServices } from "@/modules/services/hooks/useServices";
import { usePatients } from "@/modules/patients/hooks/usePatients";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import {
  MoveLeft,
  User,
  Stethoscope,
  Calendar,
  Clock,
  CalendarClock,
  FileText,
  Banknote,
  CheckCircle2,
  Clock4,
} from "lucide-react";

export const AppointmentDetailsPage = () => {
  const { id } = useParams<{ id: string }>();

  console.log(id);

  // 1. Obtenemos la data de la cita
  const { data: appointment, isLoading: loadingAppointment } =
    useAppointmentDetails(id!);

  // 2. Obtenemos los catálogos para cruzar la info
  const { data: services, isLoading: loadingServices } = useServices();
  const { data: patients, isLoading: loadingPatients } = usePatients();

  if (loadingAppointment || loadingServices || loadingPatients) {
    return (
      <div className="p-8 text-center text-gray-500">
        Cargando detalles de la cita...
      </div>
    );
  }

  if (!appointment) {
    return (
      <div className="p-8 text-center text-red-500">
        No se encontró la cita.
      </div>
    );
  }

  // Funciones de cruce
  const getServiceName = (serviceId: string) =>
    services?.find((s: any) => s.id === serviceId)?.name ||
    "Servicio no encontrado";

  const getPatientName = (patientId: string) =>
    patients?.find((p: any) => p.id === patientId)?.name ||
    "Paciente no encontrado";

  // Helpers visuales
  const startDate = new Date(appointment.startDate);
  const endTime = new Date(appointment.endTime);
  const serviceName = getServiceName(appointment.serviceId);
  const patientName = getPatientName(appointment.patientId);

  return (
    <div className="flex flex-col gap-6 p-6 bg-gray-50 min-h-screen">
      {/* HEADER DE LA PÁGINA Y NAVEGACIÓN */}
      <div className="flex flex-col gap-4">
        <div>
          <Link
            to="/appointments"
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-blue-600 transition"
          >
            <MoveLeft className="w-4 h-4" />
            Volver a Citas
          </Link>
        </div>

        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-extrabold text-gray-950">
            Detalles de la Cita
          </h1>

          {/* BOTÓN REAGENDAR */}
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-blue-700 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors">
            <CalendarClock className="w-4 h-4" />
            Reagendar Cita
          </button>
        </div>
      </div>

      {/* TARJETA PRINCIPAL DE INFORMACIÓN */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 flex flex-col gap-6">
        {/* Cabecera de la Tarjeta (Servicio y Estado) */}
        <div className="flex items-center justify-between border-b border-gray-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
              <Stethoscope className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">{serviceName}</h2>
              <span className="text-sm font-medium text-gray-500">
                Modalidad:{" "}
                {appointment.type === "IN_PERSON" ? "Presencial" : "En línea"}
              </span>
            </div>
          </div>

          {/* Badge de Estado Dinámico */}
          {appointment.status === "PROGRAMADA" ? (
            <span className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-blue-700 bg-blue-50 rounded-full border border-blue-100">
              <Clock4 className="w-4 h-4" /> Programada
            </span>
          ) : (
            <span className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-green-700 bg-green-50 rounded-full border border-green-100">
              <CheckCircle2 className="w-4 h-4" /> Completada
            </span>
          )}
        </div>

        {/* Grid de Detalles */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Columna Izquierda: Paciente y Finanzas */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Paciente
              </span>
              <span className="flex items-center gap-2 text-base font-medium text-gray-900">
                <User className="w-4 h-4 text-gray-400" />
                {patientName}
              </span>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Costo / Origen
              </span>
              <span className="flex items-center gap-2 text-base font-medium text-gray-900">
                <Banknote className="w-4 h-4 text-gray-400" />$
                {appointment.patientCharge} MXN ({appointment.billing.source})
              </span>
            </div>
          </div>

          {/* Columna Derecha: Fechas y Horas */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Fecha Programada
              </span>
              <span className="flex items-center gap-2 text-base font-medium text-gray-900">
                <Calendar className="w-4 h-4 text-gray-400" />
                {format(startDate, "EEEE, dd 'de' MMMM yyyy", { locale: es })}
              </span>
            </div>

            <div className="flex gap-8">
              <div className="flex flex-col gap-1">
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Hora Inicio
                </span>
                <span className="flex items-center gap-2 text-base font-medium text-gray-900">
                  <Clock className="w-4 h-4 text-gray-400" />
                  {format(startDate, "hh:mm a")}
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Hora Fin
                </span>
                <span className="flex items-center gap-2 text-base font-medium text-gray-900">
                  <Clock className="w-4 h-4 text-gray-400" />
                  {format(endTime, "hh:mm a")}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Sección de Notas (Si existen) */}
        {appointment.preNotes && (
          <div className="mt-4 p-4 bg-gray-50 border border-gray-100 rounded-xl">
            <div className="flex items-center gap-2 mb-2">
              <FileText className="w-4 h-4 text-gray-500" />
              <h3 className="text-sm font-bold text-gray-700">Notas previas</h3>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              {appointment.preNotes}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
