import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { usePatients } from "@/modules/patients/hooks/usePatients";
import { usePlans } from "@/modules/plans/hooks/usePlans";
import { useCreateSubscription } from "../hooks/useCreateSubscription";
import { useServices } from "@/modules/services/hooks/useServices";
import { MessagePortal } from "@/shared/components/feedback/modal/MessagePortal";
import {
  MoveLeft,
  User,
  CreditCard,
  CheckCircle2,
  ChevronRight,
  Calendar,
  Sparkles,
  ShieldCheck,
} from "lucide-react";

export const CreateSubscriptionPage = () => {
  const navigate = useNavigate();
  const createSubscription = useCreateSubscription();

  const { data: patients } = usePatients();
  const { data: plans } = usePlans();
  const { data: services } = useServices();

  const [patientId, setPatientId] = useState("");
  const [planId, setPlanId] = useState("");
  const [variantId, setVariantId] = useState("");

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | "info">(
    "info",
  );
  const [showMessage, setShowMessage] = useState(false);

  const selectedPlan = plans?.find((plan) => plan.id === planId);
  const selectedVariant = selectedPlan?.variants.find(
    (v) => v.id === variantId,
  );

  const getServiceName = (serviceId: string) =>
    services?.find((s) => s.id === serviceId)?.name || "Servicio";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!patientId) {
      setMessageType("error");
      setMessage("Debes seleccionar un paciente");
      setShowMessage(true);
      return;
    }

    if (!planId) {
      setMessageType("error");
      setMessage("Debes seleccionar un plan");
      setShowMessage(true);
      return;
    }

    if (!variantId) {
      setMessageType("error");
      setMessage("Debes seleccionar una variante");
      setShowMessage(true);
      return;
    }

    createSubscription.mutate(
      { patientId, planId, variantId },
      {
        onSuccess: () => {
          setMessageType("success");
          setMessage("La suscripción fue creada correctamente");
          setShowMessage(true);

          setTimeout(() => {
            navigate("/subscriptions");
          }, 1500);
        },

        onError: (error: any) => {
          setMessageType("error");

          setMessage(
            error?.response?.data?.message ||
              "Ocurrió un error al crear la suscripción",
          );

          setShowMessage(true);
        },
      },
    );
  };

  const labelClass =
    "block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3";

  return (
    <>
      <div className="flex flex-col gap-6 max-w-5xl mx-auto pb-10">
        {/* HEADER */}
        <div className="flex flex-col gap-4">
          <div>
            <Link
              to="/subscriptions"
              className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-indigo-600 transition"
            >
              <MoveLeft className="w-4 h-4" />
              Volver a Suscripciones
            </Link>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Nueva Suscripción
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Asocia un plan de salud a un paciente de la clínica.
            </p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {/* COLUMNA IZQUIERDA: SELECCIÓN */}
          <div className="lg:col-span-2 flex flex-col gap-8">
            {/* SECCIÓN 1: PACIENTE */}
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
              <div className="flex items-center gap-2 mb-6 text-indigo-600">
                <User className="w-5 h-5" />
                <h2 className="font-bold text-gray-900 text-lg">
                  1. Seleccionar Paciente
                </h2>
              </div>
              <select
                required
                value={patientId}
                onChange={(e) => setPatientId(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none text-sm font-medium"
              >
                <option value="">Buscar paciente...</option>
                {patients?.map((patient) => (
                  <option key={patient.id} value={patient.id}>
                    {patient.name}
                  </option>
                ))}
              </select>
            </div>

            {/* SECCIÓN 2: PLAN */}
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
              <div className="flex items-center gap-2 mb-6 text-indigo-600">
                <ShieldCheck className="w-5 h-5" />
                <h2 className="font-bold text-gray-900 text-lg">
                  2. Elegir Plan
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {plans?.map((plan) => (
                  <div
                    key={plan.id}
                    onClick={() => {
                      setPlanId(plan.id);
                      setVariantId(""); // Reset variant if plan changes
                    }}
                    className={`relative p-5 rounded-2xl border-2 cursor-pointer transition-all ${
                      planId === plan.id
                        ? "border-indigo-500 bg-indigo-50/30"
                        : "border-gray-100 bg-white hover:border-indigo-200 hover:bg-gray-50"
                    }`}
                  >
                    {planId === plan.id && (
                      <CheckCircle2 className="absolute top-4 right-4 w-5 h-5 text-indigo-600" />
                    )}
                    <h3 className="font-bold text-gray-900 pr-6">
                      {plan.name}
                    </h3>
                    <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                      {plan.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* SECCIÓN 3: VARIANTE */}
            {selectedPlan && (
              <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm animate-in fade-in slide-in-from-top-4 duration-300">
                <div className="flex items-center gap-2 mb-6 text-indigo-600">
                  <Calendar className="w-5 h-5" />
                  <h2 className="font-bold text-gray-900 text-lg">
                    3. Duración y Costo
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedPlan.variants.map((variant) => (
                    <div
                      key={variant.id}
                      onClick={() => setVariantId(variant.id)}
                      className={`flex flex-col p-5 rounded-2xl border-2 cursor-pointer transition-all ${
                        variantId === variant.id
                          ? "border-green-500 bg-green-50/30"
                          : "border-gray-100 bg-white hover:border-green-200 hover:bg-gray-50"
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <span className="text-sm font-bold text-gray-900">
                          {variant.durationInMonths} meses
                        </span>
                        <span className="text-lg font-black text-green-600">
                          ${variant.price}
                        </span>
                      </div>
                      <div className="mt-4 pt-4 border-t border-gray-100 space-y-2">
                        {variant.monthlyVisitsIncluded.map((service, idx) => (
                          <div
                            key={idx}
                            className="flex items-center gap-2 text-[11px] text-gray-600"
                          >
                            <div className="w-1 h-1 rounded-full bg-green-400" />
                            <span className="font-medium">
                              {service.visits}x{" "}
                              {getServiceName(service.serviceId)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* COLUMNA DERECHA: RESUMEN (Sticky) */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-indigo-900 text-white rounded-3xl p-8 shadow-xl shadow-indigo-200">
              <div className="flex items-center gap-2 mb-8">
                <Sparkles className="w-5 h-5 text-indigo-300" />
                <h3 className="font-bold text-xl">Resumen</h3>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <p className="text-indigo-300 text-[10px] font-bold uppercase tracking-widest">
                    Paciente
                  </p>
                  <p className="font-medium">
                    {patients?.find((p) => p.id === patientId)?.name ||
                      "No seleccionado"}
                  </p>
                </div>

                <div className="space-y-2">
                  <p className="text-indigo-300 text-[10px] font-bold uppercase tracking-widest">
                    Plan Seleccionado
                  </p>
                  <p className="font-medium">
                    {selectedPlan?.name || "Pendiente"}
                  </p>
                  {selectedVariant && (
                    <p className="text-sm text-indigo-200">
                      {selectedVariant.durationInMonths} meses de cobertura
                    </p>
                  )}
                </div>

                <div className="pt-6 border-t border-indigo-800">
                  <div className="flex justify-between items-end">
                    <p className="text-indigo-300 text-sm">Total a pagar</p>
                    <p className="text-3xl font-black text-white">
                      ${selectedVariant?.price || "0"}
                    </p>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={
                    !patientId ||
                    !planId ||
                    !variantId ||
                    createSubscription.isPending
                  }
                  className="w-full flex items-center justify-center gap-2 py-4 bg-white text-indigo-900 font-bold rounded-2xl hover:bg-indigo-50 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  {createSubscription.isPending
                    ? "Procesando..."
                    : "Confirmar Suscripción"}
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
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
