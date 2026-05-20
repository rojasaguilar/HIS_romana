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
  ChevronDown,
  Stethoscope,
  Activity,
} from "lucide-react";

type IntervalType = "3M" | "6M" | "1Y";

const SPECIALITY_COLORS = [
  {
    bg: "bg-indigo-500",
    soft: "bg-indigo-500/20",
    border: "border-indigo-500",
    text: "text-indigo-600",
    dot: "bg-indigo-500",
  },

  {
    bg: "bg-pink-500",
    soft: "bg-pink-500/20",
    border: "border-pink-500",
    text: "text-pink-600",
    dot: "bg-pink-500",
  },

  {
    bg: "bg-emerald-500",
    soft: "bg-emerald-500/20",
    border: "border-emerald-500",
    text: "text-emerald-600",
    dot: "bg-emerald-500",
  },

  {
    bg: "bg-orange-500",
    soft: "bg-orange-500/20",
    border: "border-orange-500",
    text: "text-orange-600",
    dot: "bg-orange-500",
  },

  {
    bg: "bg-sky-500",
    soft: "bg-sky-500/20",
    border: "border-sky-500",
    text: "text-sky-600",
    dot: "bg-sky-500",
  },

  {
    bg: "bg-violet-500",
    soft: "bg-violet-500/20",
    border: "border-violet-500",
    text: "text-violet-600",
    dot: "bg-violet-500",
  },
];

export const DashboardPage = () => {
  const { data: appointments = [], isLoading } = useAppointments();
  const { data: patients } = usePatients();
  const { data: medics } = useMedics();
  const { data: services = [] } = useServices();
  const { data: specialities = [] } = useSpecialities();

  const [activityInterval, setActivityInterval] =
    useState<IntervalType>("6M");

  // MAPA DE COLORES POR ESPECIALIDAD
  const specialityColorMap = useMemo(() => {
    const map: Record<
      string,
      (typeof SPECIALITY_COLORS)[0]
    > = {};

    specialities.forEach((spec, index) => {
      map[spec.id] =
        SPECIALITY_COLORS[index % SPECIALITY_COLORS.length];
    });

    return map;
  }, [specialities]);

  // ACTIVIDAD
  const activityData = useMemo(() => {
    const now = new Date();

    let startDate: Date;

    if (activityInterval === "3M")
      startDate = subMonths(now, 2);
    else if (activityInterval === "6M")
      startDate = subMonths(now, 5);
    else startDate = startOfYear(now);

    const months = eachMonthOfInterval({
      start: startDate,
      end: now,
    });

    const data = months.map((month) => {
      const count = appointments.filter((app) =>
        isSameMonth(new Date(app.startDate), month),
      ).length;

      return {
        label: format(month, "MMM", { locale: es }),
        count,
      };
    });

    const max = Math.max(
      ...data.map((d) => d.count),
      1,
    );

    return { data, max };
  }, [appointments, activityInterval]);

  // ESPECIALIDADES TOP
  const specData = useMemo(() => {
    const counts: Record<string, number> = {};

    appointments.forEach((app) => {
      const service = services.find(
        (s) => s.id === app.serviceId,
      );

      const specId = service?.specialityId || "OTROS";

      counts[specId] = (counts[specId] || 0) + 1;
    });

    const sorted = Object.entries(counts)
      .map(([id, count]) => ({
        id,
        name:
          specialities.find((s) => s.id === id)?.name ||
          "Otros",
        count,
        color:
          specialityColorMap[id] ||
          SPECIALITY_COLORS[0],
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    while (sorted.length < 5) {
      sorted.push({
        id: "-",
        name: "-",
        count: 0,
        color: SPECIALITY_COLORS[0],
      });
    }

    const max = Math.max(
      ...sorted.map((s) => s.count),
      1,
    );

    return { sorted, max };
  }, [
    appointments,
    services,
    specialities,
    specialityColorMap,
  ]);

  // SERVICIOS TOP
  const serviceData = useMemo(() => {
    const counts: Record<string, number> = {};

    appointments.forEach((app) => {
      const srvId = app.serviceId || "UNKNOWN";

      counts[srvId] = (counts[srvId] || 0) + 1;
    });

    const sorted = Object.entries(counts)
      .map(([id, count]) => {
        const service = services.find(
          (s) => s.id === id,
        );

        const color =
          specialityColorMap[
            service?.specialityId || ""
          ] || SPECIALITY_COLORS[0];

        return {
          id,
          name: service?.name || "Otros",
          count,

          specialityName:
            specialities.find(
              (s) =>
                s.id === service?.specialityId,
            )?.name || "Otros",

          color,
        };
      })
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    while (sorted.length < 5) {
      sorted.push({
        id: "-",
        name: "-",
        count: 0,
        specialityName: "-",
        color: SPECIALITY_COLORS[0],
      });
    }

    const max = Math.max(
      ...sorted.map((s) => s.count),
      1,
    );

    return { sorted, max };
  }, [
    appointments,
    services,
    specialities,
    specialityColorMap,
  ]);

  // HELPERS
  const getPatientName = (id: string) =>
    patients?.find((p) => p.id === id)?.name ??
    "Paciente";

  const getMedicName = (id: string) =>
    medics?.find((m) => m.id === id)?.name ??
    "Médico";

  const getServiceName = (id: string) =>
    services.find((s) => s.id === id)?.name ??
    "Servicio";

  const appointmentsFormated = appointments.map(
    (app) => ({
      ...app,
      patientName: getPatientName(app.patientId),
      serviceName: getServiceName(app.serviceId),
      medicName: getMedicName(app.medicId),
    }),
  );

  const today = new Date().setHours(0, 0, 0, 0);

  const todayAppointments = appointments
    .filter(
      (app) =>
        new Date(app.startDate).setHours(
          0,
          0,
          0,
          0,
        ) === today,
    )
    .slice(0, 4);

  return (
    <div className="flex flex-col gap-8">
      {/* GRÁFICAS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* ACTIVIDAD */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col min-h-[350px]">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h3 className="font-bold text-gray-900">
                Resumen de Actividad
              </h3>

              <p className="text-xs text-gray-500">
                Citas por volumen de tiempo
              </p>
            </div>

            <div className="relative inline-block text-left">
              <select
                value={activityInterval}
                onChange={(e) =>
                  setActivityInterval(
                    e.target.value as IntervalType,
                  )
                }
                className="appearance-none bg-gray-50 border border-gray-200 text-gray-700 text-[10px] font-bold uppercase tracking-wider rounded-lg pl-3 pr-8 py-2 focus:outline-none"
              >
                <option value="3M">
                  Últimos 3 meses
                </option>

                <option value="6M">
                  Últimos 6 meses
                </option>

                <option value="1Y">
                  Este año
                </option>
              </select>

              <ChevronDown className="w-3 h-3 text-gray-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          <div className="flex-grow flex items-end justify-between gap-2 px-2 relative">
            {activityData.data.map((item, i) => {
              const height =
                (item.count /
                  activityData.max) *
                100;

              return (
                <div
                  key={i}
                  className="relative flex flex-col items-center flex-1 group h-full justify-end"
                >
                  <span className="absolute -top-6 text-[10px] font-bold text-indigo-600 opacity-0 group-hover:opacity-100">
                    {item.count}
                  </span>

                  <div
                    style={{
                      height: `${
                        item.count === 0
                          ? "4%"
                          : `${height}%`
                      }`,
                    }}
                    className={`w-full max-w-[32px] rounded-t-md ${
                      item.count === 0
                        ? "bg-gray-100"
                        : "bg-indigo-500 hover:bg-indigo-600"
                    }`}
                  />

                  <span className="mt-3 text-[10px] font-bold text-gray-400 uppercase">
                    {item.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* ESPECIALIDADES */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col">
          <div className="mb-8">
            <h3 className="font-bold text-gray-900">
              Especialidades Top
            </h3>

            <p className="text-xs text-gray-500">
              Demanda por área médica
            </p>
          </div>

          <div className="flex items-end justify-between h-[200px] gap-4 px-2 mt-auto">
            {specData.sorted.map((spec, i) => {
              const height =
                (spec.count / specData.max) * 100;

              return (
                <div
                  key={i}
                  className="flex flex-col items-center justify-end flex-1 group h-full"
                >
                  <span
                    className={`text-[10px] font-bold mb-1 opacity-0 group-hover:opacity-100 ${spec.color.text}`}
                  >
                    {spec.count}
                  </span>

                  <div
                    style={{
                      height: `${
                        spec.count === 0
                          ? "4%"
                          : `${height}%`
                      }`,
                    }}
                    className={`w-full rounded-t-lg border-b-4 transition-all duration-700 ${
                      spec.count > 0
                        ? spec.color.soft
                        : "bg-gray-50"
                    } ${spec.color.border}`}
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

          <div className="flex flex-wrap gap-3 mt-6">
            {specData.sorted.map((spec, i) => (
              <div
                key={i}
                className="flex items-center gap-2 text-[10px] font-medium text-gray-500"
              >
                <div
                  className={`w-2.5 h-2.5 rounded-full ${spec.color.dot}`}
                />

                <span>{spec.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* SERVICIOS */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col">
          <div className="mb-8">
            <h3 className="font-bold text-gray-900">
              Servicios Top
            </h3>

            <p className="text-xs text-gray-500">
              Procedimientos más solicitados
            </p>
          </div>

          <div className="flex items-end justify-between h-[200px] gap-4 px-2 mt-auto">
            {serviceData.sorted.map((srv, i) => {
              const height =
                (srv.count /
                  serviceData.max) *
                100;

              return (
                <div
                  key={i}
                  className="flex flex-col items-center justify-end flex-1 group h-full"
                >
                  <span
                    className={`text-[10px] font-bold mb-1 opacity-0 group-hover:opacity-100 ${srv.color.text}`}
                  >
                    {srv.count}
                  </span>

                  <div
                    style={{
                      height: `${
                        srv.count === 0
                          ? "4%"
                          : `${height}%`
                      }`,
                    }}
                    className={`w-full rounded-t-lg border-b-4 transition-all duration-700 ${
                      srv.count > 0
                        ? srv.color.soft
                        : "bg-gray-50"
                    } ${srv.color.border}`}
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

          <div className="flex flex-wrap gap-3 mt-6">
            {serviceData.sorted.map((srv, i) => (
              <div
                key={i}
                className="flex items-center gap-2 text-[10px] font-medium text-gray-500"
              >
                <div
                  className={`w-2.5 h-2.5 rounded-full ${srv.color.dot}`}
                />

                <span>
                  {srv.name}

                  <span className="text-gray-400 ml-1">
                    ({srv.specialityName})
                  </span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CITAS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-gray-900">
              Citas de Hoy
            </h3>

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
                        {format(
                          new Date(app.startDate),
                          "dd MMM",
                          {
                            locale: es,
                          },
                        )}
                      </span>

                      <span className="text-[11px] font-black text-indigo-600">
                        {format(
                          new Date(app.startDate),
                          "HH:mm",
                        )}
                      </span>
                    </div>

                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-1.5 text-sm font-bold text-gray-900">
                        <User className="w-3.5 h-3.5 text-indigo-500" />

                        {getPatientName(app.patientId)}
                      </div>

                      <div className="flex items-center gap-2 text-[10px] text-gray-500">
                        <Stethoscope className="w-3 h-3" />

                        Dr.{" "}
                        {getMedicName(app.medicId)}

                        <span>•</span>

                        <Activity className="w-3 h-3" />

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
      </div>

      <AppointmentsCalendar
        appointments={appointmentsFormated}
      />
    </div>
  );
};