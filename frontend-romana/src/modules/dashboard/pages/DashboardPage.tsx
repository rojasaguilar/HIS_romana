import { Link } from "react-router-dom";
import { useAppointments } from "@/modules/appointments/hooks/useAppointments";
import { 
  Clock, 
  User, 
  Calendar, 
  ChevronRight, 
  AlertTriangle,
  MoreHorizontal
} from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";

export const DashboardPage = () => {
  // Solo este widget es funcional según tu instrucción
  const { data: appointments, isLoading } = useAppointments();

  // Filtramos las citas de hoy (Lógica funcional)
  const today = new Date().setHours(0, 0, 0, 0);
  const todayAppointments = appointments?.filter(app => 
    new Date(app.startDate).setHours(0, 0, 0, 0) === today
  ).slice(0, 4) || [];

  return (
    <div className="flex flex-col gap-8">
      
      {/* 1. SECCIÓN DE GRÁFICAS (Visuales) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gráfica de Ingresos/Actividad */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-gray-900">Resumen de Actividad</h3>
            <MoreHorizontal className="text-gray-400 w-5 h-5 cursor-pointer" />
          </div>
          <div className="h-[200px] w-full bg-gradient-to-t from-indigo-50/50 to-transparent rounded-lg border-b-2 border-indigo-500 relative overflow-hidden">
            {/* Aquí iría Recharts o Chart.js, por ahora simulamos el path de la imagen */}
            <div className="absolute inset-0 flex items-end px-2 gap-1 justify-around">
               {[40, 70, 45, 90, 65, 80, 95].map((h, i) => (
                 <div key={i} style={{ height: `${h}%` }} className="w-full max-w-[40px] bg-indigo-500/10 rounded-t-sm" />
               ))}
            </div>
          </div>
          <div className="flex justify-between mt-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
            <span>Ago</span><span>Sep</span><span>Oct</span><span>Nov</span><span>Dic</span><span>Ene</span><span>Feb</span>
          </div>
        </div>

        {/* Gráfica de Barras por Especialidad */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-gray-900">Consultas por Especialidad</h3>
            <MoreHorizontal className="text-gray-400 w-5 h-5 cursor-pointer" />
          </div>
          <div className="flex items-end justify-around h-[200px] gap-2 px-4">
             {[100, 70, 60, 50, 30].map((h, i) => (
               <div key={i} className="flex flex-col items-center gap-2 w-full">
                 <div style={{ height: `${h}%` }} className="w-full bg-indigo-500 rounded-lg shadow-lg shadow-indigo-100" />
               </div>
             ))}
          </div>
          <div className="flex justify-around mt-4 text-[10px] font-bold text-gray-400 text-center">
            <span className="w-full">Gral</span>
            <span className="w-full">Derma</span>
            <span className="w-full">Pedia</span>
            <span className="w-full">Cardio</span>
            <span className="w-full">Otros</span>
          </div>
        </div>
      </div>

      {/* 2. SECCIÓN DE LISTAS (WIDGETS INFERIORES) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* WIDGET FUNCIONAL: CITAS DE HOY */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="font-bold text-gray-900">Citas de Hoy</h3>
              <p className="text-xs text-gray-500">{todayAppointments.length} citas programadas</p>
            </div>
            <Link to="/appointments" className="text-xs font-bold text-indigo-600 hover:underline">Ver todas</Link>
          </div>

          <div className="flex flex-col gap-4">
            {isLoading ? (
              <p className="text-sm text-gray-400">Cargando agenda...</p>
            ) : todayAppointments.map((app) => (
              <div key={app.id} className="group flex items-center justify-between p-4 bg-gray-50/50 rounded-xl border border-transparent hover:border-indigo-100 hover:bg-white transition-all cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="flex flex-col items-center justify-center bg-white w-16 h-12 rounded-lg border border-gray-100 shadow-sm text-indigo-600">
                    <Clock className="w-3.5 h-3.5" />
                    <span className="text-[10px] font-bold uppercase mt-0.5">
                      {format(new Date(app.startDate), "HH:mm")}
                    </span>
                  </div>
                  {/* <div className="flex flex-col">
                    <span className="text-sm font-bold text-gray-900">{app.patientName || "Paciente"}</span>
                    <span className="text-[10px] text-gray-500 font-medium">Dr. {app.medicName || "Médico"} • {app.serviceName}</span>
                  </div> */}
                </div>
                {/* <div className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                  app.status === 'CONFIRMADA' ? 'bg-indigo-50 text-indigo-600' : 'bg-amber-50 text-amber-600'
                }`}>
                  {app.status}
                </div> */}
              </div>
            ))}
            {!isLoading && todayAppointments.length === 0 && (
              <p className="text-sm text-gray-400 py-10 text-center">No hay citas para hoy.</p>
            )}
          </div>
        </div>

        {/* WIDGET VISUAL: SUSCRIPCIONES POR VENCER */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="font-bold text-gray-900">Suscripciones por Vencer</h3>
              <p className="text-xs text-gray-500">3 clientes requieren atención</p>
            </div>
            <div className="p-2 bg-amber-50 rounded-lg text-amber-500">
              <AlertTriangle className="w-5 h-5" />
            </div>
          </div>

          <div className="flex flex-col gap-3">
            {[
              { name: "Maria González", plan: "Paquete Premium", days: 5 },
              { name: "Carlos Rivera", plan: "Paquete Básico", days: 8 },
              { name: "Ana Fernández", plan: "Paquete Familiar", days: 12 },
            ].map((sub, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-orange-50/30 rounded-xl border border-orange-100/50">
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-gray-800">{sub.name}</span>
                  <span className="text-[10px] text-gray-500 font-medium italic">{sub.plan}</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-bold text-orange-600 bg-white px-2 py-1 rounded border border-orange-100">
                    Vence en {sub.days} días
                  </span>
                </div>
              </div>
            ))}
          </div>

          <button className="mt-auto pt-6 text-xs font-bold text-indigo-600 text-center hover:underline">
            Contactar clientes
          </button>
        </div>

      </div>
    </div>
  );
};