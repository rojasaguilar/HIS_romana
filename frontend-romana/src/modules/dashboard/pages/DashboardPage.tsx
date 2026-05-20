import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  format,
  subMonths,
  startOfYear,
  eachMonthOfInterval,
  isSameMonth,
} from "date-fns";
import { es } from "date-fns/locale";

import { useAppointments } from "@/modules/appointments/hooks/useAppointments";
import { useMedics } from "@/modules/medics/hooks/useMedics";
import { usePatients } from "@/modules/patients/hooks/usePatients";
import { useServices } from "@/modules/services/hooks/useServices";
import { useSpecialities } from "@/modules/specialities/hooks/useSpecialities";
import AppointmentsCalendar from "../../appointments/components/calendar";

import {
  User,
  AlertTriangle,
  ChevronDown,
  Stethoscope,
  Activity,
} from "lucide-react";

type IntervalType = "3M" | "6M" | "1Y";

export const DashboardPage = () => {
  const { data: appointments = [], isLoading } = useAppointments();
  const { data: patients } = usePatients();
  const { data: medics } = useMedics();
  const { data: services = [] } = useServices();
  const { data: specialities = [] } = useSpecialities();

  const [activityInterval, setActivityInterval] = useState<IntervalType>("6M");

  // --- 1. LÓGICA: GRÁFICA DE ACTIVIDAD ---
  const activityData = useMemo(() => {
    const now = new Date();
    let startDate: Date;

    if (activityInterval === "3M") startDate = subMonths(now, 2);
    else if (activityInterval === "6M") startDate = subMonths(now, 5);
    else startDate = startOfYear(now);

    const months = eachMonthOfInterval({ start: startDate, end: now });

    const data = months.map((month) => {
      const count = appointments.filter((app) =>
        isSameMonth(new Date(app.startDate), month),
      ).length;

      return {
        label: format(month, "MMM", { locale: es }),
        count,
      };
    });

    const max = Math.max(...data.map((d) => d.count), 1);
    return { data, max };
  }, [appointments, activityInterval]);

  // --- 2. LÓGICA: ESPECIALIDADES TOP ---
  const specData = useMemo(() => {
    const counts: Record<string, number> = {};
    appointments.forEach((app) => {
      const service = services.find((s) => s.id === app.serviceId);
      const specId = service?.specialityId || "OTROS";
      counts[specId] = (counts[specId] || 0) + 1;
    });

    const sorted = Object.entries(counts)
      .map(([id, count]) => ({
        name: specialities.find((s) => s.id === id)?.name || "Otros",
        count,
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    while (sorted.length < 5) sorted.push({ name: "-", count: 0 });

    const max = Math.max(...sorted.map((s) => s.count), 1);
    return { sorted, max };
  }, [appointments, services, specialities]);

  // --- 3. LÓGICA: SERVICIOS TOP ---
  const serviceData = useMemo(() => {
    const counts: Record<string, number> = {};
    appointments.forEach((app) => {
      const srvId = app.serviceId || "UNKNOWN";
      counts[srvId] = (counts[srvId] || 0) + 1;
    });

    const sorted = Object.entries(counts)
      .map(([id, count]) => ({
        name: services.find((s) => s.id === id)?.name || "Otros",
        count,
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    while (sorted.length < 5) sorted.push({ name: "-", count: 0 });

    const max = Math.max(...sorted.map((s) => s.count), 1);
    return { sorted, max };
  }, [appointments, services]);

  // Helpers para la lista de citas
  const getPatientName = (id: string) =>
    patients?.find((p) => p.id === id)?.name ?? "Paciente";
  const getMedicName = (id: string) =>
    medics?.find((m) => m.id === id)?.name ?? "Médico";
  const getServiceName = (id: string) =>
    services.find((s) => s.id === id)?.name ?? "Servicio";

  const appointmentsFormated = appointments.map((app) => ({
    ...app,
    patientName: getPatientName(app.patientId),
    serviceName: getServiceName(app.serviceId),
    medicName: getMedicName(app.medicId),
  }));

  const today = new Date().setHours(0, 0, 0, 0);
  const todayAppointments = appointments
    .filter((app) => new Date(app.startDate).setHours(0, 0, 0, 0) === today)
    .slice(0, 4);

  return (
    <div className="flex flex-col gap-8">
      {/* 1. SECCIÓN DE GRÁFICAS (3 Columnas) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* GRÁFICA DE ACTIVIDAD */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col min-h-[350px]">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h3 className="font-bold text-gray-900">Resumen de Actividad</h3>
              <p className="text-xs text-gray-500">
                Citas por volumen de tiempo
              </p>
            </div>

            <div className="relative inline-block text-left">
              <select
                value={activityInterval}
                onChange={(e) =>
                  setActivityInterval(e.target.value as IntervalType)
                }
                className="appearance-none bg-gray-50 border border-gray-200 text-gray-700 text-[10px] font-bold uppercase tracking-wider rounded-lg pl-3 pr-8 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 cursor-pointer"
              >
                <option value="3M">Últimos 3 meses</option>
                <option value="6M">Últimos 6 meses</option>
                <option value="1Y">Este año</option>
              </select>
              <ChevronDown className="w-3 h-3 text-gray-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          <div className="flex-grow flex items-end justify-between gap-2 px-2 relative">
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none pb-6">
              <div className="border-t border-gray-50 w-full h-0"></div>
              <div className="border-t border-gray-50 w-full h-0"></div>
              <div className="border-t border-gray-50 w-full h-0"></div>
            </div>

            {activityData.data.map((item, i) => {
              const height = (item.count / activityData.max) * 100;
              return (
                <div
                  key={i}
                  className="relative flex flex-col items-center flex-1 group h-full justify-end"
                >
                  <span className="absolute -top-6 text-[10px] font-bold text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity">
                    {item.count}
                  </span>
                  <div
                    style={{
                      height: `${item.count === 0 ? "4%" : `${height}%`}`,
                    }}
                    className={`w-full max-w-[32px] transition-all duration-700 ease-out rounded-t-md shadow-sm ${
                      item.count === 0
                        ? "bg-gray-100"
                        : "bg-indigo-500 hover:bg-indigo-600"
                    }`}
                  />
                  <span className="mt-3 text-[10px] font-bold text-gray-400 uppercase truncate w-full text-center">
                    {item.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* GRÁFICA DE ESPECIALIDADES */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h3 className="font-bold text-gray-900">Especialidades Top</h3>
              <p className="text-xs text-gray-500">Demanda por área médica</p>
            </div>
            {/* <Stethoscope className="text-gray-300 w-5 h-5" /> */}
          </div>

          <div className="flex items-end justify-between h-[200px] gap-4 px-2 mt-auto">
            {specData.sorted.map((spec, i) => {
              const height = (spec.count / specData.max) * 100;
              return (
                <div
                  key={i}
                  className="flex flex-col items-center justify-end flex-1 group h-full"
                >
                  <span className="text-[10px] font-bold text-indigo-600 mb-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    {spec.count}
                  </span>
                  <div
                    style={{
                      height: `${spec.count === 0 ? "4%" : `${height}%`}`,
                    }}
                    className={`w-full bg-indigo-500/10 border-b-4 border-indigo-500 rounded-t-lg transition-all duration-700 ${
                      spec.count > 0 ? "bg-indigo-500/20" : "bg-gray-50"
                    }`}
                  />
                  <span
                    className="mt-3 text-[9px] font-bold text-gray-400 text-center uppercase truncate w-full"
                    title={spec.name}
                  >
                    {spec.name.substring(0, 5)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* GRÁFICA DE SERVICIOS TOP (NUEVO) */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h3 className="font-bold text-gray-900">Servicios Top</h3>
              <p className="text-xs text-gray-500">
                Procedimientos más solicitados
              </p>
            </div>
            {/* <Sparkles className="text-gray-300 w-5 h-5" /> */}
          </div>

          <div className="flex items-end justify-between h-[200px] gap-4 px-2 mt-auto">
            {serviceData.sorted.map((srv, i) => {
              const height = (srv.count / serviceData.max) * 100;
              return (
                <div
                  key={i}
                  className="flex flex-col items-center justify-end flex-1 group h-full"
                >
                  <span className="text-[10px] font-bold text-sky-600 mb-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    {srv.count}
                  </span>
                  <div
                    style={{
                      height: `${srv.count === 0 ? "4%" : `${height}%`}`,
                    }}
                    className={`w-full bg-sky-500/10 border-b-4 border-sky-500 rounded-t-lg transition-all duration-700 ${
                      srv.count > 0 ? "bg-sky-500/20" : "bg-gray-50"
                    }`}
                  />
                  <span
                    className="mt-3 text-[9px] font-bold text-gray-400 text-center uppercase truncate w-full"
                    title={srv.name}
                  >
                    {srv.name.substring(0, 5)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 2. SECCIÓN DE LISTAS (Mantiene 2 columnas) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-gray-900">Citas de Hoy</h3>
            <Link
              to="/appointments"
              className="text-xs font-bold text-indigo-600 hover:underline"
            >
              Ver todas
            </Link>
          </div>
          <div className="flex flex-col gap-4">
            {isLoading ? (
              <p className="p-4 text-center text-sm text-gray-400 italic">
                Actualizando agenda...
              </p>
            ) : (
              todayAppointments.map((app) => (
                <Link
                  key={app.id}
                  to={`/appointments/${app.id}`}
                  className="group flex items-center justify-between p-4 bg-gray-50/50 rounded-xl border border-transparent hover:border-indigo-100 hover:bg-white transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex flex-col items-center justify-center bg-white w-14 h-14 rounded-lg border border-gray-100 shadow-sm flex-shrink-0">
                      <span className="text-[9px] font-bold text-gray-400 uppercase">
                        {format(new Date(app.startDate), "dd MMM", {
                          locale: es,
                        })}
                      </span>
                      <span className="text-[11px] font-black text-indigo-600">
                        {format(new Date(app.startDate), "HH:mm")}
                      </span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-1.5 text-sm font-bold text-gray-900">
                        <User className="w-3.5 h-3.5 text-indigo-500" />
                        {getPatientName(app.patientId)}
                      </div>
                      <div className="flex items-center gap-2 text-[10px] text-gray-500">
                        <Stethoscope className="w-3 h-3" /> Dr.{" "}
                        {getMedicName(app.medicId)}
                        <span>•</span>
                        <Activity className="w-3 h-3" />{" "}
                        {getServiceName(app.serviceId)}
                      </div>
                    </div>
                  </div>
                  <div className="px-2.5 py-1 rounded-md text-[10px] font-bold bg-indigo-50 text-indigo-600 uppercase">
                    {app.status}
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>

        {/* WIDGET SUSCRIPCIONES (Estático por ahora) */}
        {/* <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex justify-between items-center mb-6 text-amber-600">
            <h3 className="font-bold text-gray-900">
              Suscripciones por Vencer
            </h3>
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div className="flex flex-col gap-3">
            {[
              { n: "Maria G.", p: "Premium", d: 5 },
              { n: "Carlos R.", p: "Básico", d: 8 },
            ].map((s, i) => (
              <div
                key={i}
                className="flex justify-between p-4 bg-orange-50/30 border border-orange-100/50 rounded-xl"
              >
                <div className="text-sm font-bold text-gray-800">
                  {s.n}{" "}
                  <span className="block text-[10px] font-medium text-gray-400">
                    {s.p}
                  </span>
                </div>
                <div className="text-[10px] font-bold text-orange-600 bg-white px-2 py-1 rounded border border-orange-100">
                  Vence en {s.d} días
                </div>
              </div>
            ))}
          </div>
        </div> */}
      </div>

      <AppointmentsCalendar appointments={appointmentsFormated} />
    </div>
  );
};
