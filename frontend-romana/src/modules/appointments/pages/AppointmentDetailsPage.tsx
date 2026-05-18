import { useParams, Link } from "react-router-dom";
import { useAppointmentDetails } from "../hooks/useAppointment";
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
import { useAuthStore } from "@/modules/auth/store/auth.store";
import { useCompleteAppointment } from "../hooks/useCompleteAppointment";
import { useRescheduleAppointment } from "../hooks/useRescheduleAppointment";
import { useToast } from "@/shared/components/feedback/toast/ToastProvider";
import { useState, type SetStateAction } from "react";
import { ConfirmModal } from "@/shared/components/feedback/modal/ConfirmModal";
import { EncounterSection } from "@/modules/encounters/components/EncounterSection";
import DatePicker from "react-datepicker";

// IMPORTAMOS EL NUEVO COMPONENTE CLINICO

export const AppointmentDetailsPage = () => {
  const { id } = useParams<{ id: string }>();

  const completeAppointment = useCompleteAppointment();
  const rescheduleAppointment = useRescheduleAppointment();

  const [openCompleteModal, setOpenCompleteModal] = useState(false);
  const [openRescheduleModal, setOpenRescheduleModal] = useState(false);
  const [newStartDate, setNewStartDate] = useState("");

  const { showToast } = useToast();
  const user = useAuthStore((state) => state.user);
  const isMedic = user?.roles.includes("MEDIC") ?? false;

  console.log(isMedic);

  const { data: appointment, isLoading: loadingAppointment } =
    useAppointmentDetails(id!);
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

  const getServiceName = (serviceId: string) =>
    services?.find((s: any) => s.id === serviceId)?.name ||
    "Servicio no encontrado";

  const getPatientName = (patientId: string) =>
    patients?.find((p: any) => p.id === patientId)?.name ||
    "Paciente no encontrado";

  const startDate = new Date(appointment.startDate);
  const endTime = new Date(appointment.endTime);
  const serviceName = getServiceName(appointment.serviceId);
  const patientName = getPatientName(appointment.patientId);

  return (
    <div className="flex flex-col gap-6 p-6 bg-gray-50 min-h-screen">
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

          <div className="flex items-center gap-3">
            {appointment.status === "PROGRAMADA" && (
              <button
                onClick={() => setOpenRescheduleModal(true)}
                className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-blue-700 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors"
              >
                <CalendarClock className="w-4 h-4" />
                Reagendar Cita
              </button>
            )}

            {isMedic && appointment.status === "PROGRAMADA" && (
              <button
                onClick={() => setOpenCompleteModal(true)}
                className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-green-700 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors"
              >
                <CheckCircle2 className="w-4 h-4" />
                Marcar como completada
              </button>
            )}
          </div>
        </div>
      </div>

      {/* TARJETA DE LA CITA ADMINISTRATIVA */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 flex flex-col gap-6">
        <div className="flex items-center justify-between border-b border-gray-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
              <Stethoscope className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">
                Servicio a realizar: {serviceName}
              </h2>
              <span className="text-sm font-medium text-gray-500">
                Modalidad:{" "}
                {appointment.type === "IN_PERSON" ? "Presencial" : "En línea"}
              </span>
            </div>
          </div>

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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Paciente
              </span>
              <Link
                to={`/patients/${appointment.patientId}`}
                className="flex items-center gap-2 text-base font-medium text-gray-900"
              >
                <User className="w-4 h-4 text-gray-400" />
                {patientName}
              </Link>
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

      {/* SECCIÓN CLÍNICA (ENCOUNTER) - SE MUESTRA SI LA CITA ESTÁ COMPLETADA */}
      {/* {appointment.status === "COMPLETADA" && (
        <EncounterSection appointment={appointment} isMedic={isMedic} />
        )} */}
      <EncounterSection appointment={appointment} isMedic={isMedic} />

      {/* MODALES */}
      <ConfirmModal
        open={openCompleteModal}
        title="Completar cita"
        message="¿Seguro que deseas marcar esta cita como completada?"
        confirmText="Completar"
        loading={completeAppointment.isPending}
        onCancel={() => setOpenCompleteModal(false)}
        onConfirm={() => {
          completeAppointment.mutate(appointment.id, {
            onSuccess: () => {
              setOpenCompleteModal(false);
              showToast("Cita completada correctamente", "success");
            },
            onError: () => {
              showToast("Error al completar cita", "error");
            },
          });
        }}
      />

      {openRescheduleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Reagendar Cita
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              Selecciona la nueva fecha y hora de inicio para esta cita.
            </p>

            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Nueva Fecha y Hora
              </label>
              {/* <input
                type="datetime-local"
                value={newStartDate}
                onChange={(e) => setNewStartDate(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
              /> */}

              <DatePicker
                selected={
                  newStartDate
                    ? new Date(newStartDate)
                    : startDate
                      ? new Date(startDate)
                      : null
                }
                onChange={(date: Date | null) => {
                  setNewStartDate(date);
                }}
                showTimeSelect
                timeIntervals={30}
                dateFormat="MMMM d, yyyy h:mm aa"
                inline
                minDate={startDate ? new Date(startDate) : new Date()}
                minTime={
                  newStartDate &&
                  startDate &&
                  new Date(newStartDate).toDateString() ===
                    new Date(startDate).toDateString()
                    ? new Date(startDate)
                    : new Date(new Date().setHours(8, 0, 0, 0))
                }
                maxTime={new Date(new Date().setHours(18, 0, 0, 0))}
                calendarClassName="!border-none !shadow-none !font-sans !bg-transparent"
                dayClassName={() =>
                  "hover:!bg-indigo-100 !rounded-lg transition-colors"
                }
                timeClassName={() =>
                  "hover:!bg-indigo-600 hover:!text-white !rounded-md !font-medium transition-all"
                }
              />
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setOpenRescheduleModal(false)}
                className="px-4 py-2 text-sm font-semibold text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  if (!newStartDate) {
                    showToast("Selecciona una fecha válida", "error");
                    return;
                  }

                  rescheduleAppointment.mutate(
                    { id: appointment.id, startDate: new Date(newStartDate) },
                    {
                      onSuccess: () => {
                        setOpenRescheduleModal(false);
                        setNewStartDate("");
                        showToast("Cita reagendada correctamente", "success");
                      },
                      onError: () => {
                        showToast("Error al reagendar la cita", "error");
                      },
                    },
                  );
                }}
                disabled={rescheduleAppointment.isPending}
                className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {rescheduleAppointment.isPending ? "Guardando..." : "Confirmar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
