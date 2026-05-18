import { Link } from "react-router-dom";
import { useMemo, useState } from "react";

import { useAppointments } from "../hooks/useAppointments";
import { usePatients } from "@/modules/patients/hooks/usePatients";
import { useMedics } from "@/modules/medics/hooks/useMedics";
import { useServices } from "@/modules/services/hooks/useServices";

import {
  Search,
  Plus,
  Filter,
  ChevronDown,
  Calendar,
  Clock,
  User,
  Stethoscope,
  LayoutGrid,
  CalendarDays,
} from "lucide-react";

import { format } from "date-fns";
import { es } from "date-fns/locale";

import { useAuthStore } from "@/modules/auth/store/auth.store";
import AppointmentsCalendar from "../components/calendar";

export const AppointmentsPage = () => {
  const { data: appointments, isLoading } = useAppointments();

  const { data: patients } = usePatients();
  const { data: medics } = useMedics();
  const { data: services } = useServices();

  const user = useAuthStore((state) => state.user);

  const isMedic = user?.roles.includes("MEDIC") ?? false;

  // ===============================
  // STATES
  // ===============================

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] = useState("ALL");

  const [viewMode, setViewMode] = useState<"table" | "calendar">("table");

  // ===============================
  // HELPERS
  // ===============================

  const getPatientName = (patientId: string) => {
    return (
      patients?.find((patient) => patient.id === patientId)?.name ??
      "Desconocido"
    );
  };

  const getMedicName = (medicId: string) => {
    return medics?.find((medic) => medic.id === medicId)?.name ?? "Desconocido";
  };

  const getServiceName = (serviceId: string) => {
    return (
      services?.find((service) => service.id === serviceId)?.name ??
      "Desconocido"
    );
  };

  // ===============================
  // FILTERED APPOINTMENTS
  // ===============================

  const filteredAppointments = useMemo(() => {
    if (!appointments) return [];

    return appointments.filter((appointment) => {
      const patientName = getPatientName(appointment.patientId).toLowerCase();

      const medicName = getMedicName(appointment.medicId).toLowerCase();

      const serviceName = getServiceName(appointment.serviceId).toLowerCase();

      const searchText = search.toLowerCase();

      const matchesSearch =
        patientName.includes(searchText) ||
        medicName.includes(searchText) ||
        serviceName.includes(searchText);

      const matchesStatus =
        statusFilter === "ALL" || appointment.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [appointments, search, statusFilter, patients, medics, services]);

  const appointmentsFormated = appointments?.map((app) => ({
    ...app,
    patientName: getPatientName(app.patientId),
    serviceName: getServiceName(app.serviceId),
    medicName: getMedicName(app.medicId),
  }));
  // ===============================
  // LOADING
  // ===============================

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-gray-500 font-medium">Cargando citas...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Citas</h1>

          <p className="text-sm text-gray-500 mt-1">
            Gestiona la agenda y programación de la clínica
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* TOGGLE VIEW */}
          <div className="flex items-center bg-white border border-gray-200 rounded-xl p-1 shadow-sm">
            <button
              onClick={() => setViewMode("table")}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                viewMode === "table"
                  ? "bg-indigo-600 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
              Tabla
            </button>

            <button
              onClick={() => setViewMode("calendar")}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                viewMode === "calendar"
                  ? "bg-indigo-600 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <CalendarDays className="w-4 h-4" />
              Calendario
            </button>
          </div>

          {!isMedic && (
            <Link
              to="/appointments/schedule"
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Agendar Cita
            </Link>
          )}
        </div>
      </div>

      {/* CALENDAR VIEW */}
      {viewMode === "calendar" ? (
        <AppointmentsCalendar appointments={appointmentsFormated} />
      ) : (
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm flex flex-col">
          {/* TOOLBAR */}
          <div className="flex items-center gap-4 p-4 border-b border-gray-200">
            {/* SEARCH */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar por paciente, médico o servicio..."
                className="w-full pl-9 pr-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              />
            </div>

            {/* STATUS FILTER */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="appearance-none pl-9 pr-10 py-2 text-sm font-medium border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              >
                <option value="ALL">Todos los estados</option>

                <option value="PROGRAMADA">Programadas</option>

                <option value="COMPLETADA">Completadas</option>

                <option value="CANCELADA">Canceladas</option>
              </select>

              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* TABLE HEADER */}
          <div className="grid grid-cols-[2fr_2fr_1.5fr_1.5fr_1fr_1fr] items-center px-6 py-3 bg-gray-50/50 border-b border-gray-200 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            <span>Paciente</span>
            <span>Médico</span>
            <span>Servicio</span>
            <span>Fecha y Hora</span>
            <span>Modalidad</span>
            <span>Estado</span>
          </div>

          {/* TABLE BODY */}
          <div className="flex flex-col">
            {filteredAppointments.map((appointment) => {
              const startDate = new Date(appointment.startDate);

              return (
                <Link
                  key={appointment.id}
                  to={`/appointments/${appointment.id}`}
                  className="grid grid-cols-[2fr_2fr_1.5fr_1.5fr_1fr_1fr] items-center px-6 py-4 border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer group last:border-b-0"
                >
                  {/* PATIENT */}
                  <div className="flex items-center gap-3 overflow-hidden pr-4">
                    <div className="w-8 h-8 rounded-full bg-indigo-50 text-indigo-500 flex items-center justify-center flex-shrink-0">
                      <User className="w-4 h-4" />
                    </div>

                    <span className="text-sm font-semibold text-gray-900 truncate group-hover:text-indigo-600 transition-colors">
                      {getPatientName(appointment.patientId)}
                    </span>
                  </div>

                  {/* MEDIC */}
                  <div className="flex items-center gap-3 overflow-hidden pr-4">
                    <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center flex-shrink-0">
                      <Stethoscope className="w-4 h-4" />
                    </div>

                    <span className="text-sm font-medium text-gray-700 truncate">
                      {getMedicName(appointment.medicId)}
                    </span>
                  </div>

                  {/* SERVICE */}
                  <div className="text-sm text-gray-600 truncate pr-4">
                    {getServiceName(appointment.serviceId)}
                  </div>

                  {/* DATE */}
                  <div className="flex flex-col gap-0.5">
                    <div className="flex items-center gap-1.5 text-sm font-medium text-gray-900">
                      <Calendar className="w-3.5 h-3.5 text-gray-400" />

                      {format(startDate, "dd MMM yyyy", { locale: es })}
                    </div>

                    <div className="flex items-center gap-1.5 text-xs text-gray-500">
                      <Clock className="w-3.5 h-3.5 text-gray-400" />

                      {format(startDate, "hh:mm a")}
                    </div>
                  </div>

                  {/* TYPE */}
                  <div>
                    <span
                      className={`px-2.5 py-1 text-xs font-medium rounded-full ${
                        appointment.type === "IN_PERSON"
                          ? "text-purple-700 bg-purple-50"
                          : "text-cyan-700 bg-cyan-50"
                      }`}
                    >
                      {appointment.type === "IN_PERSON"
                        ? "Presencial"
                        : "En línea"}
                    </span>
                  </div>

                  {/* STATUS */}
                  <div>
                    <span
                      className={`px-2.5 py-1 text-xs font-medium rounded-full border ${
                        appointment.status === "PROGRAMADA"
                          ? "text-blue-700 bg-blue-50 border-blue-100"
                          : appointment.status === "COMPLETADA"
                            ? "text-green-700 bg-green-50 border-green-100"
                            : "text-gray-700 bg-gray-100 border-gray-200"
                      }`}
                    >
                      {appointment.status.charAt(0) +
                        appointment.status.slice(1).toLowerCase()}
                    </span>
                  </div>
                </Link>
              );
            })}

            {filteredAppointments.length === 0 && (
              <div className="p-8 text-center text-gray-500 text-sm">
                No se encontraron citas.
              </div>
            )}
          </div>

          {/* FOOTER */}
          <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
            <span className="text-sm text-gray-500">
              Mostrando {filteredAppointments.length} de{" "}
              {appointments?.length || 0} resultados
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
      )}
    </div>
  );
};
