import { useState, useMemo } from "react";
import { usePlans } from "../hooks/usePlans";
import { useServices } from "@/modules/services/hooks/useServices";
import { PlanCard } from "../components/PlanCard";
import { Search, Filter, ShieldCheck } from "lucide-react";

export const PlansPage = () => {
  const { data: plans, isLoading: isLoadingPlans } = usePlans();
  const { data: services } = useServices();

  // Estados para los filtros
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedServiceId, setSelectedServiceId] = useState("");

  // Lógica de filtrado (useMemo para no recalcular en cada render innecesario)
  const filteredPlans = useMemo(() => {
    if (!plans) return [];

    return plans.filter((plan) => {
      // 1. Filtro por texto (busca en nombre o descripción)
      const matchesSearch = 
        plan.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        plan.description.toLowerCase().includes(searchTerm.toLowerCase());

      // 2. Filtro por servicio incluido
      // Revisa si alguna de las variantes del plan incluye el servicio seleccionado
      const matchesService = selectedServiceId === "" || plan.variants.some((variant) =>
        variant.monthlyVisitsIncluded.some((visit) => visit.serviceId === selectedServiceId)
      );

      return matchesSearch && matchesService;
    });
  }, [plans, searchTerm, selectedServiceId]);

  if (isLoadingPlans) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
          <p className="text-gray-500 font-medium animate-pulse">Cargando planes de salud...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/30 pb-20">
      
      {/* HERO SECTION (Marketing) */}
      <div className="bg-white border-b border-gray-200 px-6 py-16 md:py-1 text-center">
        <div className="max-w-3xl mx-auto flex flex-col items-center gap-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-widest mb-2">
            <ShieldCheck className="w-4 h-4" />
            Cobertura Total
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">
            Encuentra el plan ideal para tu salud
          </h1>
          {/* <p className="text-lg text-gray-500 mt-2 max-w-2xl">
            Suscripciones médicas con especialistas, consultas mensuales y precios accesibles. Elige cómo quieres cuidarte.
          </p> */}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-10">
        
        {/* BARRA DE FILTROS */}
        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm flex flex-col md:flex-row gap-4 mb-10">
          
          {/* Buscador de texto */}
          <div className="relative flex-grow">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar plan por nombre"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all text-sm font-medium"
            />
          </div>

          {/* Filtro por Servicio */}
          <div className="relative md:w-72 flex-shrink-0">
            <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <select
              value={selectedServiceId}
              onChange={(e) => setSelectedServiceId(e.target.value)}
              className="w-full pl-12 pr-10 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all text-sm font-medium appearance-none cursor-pointer text-gray-700"
            >
              <option value="">Cualquier servicio incluido</option>
              {services?.map((service) => (
                <option key={service.id} value={service.id}>
                  Incluye: {service.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* GRID DE PLANES */}
        {filteredPlans.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPlans.map((plan) => (
              <PlanCard key={plan.id} plan={plan} />
            ))}
          </div>
        ) : (
          /* ESTADO VACÍO (Si no hay resultados) */
          <div className="bg-white rounded-3xl border border-dashed border-gray-300 p-16 flex flex-col items-center justify-center text-center mt-8">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No encontramos planes</h3>
            <p className="text-gray-500 max-w-md">
              No hay ningún plan que coincida con tu búsqueda. Intenta quitando los filtros o buscando otro servicio.
            </p>
            <button 
              onClick={() => {
                setSearchTerm("");
                setSelectedServiceId("");
              }}
              className="mt-6 px-6 py-2.5 bg-indigo-50 text-indigo-700 font-bold rounded-xl hover:bg-indigo-100 transition-colors"
            >
              Limpiar filtros
            </button>
          </div>
        )}
      </div>
    </div>
  );
};