import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { usePlanDetails, useUpdatePlan } from "../hooks/usePlans";
import { useServices } from "@/modules/services/hooks/useServices";
import { MoveLeft, Package, Pencil, Save, X, Layers, CheckCircle2, Info } from "lucide-react";

export const PlanDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: plan, isLoading, isError } = usePlanDetails(id!);
  const { data: services } = useServices();
  const updatePlan = useUpdatePlan();

  const [isEditing, setIsEditing] = useState(false);
  
  // Estados locales para el formulario
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [variants, setVariants] = useState(plan?.variants || []);

  useEffect(() => {
    if (plan) {
      setName(plan.name);
      setDescription(plan.description);
      setVariants(plan.variants);
    }
  }, [plan, isEditing]);

  const getServiceName = (serviceId: string) => 
    services?.find(s => s.id === serviceId)?.name || "Servicio no encontrado";

  const handleUpdateVariant = (variantId: string, field: string, value: any) => {
    setVariants(prev => prev.map(v => v.id === variantId ? { ...v, [field]: value } : v));
  };

  const handleSave = () => {
    updatePlan.mutate({
      id: id!,
      data: { name, description, variants }
    }, {
      onSuccess: () => setIsEditing(false)
    });
  };

  if (isLoading) return <div className="p-8 text-center text-gray-500">Cargando detalles del plan...</div>;
  if (isError || !plan) return <div className="p-8 text-center text-red-500">Error al cargar el plan.</div>;

  const inputClass = "w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all";

  return (
    <div className="flex flex-col gap-6 max-w-5xl mx-auto pb-10">
      {/* Header Navegación */}
      <div className="flex flex-col gap-4">
        <Link to="/plans/admin" className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-indigo-600 transition">
          <MoveLeft className="w-4 h-4" /> Volver a Planes
        </Link>
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">
            {isEditing ? "Editando Plan" : plan.name}
          </h1>
          {!isEditing ? (
            <button onClick={() => setIsEditing(true)} className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
              <Pencil className="w-4 h-4" /> Editar Plan
            </button>
          ) : (
            <div className="flex gap-2">
              <button onClick={() => setIsEditing(false)} className="px-4 py-2 text-sm font-semibold text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200">
                Cancelar
              </button>
              <button onClick={handleSave} className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 shadow-sm">
                <Save className="w-4 h-4" /> Guardar Cambios
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Información Básica */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
        <div className="flex items-center gap-2 mb-6 border-b border-gray-100 pb-4 text-indigo-500">
          <Package className="w-5 h-5" />
          <h2 className="text-lg font-bold text-gray-900">Información General</h2>
        </div>
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Nombre del Plan</label>
            {isEditing ? (
              <input value={name} onChange={e => setName(e.target.value)} className={inputClass} />
            ) : (
              <p className="text-gray-900 font-medium">{plan.name}</p>
            )}
          </div>
          <div>
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Descripción</label>
            {isEditing ? (
              <textarea rows={3} value={description} onChange={e => setDescription(e.target.value)} className={inputClass} />
            ) : (
              <p className="text-gray-600 text-sm leading-relaxed">{plan.description}</p>
            )}
          </div>
        </div>
      </div>

      {/* Grid de Variantes */}
      {/* <div className="flex items-center gap-2 mt-2">
        <Layers className="w-5 h-5 text-indigo-500" />
        <h2 className="text-lg font-bold text-gray-900">Variantes Configuradas</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {variants.map((variant) => (
          <div key={variant.id} className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden flex flex-col">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex justify-between items-center">
              <span className="text-sm font-bold text-gray-700">ID: {variant.id.slice(-6)}</span>
              <div className="flex gap-4">
                 <div className="text-right">
                    <p className="text-[10px] font-bold text-gray-400 uppercase">Duración</p>
                    {isEditing ? (
                      <input type="number" className="w-16 text-right font-bold text-indigo-600 bg-transparent border-b border-indigo-200" value={variant.durationInMonths} onChange={e => handleUpdateVariant(variant.id, 'durationInMonths', Number(e.target.value))} />
                    ) : (
                      <p className="text-sm font-bold text-indigo-600">{variant.durationInMonths} meses</p>
                    )}
                 </div>
                 <div className="text-right border-l pl-4 border-gray-200">
                    <p className="text-[10px] font-bold text-gray-400 uppercase">Precio</p>
                    {isEditing ? (
                      <input type="number" className="w-20 text-right font-bold text-green-600 bg-transparent border-b border-green-200" value={variant.price} onChange={e => handleUpdateVariant(variant.id, 'price', Number(e.target.value))} />
                    ) : (
                      <p className="text-sm font-bold text-green-600">${variant.price}</p>
                    )}
                 </div>
              </div>
            </div>

            <div className="p-6 flex flex-col gap-4 flex-grow">
              <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest">
                <CheckCircle2 className="w-3 h-3" /> Servicios Incluidos
              </div>
              <div className="flex flex-col gap-3">
                {variant.monthlyVisitsIncluded.map((visit, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100">
                    <span className="text-sm font-medium text-gray-700">
                      {getServiceName(visit.serviceId)}
                    </span>
                    <span className="px-2.5 py-1 bg-white border border-gray-200 rounded-md text-xs font-bold text-indigo-600">
                      {visit.visits} {visit.visits === 1 ? 'visita' : 'visitas'} / mes
                    </span>
                  </div>
                ))}
                {variant.monthlyVisitsIncluded.length === 0 && (
                  <p className="text-xs text-gray-400 italic">No hay servicios específicos en esta variante.</p>
                )}
              </div>
            </div>
            
            <div className="px-6 py-3 bg-indigo-50/30 flex items-center gap-2">
               <Info className="w-3 h-3 text-indigo-400" />
               <p className="text-[10px] text-indigo-500 font-medium">Los servicios se editan desde el creador de planes general.</p>
            </div>
          </div>
        ))}
      </div> */}
    </div>
  );
};