import { Link } from "react-router-dom";
import { useAppointments } from "../hooks/useAppointments";
import { usePatients } from "@/modules/patients/hooks/usePatients";
import { useMedics } from "@/modules/medics/hooks/useMedics";
import { useServices } from "@/modules/services/hooks/useServices";
import { Search, Plus, Filter, ChevronDown, Calendar, Clock, User, Stethoscope } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";

export const AppointmentsPage = () => {
  const { data: appointments, isLoading } = useAppointments();
  const { data: patients } = usePatients();
  const { data: medics } = useMedics();
  const { data: services } = useServices();

  // Lógica intacta
  const getPatientName = (patientId: string) => {
    return patients?.find((patient) => patient.id === patientId)?.name ?? "Desconocido";
  };

  const getMedicName = (medicId: string) => {
    return medics?.find((medic) => medic.id === medicId)?.name ?? "Desconocido";
  };

  const getServiceName = (serviceId: string) => {
    return services?.find((service) => service.id === serviceId)?.name ?? "Desconocido";
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-gray-500 font-medium">Cargando citas...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      
      {/* 1. Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Citas</h1>
          <p className="text-sm text-gray-500 mt-1">Gestiona la agenda y programación de la clínica</p>
        </div>
        <Link 
          to="/appointments/schedule"
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Agendar Cita
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
              placeholder="Buscar por paciente, médico o servicio..." 
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
        <div className="grid grid-cols-[2fr_2fr_1.5fr_1.5fr_1fr_1fr] items-center px-6 py-3 bg-gray-50/50 border-b border-gray-200 text-xs font-semibold text-gray-500 uppercase tracking-wider">
          <span>Paciente</span>
          <span>Médico</span>
          <span>Servicio</span>
          <span>Fecha y Hora</span>
          <span>Modalidad</span>
          <span>Estado</span>
        </div>

        {/* List Body */}
        <div className="flex flex-col">
          {appointments?.map((appointment) => {
            const startDate = new Date(appointment.startDate);

            return (
              <Link
                key={appointment.id}
                to={`/appointments/${appointment.id}`}
                className="grid grid-cols-[2fr_2fr_1.5fr_1.5fr_1fr_1fr] items-center px-6 py-4 border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer group last:border-b-0"
              >
                {/* Columna Paciente */}
                <div className="flex items-center gap-3 overflow-hidden pr-4">
                  <div className="w-8 h-8 rounded-full bg-indigo-50 text-indigo-500 flex items-center justify-center flex-shrink-0">
                    <User className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-semibold text-gray-900 truncate group-hover:text-indigo-600 transition-colors">
                    {getPatientName(appointment.patientId)}
                  </span>
                </div>

                {/* Columna Médico */}
                <div className="flex items-center gap-3 overflow-hidden pr-4">
                  <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center flex-shrink-0">
                    <Stethoscope className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-medium text-gray-700 truncate">
                    {getMedicName(appointment.medicId)}
                  </span>
                </div>

                {/* Columna Servicio */}
                <div className="text-sm text-gray-600 truncate pr-4">
                  {getServiceName(appointment.serviceId)}
                </div>

                {/* Columna Fecha y Hora */}
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

                {/* Columna Modalidad (Tipo) */}
                <div>
                  <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${
                    appointment.type === 'IN_PERSON' ? 'text-purple-700 bg-purple-50' : 'text-cyan-700 bg-cyan-50'
                  }`}>
                    {appointment.type === 'IN_PERSON' ? 'Presencial' : 'En línea'}
                  </span>
                </div>

                {/* Columna Estado */}
                <div>
                  <span className={`px-2.5 py-1 text-xs font-medium rounded-full border ${
                    appointment.status === 'PROGRAMADA' 
                      ? 'text-blue-700 bg-blue-50 border-blue-100' 
                      : appointment.status === 'COMPLETADA'
                      ? 'text-green-700 bg-green-50 border-green-100'
                      : 'text-gray-700 bg-gray-100 border-gray-200'
                  }`}>
                    {appointment.status.charAt(0) + appointment.status.slice(1).toLowerCase()}
                  </span>
                </div>
              </Link>
            );
          })}

          {appointments?.length === 0 && (
            <div className="p-8 text-center text-gray-500 text-sm">
              No hay citas programadas.
            </div>
          )}
        </div>

        {/* Footer / Paginación */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
          <span className="text-sm text-gray-500">
            Mostrando {appointments?.length || 0} de {appointments?.length || 0} resultados
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