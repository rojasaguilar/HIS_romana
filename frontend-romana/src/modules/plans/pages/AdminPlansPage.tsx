import { Link } from "react-router-dom";
import { usePlans } from "../hooks/usePlans";
import {
  Search,
  Plus,
  Filter,
  ChevronDown,
  Package,
  Layers,
} from "lucide-react";

export const AdminPlansPage = () => {
  const { data: plans, isLoading } = usePlans();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-gray-500 font-medium">Cargando planes...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {/* 1. Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Administración de Planes
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Gestiona el catálogo base de paquetes y suscripciones de la clínica
          </p>
        </div>
        <Link
          to="/plans/create"
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Nuevo Plan
        </Link>
      </div>

      {/* 2. Main List Container */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm flex flex-col">
        {/* Toolbar */}
        <div className="flex items-center gap-4 p-4 border-b border-gray-200">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar plan por nombre..."
              className="w-full pl-9 pr-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50">
            <Filter className="w-4 h-4 text-gray-500" />
            Filtros
            <ChevronDown className="w-4 h-4 text-gray-500" />
          </button>
        </div>

        {/* List Header (Grid) */}
        {/* Usamos proporciones: Nombre (2), Descripción (3), Variantes (1), Estado (1) */}
        <div className="grid grid-cols-[2fr_3fr_1fr_1fr] items-center px-6 py-3 bg-gray-50/50 border-b border-gray-200 text-xs font-semibold text-gray-500 uppercase tracking-wider">
          <span>Nombre del Plan</span>
          <span>Descripción</span>
          <span>Variantes</span>
          <span>Estado</span>
        </div>

        {/* List Body */}
        <div className="flex flex-col">
          {plans?.map((plan) => (
            // Nota: Si en el futuro quieres que la fila sea clickeable para editar el plan,
            // puedes cambiar este div por un <Link to={`/plans/${plan.id}`}> como en las otras vistas.
            <Link to={`/plans/${plan.id}`}>
              <div
                key={plan.id}
                className="grid grid-cols-[2fr_3fr_1fr_1fr] items-center px-6 py-4 border-b border-gray-100 hover:bg-gray-50 transition-colors last:border-b-0"
              >
                {/* Columna Nombre */}
                <div className="flex items-center gap-3 overflow-hidden pr-4">
                  <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center flex-shrink-0">
                    <Package className="w-5 h-5" />
                  </div>
                  <span className="text-sm font-bold text-gray-900 truncate">
                    {plan.name}
                  </span>
                </div>

                {/* Columna Descripción */}
                <div className="text-sm text-gray-500 truncate pr-6">
                  {plan.description || "Sin descripción detallada."}
                </div>

                {/* Columna Variantes */}
                <div className="flex items-center gap-1.5 text-sm font-medium text-gray-700">
                  <Layers className="w-4 h-4 text-gray-400" />
                  {plan.variants.length}{" "}
                  {plan.variants.length === 1 ? "variante" : "variantes"}
                </div>

                {/* Columna Estado */}
                <div>
                  <span
                    className={`px-2.5 py-1 text-xs font-medium rounded-full border ${
                      plan.isActive
                        ? "text-green-700 bg-green-50 border-green-100"
                        : "text-gray-700 bg-gray-100 border-gray-200"
                    }`}
                  >
                    {plan.isActive ? "Activo" : "Inactivo"}
                  </span>
                </div>
              </div>
            </Link>
          ))}

          {plans?.length === 0 && (
            <div className="p-8 text-center text-gray-500 text-sm">
              No hay planes registrados en el sistema.
            </div>
          )}
        </div>

        {/* Footer / Paginación */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
          <span className="text-sm text-gray-500">
            Mostrando {plans?.length || 0} de {plans?.length || 0} resultados
          </span>
          <div className="flex items-center gap-1">
            <button className="px-3 py-1.5 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-md hover:bg-gray-50 disabled:opacity-50">
              Anterior
            </button>
            <button className="px-3 py-1.5 text-sm font-medium text-white bg-indigo-500 rounded-md">
              1
            </button>
            <button className="px-3 py-1.5 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-md hover:bg-gray-50">
              Siguiente
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
