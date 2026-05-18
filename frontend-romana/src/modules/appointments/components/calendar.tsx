import { useMemo, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  CalendarDays,
  Clock3,
  User,
  Stethoscope,
  HeartPulseIcon,
} from "lucide-react";

interface Appointment {
  id: string;
  startDate: string;
  endTime: string;
  patientId: string;
  medicId: string;
  serviceId: string;
  status: string;
  type: string;
  patientCharge: number;
  medicEarning: number;
  preNotes?: string;
  medicName: string;
  patientName: string;
  serviceName: string;
}

interface Props {
  appointments: Appointment[];
}

const DAYS = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

export default function AppointmentsCalendar({ appointments }: Props) {
  const today = new Date();

  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  const [selectedDate, setSelectedDate] = useState<Date>(today);

  const firstDayOfMonth = new Date(currentYear, currentMonth, 1);

  const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);

  const startingWeekDay = firstDayOfMonth.getDay();

  const totalDays = lastDayOfMonth.getDate();

  const appointmentsByDate = useMemo(() => {
    const grouped: Record<string, Appointment[]> = {};

    appointments.forEach((appointment) => {
      const date = new Date(appointment.startDate);

      const key = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;

      if (!grouped[key]) {
        grouped[key] = [];
      }

      grouped[key].push(appointment);
    });

    return grouped;
  }, [appointments]);

  const selectedKey = `${selectedDate.getFullYear()}-${selectedDate.getMonth()}-${selectedDate.getDate()}`;

  const selectedAppointments = appointmentsByDate[selectedKey] || [];

  const monthName = new Intl.DateTimeFormat("es-MX", {
    month: "long",
    year: "numeric",
  }).format(new Date(currentYear, currentMonth));

  const previousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((prev) => prev - 1);
      return;
    }

    setCurrentMonth((prev) => prev - 1);
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((prev) => prev + 1);
      return;
    }

    setCurrentMonth((prev) => prev + 1);
  };

  const generateCalendarDays = () => {
    const days = [];

    for (let i = 0; i < startingWeekDay; i++) {
      days.push(null);
    }

    for (let day = 1; day <= totalDays; day++) {
      days.push(day);
    }

    return days;
  };

  const calendarDays = generateCalendarDays();

  const isToday = (day: number) => {
    return (
      today.getDate() === day &&
      today.getMonth() === currentMonth &&
      today.getFullYear() === currentYear
    );
  };

  const isSelected = (day: number) => {
    return (
      selectedDate.getDate() === day &&
      selectedDate.getMonth() === currentMonth &&
      selectedDate.getFullYear() === currentYear
    );
  };

  const getAppointmentsForDay = (day: number) => {
    const key = `${currentYear}-${currentMonth}-${day}`;

    return appointmentsByDate[key] || [];
  };

  const formatTime = (date: string) => {
    return new Date(date).toLocaleTimeString("es-MX", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-[1.2fr_0.8fr] gap-6">
      {/* CALENDARIO */}
      <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden">
        {/* HEADER */}
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-indigo-100 flex items-center justify-center text-indigo-700">
              <CalendarDays className="w-6 h-6" />
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900 capitalize">
                {monthName}
              </h2>

              <p className="text-sm text-slate-500">
                {appointments.length} citas registradas
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={previousMonth}
              className="w-10 h-10 rounded-xl border border-slate-200 flex items-center justify-center hover:bg-slate-100 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={nextMonth}
              className="w-10 h-10 rounded-xl border border-slate-200 flex items-center justify-center hover:bg-slate-100 transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* DÍAS */}
        <div className="grid grid-cols-7 border-b border-slate-100">
          {DAYS.map((day) => (
            <div
              key={day}
              className="py-4 text-center text-sm font-bold text-slate-500"
            >
              {day}
            </div>
          ))}
        </div>

        {/* GRID */}
        <div className="grid grid-cols-7 auto-rows-[130px]">
          {calendarDays.map((day, index) => {
            if (!day) {
              return (
                <div
                  key={index}
                  className="border-r border-b border-slate-100 bg-slate-50/50"
                />
              );
            }

            const dayAppointments = getAppointmentsForDay(day);

            return (
              <div
                key={day}
                onClick={() =>
                  setSelectedDate(new Date(currentYear, currentMonth, day))
                }
                className={`group relative border-r border-b border-slate-100 p-3 cursor-pointer transition-all overflow-hidden
                  ${isSelected(day) ? "bg-indigo-50" : "hover:bg-slate-50"}
                `}
              >
                {/* TODAY */}
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mb-2
                    ${
                      isToday(day)
                        ? "bg-indigo-600 text-white"
                        : "text-slate-700"
                    }
                  `}
                >
                  {day}
                </div>

                {/* TOTAL */}
                {dayAppointments.length > 0 && (
                  <div className="inline-flex items-center justify-center min-w-[28px] h-7 px-2 rounded-full bg-indigo-600 text-white text-xs font-bold shadow-sm">
                    {dayAppointments.length}
                  </div>
                )}

                {/* MINI LIST */}
                <div className="mt-3 flex flex-col gap-1 overflow-hidden">
                  {dayAppointments.slice(0, 2).map((appointment) => (
                    <div
                      key={appointment.id}
                      className="text-[11px] px-2 py-1 rounded-lg bg-slate-100 text-slate-700 truncate"
                    >
                      {formatTime(appointment.startDate)} • {appointment.status}
                    </div>
                  ))}

                  {dayAppointments.length > 2 && (
                    <span className="text-[11px] text-slate-400 font-medium">
                      +{dayAppointments.length - 2} más
                    </span>
                  )}
                </div>

                {/* HOVER CARD */}
                {dayAppointments.length > 0 && (
                  <div className="absolute z-30 hidden group-hover:flex flex-col gap-2 top-2 left-full ml-3 w-72 bg-white border border-slate-200 rounded-2xl shadow-2xl p-4">
                    <div>
                      <h4 className="font-bold text-slate-900">
                        {dayAppointments.length} citas
                      </h4>

                      <p className="text-xs text-slate-500 mt-1">
                        {day}/{currentMonth + 1}/{currentYear}
                      </p>
                    </div>

                    <div className="flex flex-col gap-2 max-h-72 overflow-y-auto">
                      {dayAppointments.map((appointment) => (
                        <div
                          key={appointment.id}
                          className="p-3 rounded-xl bg-slate-50 border border-slate-100"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-slate-900">
                              {formatTime(appointment.startDate)}
                            </span>

                            <span
                              className={`text-[10px] font-bold px-2 py-1 rounded-full
                                ${
                                  appointment.status === "COMPLETADA"
                                    ? "bg-green-100 text-green-700"
                                    : "bg-amber-100 text-amber-700"
                                }
                              `}
                            >
                              {appointment.status}
                            </span>
                          </div>

                          <div className="mt-2 flex flex-col gap-1 text-xs text-slate-600">
                            <span>Paciente: {appointment.patientName}</span>

                            <span>Servicio: {appointment.serviceName}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* PANEL DERECHO */}
      <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden h-fit sticky top-4">
        <div className="p-6 border-b border-slate-100">
          <h3 className="text-xl font-bold text-slate-900">Citas del día</h3>

          <p className="text-sm text-slate-500 mt-1 capitalize">
            {selectedDate.toLocaleDateString("es-MX", {
              weekday: "long",
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>

        <div className="p-6 flex flex-col gap-4 max-h-[700px] overflow-y-auto">
          {selectedAppointments.length === 0 ? (
            <div className="text-center py-12 border border-dashed border-slate-200 rounded-2xl bg-slate-50">
              <CalendarDays className="w-12 h-12 text-slate-300 mx-auto mb-4" />

              <h4 className="font-bold text-slate-900">Sin citas</h4>

              <p className="text-sm text-slate-500 mt-2">
                No hay citas registradas para este día.
              </p>
            </div>
          ) : (
            selectedAppointments.map((appointment) => (
              <div
                key={appointment.id}
                className="border border-slate-200 rounded-2xl p-5 hover:border-indigo-200 hover:shadow-md transition-all"
              >
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="font-bold text-slate-900">
                      {formatTime(appointment.startDate)}
                    </h4>

                    <p className="text-sm text-slate-500 mt-1">
                      {appointment.type}
                    </p>
                  </div>

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold
                      ${
                        appointment.status === "COMPLETADA"
                          ? "bg-green-100 text-green-700"
                          : "bg-amber-100 text-amber-700"
                      }
                    `}
                  >
                    {appointment.status}
                  </span>
                </div>

                <div className="flex flex-col gap-3 text-sm text-slate-600">
                  <div className="flex items-center gap-2">
                    <Clock3 className="w-4 h-4 text-indigo-500" />
                    <span>Finaliza: {formatTime(appointment.endTime)}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-indigo-500" />
                    <span>Paciente: {appointment.patientName}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Stethoscope className="w-4 h-4 text-indigo-500" />
                    <span>Medico: {appointment.medicName}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <HeartPulseIcon className="w-4 h-4 text-indigo-500" />
                    <span>Servicio: {appointment.serviceName}</span>
                  </div>
                </div>

                {appointment.preNotes && (
                  <div className="mt-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
                    <p className="text-xs font-bold text-slate-500 uppercase mb-2">
                      Notas previas
                    </p>

                    <p className="text-sm text-slate-700">
                      {appointment.preNotes}
                    </p>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
