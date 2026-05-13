import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useServices } from "@/modules/services/hooks/useServices";
import { useCreatePlan } from "../hooks/useCreatePlan";
import {
  MoveLeft,
  Package,
  Layers,
  Plus,
  Save,
  Trash2,
  CheckCircle2,
} from "lucide-react";
import { MessagePortal } from "@/shared/components/feedback/modal/MessagePortal";

interface VariantService {
  serviceId: string;
  visits: number;
}

interface Variant {
  durationInMonths: number;
  price: number;
  monthlyVisitsIncluded: VariantService[];
}

export const CreatePlanPage = () => {
  const navigate = useNavigate();
  const createPlan = useCreatePlan();
  const { data: services } = useServices();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [variants, setVariants] = useState<Variant[]>([
    {
      durationInMonths: 1,
      price: 0,
      monthlyVisitsIncluded: [],
    },
  ]);

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | "info">(
    "info",
  );
  const [showMessage, setShowMessage] = useState(false);

  const updateVariant = (index: number, field: keyof Variant, value: any) => {
    const updated = [...variants];
    updated[index] = { ...updated[index], [field]: value };
    setVariants(updated);
  };

  const addVariant = () => {
    setVariants([
      ...variants,
      {
        durationInMonths: 3,
        price: 0,
        monthlyVisitsIncluded: [],
      },
    ]);
  };

  const removeVariant = (indexToRemove: number) => {
    setVariants(variants.filter((_, index) => index !== indexToRemove));
  };

  const toggleService = (variantIndex: number, serviceId: string) => {
    const updated = [...variants];
    const exists = updated[variantIndex].monthlyVisitsIncluded.find(
      (service) => service.serviceId === serviceId,
    );

    if (exists) {
      updated[variantIndex].monthlyVisitsIncluded = updated[
        variantIndex
      ].monthlyVisitsIncluded.filter(
        (service) => service.serviceId !== serviceId,
      );
    } else {
      updated[variantIndex].monthlyVisitsIncluded.push({
        serviceId,
        visits: 1,
      });
    }
    setVariants(updated);
  };

  const updateVisits = (
    variantIndex: number,
    serviceId: string,
    visits: number,
  ) => {
    const updated = [...variants];
    updated[variantIndex].monthlyVisitsIncluded = updated[
      variantIndex
    ].monthlyVisitsIncluded.map((service) =>
      service.serviceId === serviceId ? { ...service, visits } : service,
    );
    setVariants(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      setMessageType("error");
      setMessage("Debes ingresar un nombre para el plan");
      setShowMessage(true);
      return;
    }

    if (!description.trim()) {
      setMessageType("error");
      setMessage("Debes ingresar una descripción");
      setShowMessage(true);
      return;
    }

    if (variants.length === 0) {
      setMessageType("error");
      setMessage("Debes agregar al menos una variante");
      setShowMessage(true);
      return;
    }

    const invalidVariant = variants.some(
      (variant) =>
        variant.durationInMonths <= 0 ||
        variant.price < 0 ||
        variant.monthlyVisitsIncluded.length === 0,
    );

    if (invalidVariant) {
      setMessageType("error");
      setMessage(
        "Todas las variantes deben tener duración válida, precio y al menos un servicio",
      );
      setShowMessage(true);
      return;
    }

    createPlan.mutate(
      { name, description, variants },
      {
        onSuccess: () => {
          setMessageType("success");
          setMessage("El plan fue creado correctamente");
          setShowMessage(true);

          setTimeout(() => {
            navigate("/plans");
          }, 1500);
        },

        onError: (error: any) => {
          setMessageType("error");

          setMessage(
            error?.response?.data?.message ||
              "Ocurrió un error al crear el plan",
          );

          setShowMessage(true);
        },
      },
    );
  };

  const inputClassName =
    "w-full px-4 py-2 mt-1 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-colors";
  const labelClassName =
    "block text-xs font-semibold text-gray-500 uppercase tracking-wider";

  return (
    <>
      <div className="flex flex-col gap-6 max-w-5xl mx-auto pb-10">
        {/* HEADER DE LA PÁGINA */}
        <div className="flex flex-col gap-4">
          <div>
            <Link
              to="/plans/admin"
              className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-indigo-600 transition"
            >
              <MoveLeft className="w-4 h-4" />
              Volver a Planes
            </Link>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Crear Nuevo Plan
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Define las características principales y las variantes
              (duración/precio) de este paquete.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {/* TARJETA 1: Información Base del Plan */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-2 mb-6 border-b border-gray-100 pb-4">
              <Package className="w-5 h-5 text-indigo-500" />
              <h2 className="text-lg font-bold text-gray-900">
                Información General
              </h2>
            </div>

            <div className="flex flex-col gap-4">
              <div>
                <label className={labelClassName}>Nombre del Plan</label>
                <input
                  required
                  placeholder="Ej. Paquete Premium Familiar"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={inputClassName}
                />
              </div>

              <div>
                <label className={labelClassName}>Descripción</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Describe los beneficios principales de este plan..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className={`${inputClassName} resize-none`}
                />
              </div>
            </div>
          </div>

          {/* CONTENEDOR DE VARIANTES */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-2">
              <Layers className="w-5 h-5 text-indigo-500" />
              <h2 className="text-lg font-bold text-gray-900">
                Variantes del Plan
              </h2>
            </div>

            {variants.map((variant, variantIndex) => (
              <div
                key={variantIndex}
                className="bg-gray-50 border border-gray-200 rounded-xl p-6 relative"
              >
                {/* Header de la Variante */}
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-base font-bold text-gray-800">
                    Variante #{variantIndex + 1}
                  </h3>
                  {variants.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeVariant(variantIndex)}
                      className="text-red-500 hover:text-red-700 p-1 rounded-md hover:bg-red-50 transition-colors"
                      title="Eliminar variante"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* Grid: Duración y Precio */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className={labelClassName}>Duración (Meses)</label>
                    <input
                      type="number"
                      min="1"
                      required
                      value={variant.durationInMonths}
                      onChange={(e) =>
                        updateVariant(
                          variantIndex,
                          "durationInMonths",
                          Number(e.target.value),
                        )
                      }
                      className={inputClassName}
                    />
                  </div>
                  <div>
                    <label className={labelClassName}>Precio Total ($)</label>
                    <input
                      type="number"
                      min="0"
                      required
                      value={variant.price}
                      onChange={(e) =>
                        updateVariant(
                          variantIndex,
                          "price",
                          Number(e.target.value),
                        )
                      }
                      className={inputClassName}
                    />
                  </div>
                </div>

                {/* Servicios Incluidos */}
                <div>
                  <label className={`${labelClassName} mb-3`}>
                    Servicios Incluidos por Mes
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {services?.map((service: any) => {
                      const selected = variant.monthlyVisitsIncluded.some(
                        (selectedService) =>
                          selectedService.serviceId === service.id,
                      );
                      const currentService = variant.monthlyVisitsIncluded.find(
                        (selectedService) =>
                          selectedService.serviceId === service.id,
                      );

                      return (
                        <div
                          key={service.id}
                          onClick={() =>
                            toggleService(variantIndex, service.id)
                          }
                          className={`relative flex flex-col p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                            selected
                              ? "border-indigo-500 bg-indigo-50/50 shadow-sm"
                              : "border-gray-200 bg-white hover:border-indigo-200 hover:bg-gray-50"
                          }`}
                        >
                          {/* Indicador Check */}
                          {selected && (
                            <div className="absolute top-3 right-3 text-indigo-600">
                              <CheckCircle2 className="w-5 h-5" />
                            </div>
                          )}

                          <h4
                            className={`text-sm font-bold pr-6 ${selected ? "text-indigo-900" : "text-gray-900"}`}
                          >
                            {service.name}
                          </h4>

                          <div className="flex items-center gap-3 mt-1 text-xs text-gray-500 font-medium">
                            <span>⏱ {service.duration} min</span>
                            <span>${service.cost} mxn</span>
                          </div>

                          {/* Input de cantidad de visitas si está seleccionado */}
                          {selected && (
                            <div
                              className="mt-4 pt-3 border-t border-indigo-100"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <label className="block text-xs font-semibold text-indigo-700 mb-1">
                                Visitas por mes:
                              </label>
                              <input
                                type="number"
                                min={1}
                                value={currentService?.visits ?? 1}
                                onChange={(e) =>
                                  updateVisits(
                                    variantIndex,
                                    service.id,
                                    Number(e.target.value),
                                  )
                                }
                                className="w-20 px-2 py-1 text-sm bg-white border border-indigo-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                              />
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* BOTÓN AGREGAR VARIANTE */}
          <div>
            <button
              type="button"
              onClick={addVariant}
              className="flex items-center justify-center gap-2 w-full py-4 border-2 border-dashed border-gray-300 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-50 hover:border-indigo-300 hover:text-indigo-600 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Añadir Otra Variante (Duración/Precio)
            </button>
          </div>

          {/* BOTONES DE ACCIÓN FINALES */}
          <div className="flex justify-end gap-4 mt-4 border-t border-gray-200 pt-6">
            <Link
              to="/plans/admin"
              className="px-6 py-2.5 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </Link>

            <button
              type="submit"
              disabled={createPlan.isPending}
              className="flex items-center gap-2 px-8 py-2.5 text-sm font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 disabled:opacity-70 disabled:cursor-not-allowed transition-colors shadow-sm"
            >
              <Save className="w-4 h-4" />
              {createPlan.isPending
                ? "Guardando Plan..."
                : "Guardar Plan Completo"}
            </button>
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
