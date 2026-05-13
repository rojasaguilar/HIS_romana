import { useMemo, useState, type SetStateAction } from "react";
import { useNavigate, Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { useCreateAppointment } from "../hooks/useCreateAppointment";
import { usePatients } from "@/modules/patients/hooks/usePatients";
import { useMedics } from "@/modules/medics/hooks/useMedics";
import { useServices } from "@/modules/services/hooks/useServices";
import { useSpecialities } from "@/modules/specialities/hooks/useSpecialities";
import { useActiveSubscription } from "@/modules/subscriptions/hooks/useActiveSubscription";
import { MessagePortal } from "@/shared/components/feedback/modal/MessagePortal";

import type { AppointmentType } from "../types/appointment.types";

import {
  MoveLeft,
  User,
  Activity,
  Clock,
  FileText,
  Save,
  CheckCircle2,
  ShieldCheck,
  AlertCircle,
} from "lucide-react";

export const CreateAppointmentPage = () => {
  const navigate = useNavigate();

  const createAppointment = useCreateAppointment();

  const { data: patients } = usePatients();
  const { data: medics } = useMedics();
  const { data: services } = useServices();
  const { data: specialities } = useSpecialities();

  /**
   * FORM STATE
   */
  const [patientId, setPatientId] = useState("");
  const [medicId, setMedicId] = useState("");
  const [serviceId, setServiceId] = useState("");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [type, setType] = useState<AppointmentType>("IN_PERSON");
  const [preNotes, setPreNotes] = useState("");

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | "info">(
    "info",
  );
  const [showMessage, setShowMessage] = useState(false);

  /**
   * ACTIVE SUBSCRIPTION
   */
  const { data: activeSubscription, isLoading: loadingSubscription } =
    useActiveSubscription(patientId);

  /**
   * SELECTED SERVICE
   */
  const selectedService = services?.find((s) => s.id === serviceId);

  const currentSpecialityId = selectedService?.specialityId;

  /**
   * FILTERED MEDICS
   */
  const filteredMedics = medics?.filter((medic) => {
    if (!currentSpecialityId) return true;

    return medic.specialityIds?.includes(currentSpecialityId);
  });

  /**
   * SERVICE SUBSCRIPTION INFO
   */
  const serviceSubscriptionInfo = useMemo(() => {
    if (!activeSubscription || !serviceId) return null;

    return activeSubscription.monthlyVisitsIncluded.find(
      (item) => item.serviceId === serviceId,
    );
  }, [activeSubscription, serviceId]);

  /**
   * CAN USE SUBSCRIPTION
   */
  const canUseSubscription =
    !!serviceSubscriptionInfo && serviceSubscriptionInfo.remaining > 0;

  /**
   * SPECIALITY NAME
   */
  const getSpecialityName = (specialityId: string) =>
    specialities?.find((spec) => spec.id === specialityId)?.name ?? "GENERAL";

  /**
   * SUBMIT
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    /**
     * REQUIRED VALIDATIONS
     */
    if (!patientId) {
      alert("Selecciona un paciente");
      return;
    }

    if (!serviceId) {
      alert("Selecciona un servicio");
      return;
    }

    if (!medicId) {
      alert("Selecciona un médico");
      return;
    }

    if (!startDate) {
      alert("Selecciona una fecha para la cita");
      return;
    }

    if (!type) {
      alert("Selecciona una modalidad");
      return;
    }

    createAppointment.mutate(
      {
        patientId,
        medicId,
        serviceId,
        startDate: startDate.toISOString(),
        type,
        preNotes,
      },
      {
        onSuccess: () => {
          setMessageType("success");
          setMessage("La cita fue creada correctamente");
          setShowMessage(true);

          setTimeout(() => {
            navigate("/appointments");
          }, 1500);
        },

        onError: (error: any) => {
          setMessageType("error");

          setMessage(
            error?.response?.data?.message ||
              "Ocurrió un error al crear la cita",
          );

          setShowMessage(true);
        },
      },
    );
  };

  /**
   * STYLES
   */
  const labelClass =
    "block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2";

  const selectClass =
    "w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none text-sm font-medium transition-all appearance-none";
  // if (showMessage) {
  //   return (
  //     <MessagePortal
  //       type={messageType}
  //       message={message}
  //       onClose={() => setShowMessage(false)}
  //     />
  //   );
  // }
  return (
    <>
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
          {/* LEFT */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            {/* PATIENT + SERVICE */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* PATIENT */}
              <div>
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

              {/* SERVICE */}
              <div>
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

            {/* SUBSCRIPTION INFO */}
            {patientId && (
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                <div className="flex items-center gap-2 mb-5">
                  <ShieldCheck className="w-5 h-5 text-indigo-600" />

                  <h3 className="text-lg font-bold text-gray-900">
                    Suscripción Activa
                  </h3>
                </div>

                {loadingSubscription ? (
                  <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                    <p className="text-sm text-gray-500">
                      Verificando suscripción...
                    </p>
                  </div>
                ) : !activeSubscription ? (
                  <div className="p-4 rounded-xl bg-red-50 border border-red-100 flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-red-500 mt-0.5" />

                    <div>
                      <p className="text-sm font-semibold text-red-700">
                        El paciente no tiene suscripción activa
                      </p>

                      <p className="text-xs text-red-500 mt-1">
                        La cita será cobrada normalmente.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col gap-4">
                    <div className="p-4 rounded-xl bg-green-50 border border-green-100">
                      <p className="text-sm font-semibold text-green-700">
                        Suscripción activa detectada
                      </p>

                      <p className="text-xs text-green-600 mt-1">
                        Si el servicio tiene visitas disponibles, la cita se
                        cobrará automáticamente en $0.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {activeSubscription.monthlyVisitsIncluded.map(
                        (service: any) => (
                          <div
                            key={service.serviceId}
                            className={`rounded-xl border p-4 transition-all ${
                              serviceId === service.serviceId
                                ? "border-indigo-500 bg-indigo-50"
                                : "border-gray-100 bg-gray-50"
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <h4 className="text-sm font-bold text-gray-800">
                                {service.serviceName}
                              </h4>

                              <span
                                className={`text-xs font-bold px-2 py-1 rounded-md ${
                                  service.remaining > 0
                                    ? "bg-green-100 text-green-700"
                                    : "bg-red-100 text-red-700"
                                }`}
                              >
                                {service.remaining} restantes
                              </span>
                            </div>

                            <div className="mt-3 flex items-center gap-4 text-xs text-gray-500">
                              <span>
                                Incluidas: <strong>{service.allowed}</strong>
                              </span>

                              <span>
                                Usadas: <strong>{service.used}</strong>
                              </span>
                            </div>
                          </div>
                        ),
                      )}
                    </div>

                    {selectedService && (
                      <div
                        className={`p-4 rounded-xl border ${
                          canUseSubscription
                            ? "bg-indigo-50 border-indigo-100"
                            : "bg-amber-50 border-amber-100"
                        }`}
                      >
                        {canUseSubscription ? (
                          <div>
                            <p className="text-sm font-bold text-indigo-700">
                              Este servicio será cubierto por la suscripción
                            </p>

                            <p className="text-xs text-indigo-500 mt-1">
                              Se descontará 1 visita automáticamente y el cobro
                              al paciente será de $0.
                            </p>
                          </div>
                        ) : (
                          <div>
                            <p className="text-sm font-bold text-amber-700">
                              Este servicio no tiene visitas disponibles
                            </p>

                            <p className="text-xs text-amber-600 mt-1">
                              La cita se cobrará normalmente.
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* MEDICS */}
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

            {/* DATE */}
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
                  minTime={new Date(new Date().setHours(8, 0, 0, 0))}
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
            </div>
          </div>

          {/* RIGHT */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col gap-6">
              {/* TYPE */}
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

                    <option value="ONLINE">En Línea</option>
                  </select>
                </div>
              </div>

              {/* NOTES */}
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

              {/* SUMMARY */}
              <div className="rounded-2xl border border-gray-100 bg-gray-50 p-5 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    Costo del servicio
                  </span>

                  <span className="font-bold text-gray-900">
                    ${selectedService?.cost ?? 0}
                  </span>
                </div>

                <div className="h-px bg-gray-200" />

                <div>
                  {selectedService ? (
                    canUseSubscription ? (
                      <div className="rounded-xl border border-green-100 bg-green-50 p-4">
                        <p className="text-sm font-bold text-green-700">
                          Elegible para cobertura por suscripción
                        </p>

                        <p className="text-xs text-green-600 mt-1 leading-relaxed">
                          Si la suscripción sigue activa para la fecha
                          seleccionada y aún tiene visitas disponibles, se
                          aplicará automáticamente el beneficio.
                        </p>
                      </div>
                    ) : (
                      <div className="rounded-xl border border-amber-100 bg-amber-50 p-4">
                        <p className="text-sm font-bold text-amber-700">
                          Este servicio no tiene cobertura disponible
                        </p>

                        <p className="text-xs text-amber-600 mt-1 leading-relaxed">
                          El backend determinará automáticamente el cobro final
                          al momento de agendar la cita.
                        </p>
                      </div>
                    )
                  ) : (
                    <div className="rounded-xl border border-gray-200 bg-white p-4">
                      <p className="text-sm text-gray-500">
                        Selecciona un servicio para visualizar la cobertura
                        disponible.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* BUTTON */}
              <button
                type="submit"
                disabled={
                  !startDate ||
                  !patientId ||
                  !medicId ||
                  !serviceId ||
                  !type ||
                  createAppointment.isPending
                }
                className="w-full flex items-center justify-center gap-2 py-4 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-indigo-100"
              >
                <Save className="w-5 h-5" />

                {createAppointment.isPending
                  ? "Guardando..."
                  : "Confirmar Cita"}
              </button>
            </div>

            {/* INFO */}
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

      <MessagePortal
        isOpen={showMessage}
        type={messageType}
        message={message}
        onClose={() => setShowMessage(false)}
      />
    </>
  );
};
