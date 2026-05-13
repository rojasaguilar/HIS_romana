import { Link } from "react-router-dom";
import { useServices } from "@/modules/services/hooks/useServices";
import type { Plan } from "../types/plan.types";
import { CheckCircle2, CalendarDays, ArrowRight, Sparkles } from "lucide-react";

interface Props {
  plan: Plan;
}

export const PlanCard = ({ plan }: Props) => {
  const { data: services } = useServices();
  
  const getServiceName = (serviceId: string) =>
    services?.find((serv) => serv.id === serviceId)?.name ?? "Servicio General";

  return (
    <div className="bg-white rounded-3xl border border-gray-200 shadow-lg shadow-gray-200/40 hover:shadow-xl hover:shadow-indigo-200/40 hover:border-indigo-300 transition-all duration-300 flex flex-col overflow-hidden group h-full relative">
      
      {/* Detalle visual superior */}
      <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-indigo-500 to-sky-400 opacity-80" />

      {/* Cabecera del Plan */}
      <div className="p-8 pb-6 bg-gradient-to-b from-indigo-50/50 to-transparent border-b border-gray-50 flex-shrink-0">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-5 h-5 text-indigo-500" />
          <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest">Plan de Salud</span>
        </div>
        <h2 className="text-2xl font-black text-gray-900 tracking-tight group-hover:text-indigo-600 transition-colors">
          {plan.name}
        </h2>
        <p className="text-sm text-gray-500 mt-3 leading-relaxed min-h-[40px]">
          {plan.description}
        </p>
      </div>

      {/* Variantes y Servicios */}
      <div className="p-8 flex flex-col gap-6 flex-grow">
        {plan.variants.map((variant) => (
          <div
            key={variant.id}
            className="flex flex-col gap-5 p-6 rounded-2xl border border-indigo-100/50 bg-gray-50/50 hover:bg-white hover:border-indigo-200 hover:shadow-md transition-all relative"
          >
            {/* Header Variante (Precio y Duración) */}
            <div className="flex justify-between items-center border-b border-gray-100 pb-4">
              <div className="flex items-center gap-2">
                <CalendarDays className="w-5 h-5 text-indigo-400" />
                <span className="text-sm font-bold text-gray-700">
                  {variant.durationInMonths} {variant.durationInMonths === 1 ? 'Mes' : 'Meses'}
                </span>
              </div>
              <div className="text-right flex flex-col items-end">
                <span className="text-2xl font-black text-indigo-600 leading-none">
                  ${variant.price}
                </span>
                <span className="text-[10px] text-gray-400 font-bold uppercase mt-1">
                  MXN Total
                </span>
              </div>
            </div>

            {/* Lista de Servicios Incluidos */}
            <div className="flex flex-col gap-3">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                Incluye por mes:
              </p>
              {variant.monthlyVisitsIncluded.length > 0 ? (
                variant.monthlyVisitsIncluded.map((visit, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-600 font-medium leading-tight">
                      <strong className="text-gray-900">{visit.visits}x</strong> {getServiceName(visit.serviceId)}
                    </span>
                  </div>
                ))
              ) : (
                <div className="flex items-start gap-3 opacity-60">
                  <CheckCircle2 className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-500 italic">Beneficios generales del plan</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Call To Action (Footer) */}
      <div className="p-8 pt-0 mt-auto">
        <Link
          to={`/plans/${plan.id}`}
          className="w-full flex items-center justify-center gap-2 py-4 bg-indigo-50 text-indigo-700 font-bold rounded-xl group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-sm hover:shadow-indigo-200"
        >
          Me interesa este plan
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
      
    </div>
  );
};