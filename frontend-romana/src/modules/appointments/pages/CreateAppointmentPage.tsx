import { useState, type SetStateAction } from "react";
import { useNavigate, Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { useCreateAppointment } from "../hooks/useCreateAppointment";
import { usePatients } from "@/modules/patients/hooks/usePatients";
import { useMedics } from "@/modules/medics/hooks/useMedics";
import { useServices } from "@/modules/services/hooks/useServices";
import { useSpecialities } from "@/modules/specialities/hooks/useSpecialities";
import type {
  AppointmentType,
  BillingSource,
} from "../types/appointment.types";

import {
  MoveLeft,
  User,
  Stethoscope,
  Activity,
  Calendar,
  Clock,
  CreditCard,
  FileText,
  Save,
  CheckCircle2,
} from "lucide-react";

export const CreateAppointmentPage = () => {
  const navigate = useNavigate();
  const createAppointment = useCreateAppointment();

  const { data: patients } = usePatients();
  const { data: medics } = useMedics();
  const { data: services } = useServices();
  const { data: specialities } = useSpecialities();

  // Estados originales (Lógica intacta)
  const [patientId, setPatientId] = useState("");
  const [medicId, setMedicId] = useState("");
  const [serviceId, setServiceId] = useState("");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [type, setType] = useState<AppointmentType>("IN_PERSON");
  const [billingSource, setBillingSource] = useState<BillingSource>("DIRECT");
  const [preNotes, setPreNotes] = useState("");

  const selectedService = services?.find((s) => s.id === serviceId);
  const currentSpecialityId = selectedService?.specialityId;

  const filteredMedics = medics?.filter((medic) => {
    if (!currentSpecialityId) return true; // Mostrar todos si no hay servicio elegido
    return medic.specialityIds?.includes(currentSpecialityId);
  });

  const getSpecialityName = (specialityId: string) =>
    specialities?.find((spec) => spec.id === specialityId)?.name ?? "GENERAL";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!startDate) return;

    createAppointment.mutate(
      {
        patientId,
        medicId,
        serviceId,
        startDate: startDate.toISOString(),
        type,
        preNotes,
        patientCharge: 0,
        medicEarning: 0,
        billing: { source: billingSource },
      },
      {
        onSuccess: () => navigate("/appointments"),
      },
    );
  };

  const labelClass =
    "block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2";
  const selectClass =
    "w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none text-sm font-medium transition-all appearance-none";

  return (
    <div className="flex flex-col gap-6 max-w-5xl mx-auto pb-10">
      {/* HEADER */}
      <div className="flex flex-col gap-4">
        <div>
          <Link
            to="/appointments"
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-indigo-600 transition"
          >
            <MoveLeft className="w-4 h-4" />
            Volver a Citas
          </Link>
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Agendar Nueva Cita
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Completa los datos para reservar un espacio en la agenda médica.
          </p>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 lg:grid-cols-12 gap-8"
      >
        {/* COLUMNA IZQUIERDA: CONFIGURACIÓN (8 COLS) */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          {/* PACIENTE Y SERVICIO */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-1">
              <label className={labelClass}>Paciente</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                <select
                  required
                  value={patientId}
                  onChange={(e) => setPatientId(e.target.value)}
                  className={`${selectClass} pl-10`}
                >
                  <option value="">Seleccionar paciente</option>
                  {patients?.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="md:col-span-1">
              <label className={labelClass}>Servicio</label>
              <div className="relative">
                <Activity className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                <select
                  required
                  value={serviceId}
                  onChange={(e) => setServiceId(e.target.value)}
                  className={`${selectClass} pl-10`}
                >
                  <option value="">Seleccionar servicio</option>
                  {services?.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* MÉDICO */}
          {/* MÉDICO FILTRADO */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <label className={labelClass}>Seleccionar Médico</label>
              {currentSpecialityId && (
                <span className="text-[10px] text-gray-400 italic">
                  Mostrando especialistas en{" "}
                  {getSpecialityName(currentSpecialityId)}
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
              {filteredMedics?.length === 0 ? (
                <div className="col-span-2 p-8 text-center bg-gray-50 rounded-xl border border-dashed border-gray-200">
                  <p className="text-sm text-gray-500 font-medium">
                    No hay médicos disponibles para esta especialidad.
                  </p>
                </div>
              ) : (
                filteredMedics?.map((medic) => (
                  <div
                    key={medic.id}
                    onClick={() => setMedicId(medic.id)}
                    className={`relative p-4 rounded-xl border-2 transition-all cursor-pointer flex flex-col gap-1 ${
                      medicId === medic.id
                        ? "border-indigo-500 bg-indigo-50/50 shadow-sm"
                        : "border-gray-100 bg-white hover:border-indigo-200 hover:bg-gray-50"
                    }`}
                  >
                    {medicId === medic.id && (
                      <CheckCircle2 className="absolute top-3 right-3 w-4 h-4 text-indigo-600" />
                    )}
                    <h4 className="text-sm font-bold text-gray-900">
                      Dr. {medic.name}
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {medic.specialityIds?.map((specId) => (
                        <span
                          key={specId}
                          className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                            specId === currentSpecialityId
                              ? "bg-indigo-600 text-white"
                              : "bg-gray-100 text-gray-500"
                          }`}
                        >
                          {getSpecialityName(specId)}
                        </span>
                      ))}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* FECHA (WIDGET INLINE) */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <label className={labelClass}>Fecha y Hora de la Cita</label>
              {startDate && (
                <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-md border border-indigo-100 animate-in fade-in">
                  Seleccionado para las{" "}
                  {startDate.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              )}
            </div>

            <div className="mt-2 flex justify-center bg-gray-50/50 rounded-2xl p-4 border border-gray-100">
              <DatePicker
                selected={startDate}
                onChange={(date: SetStateAction<Date | null>) =>
                  setStartDate(date)
                }
                showTimeSelect
                timeIntervals={30}
                dateFormat="MMMM d, yyyy h:mm aa"
                minDate={new Date()}
                inline
                // Restricciones de horario (8:00 AM - 6:00 PM)
                minTime={new Date(new Date().setHours(8, 0, 0, 0))}
                maxTime={new Date(new Date().setHours(18, 0, 0, 0))}
                // Estilización de la UI
                calendarClassName="!border-none !shadow-none !font-sans !bg-transparent"
                // Estas clases ayudan a limpiar el diseño nativo de la librería
                dayClassName={(date) =>
                  "hover:!bg-indigo-100 !rounded-lg transition-colors"
                }
                timeClassName={(time) =>
                  "hover:!bg-indigo-600 hover:!text-white !rounded-md !font-medium transition-all"
                }
              />
            </div>

            {/* Leyenda de horario comercial */}
            <div className="mt-4 flex items-center justify-center gap-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                <span>Disponible 08:00 - 18:00</span>
              </div>
            </div>
          </div>
        </div>

        {/* COLUMNA DERECHA: DETALLES Y ACCIÓN (4 COLS) */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col gap-6">
            {/* TIPO DE CITA */}
            <div>
              <label className={labelClass}>Modalidad</label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value as AppointmentType)}
                  className={`${selectClass} pl-10`}
                >
                  <option value="IN_PERSON">Presencial</option>
                  <option value="ONLINE">En Línea (Video)</option>
                </select>
              </div>
            </div>

            {/* BILLING SOURCE */}
            <div>
              <label className={labelClass}>Fuente de Pago</label>
              <div className="relative">
                <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                <select
                  value={billingSource}
                  onChange={(e) =>
                    setBillingSource(e.target.value as BillingSource)
                  }
                  className={`${selectClass} pl-10`}
                >
                  <option value="DIRECT">Pago Directo</option>
                  <option value="PROMOTION">Promoción / Cupón</option>
                  <option value="SUBSCRIPTION">Suscripción Activa</option>
                </select>
              </div>
            </div>

            {/* PRE NOTES */}
            <div>
              <label className={labelClass}>Notas Preliminares</label>
              <div className="relative">
                <FileText className="absolute left-3 top-3 w-4 h-4 text-gray-400 pointer-events-none" />
                <textarea
                  placeholder="Motivo de la consulta o síntomas..."
                  value={preNotes}
                  onChange={(e) => setPreNotes(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none text-sm transition-all min-h-[120px] resize-none"
                />
              </div>
            </div>

            {/* BOTÓN DE ACCIÓN */}
            <button
              type="submit"
              disabled={
                !startDate ||
                !patientId ||
                !medicId ||
                createAppointment.isPending
              }
              className="w-full flex items-center justify-center gap-2 py-4 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-indigo-100"
            >
              <Save className="w-5 h-5" />
              {createAppointment.isPending ? "Guardando..." : "Confirmar Cita"}
            </button>
          </div>

          {/* INDICADOR DE REGLAS (UX) */}
          <div className="p-4 bg-indigo-50 border border-indigo-100 rounded-xl">
            <p className="text-[11px] text-indigo-700 leading-relaxed">
              <strong>Nota:</strong> Las citas se agendan en intervalos de 30
              minutos. Asegúrate de que el médico tenga disponibilidad en el
              horario seleccionado.
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};
