import React from 'react';
import { Calendar, Clock, User } from 'lucide-react';

interface Appointment {
  id: string;
  clientName: string;
  doctorName: string;
  service: string;
  time: string;
  status: 'pendiente' | 'confirmada' | 'completada';
}

interface UpcomingAppointmentsProps {
  appointments: Appointment[];
}

const statusColors = {
  pendiente: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  confirmada: 'bg-blue-100 text-blue-700 border-blue-200',
  completada: 'bg-green-100 text-green-700 border-green-200'
};

export function UpcomingAppointments({ appointments }: UpcomingAppointmentsProps) {
  return (
    <div className="bg-white rounded-xl border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Citas de Hoy</h3>
          <p className="text-sm text-muted-foreground mt-0.5">
            {appointments.length} citas programadas
          </p>
        </div>
        <button className="text-sm text-primary hover:text-primary/80 font-medium">
          Ver todas
        </button>
      </div>

      <div className="space-y-3">
        {appointments.length === 0 ? (
          <div className="text-center py-8">
            <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-50" />
            <p className="text-sm text-muted-foreground">No hay citas programadas para hoy</p>
          </div>
        ) : (
          appointments.map(appointment => (
            <div 
              key={appointment.id}
              className="p-4 rounded-lg border border-border hover:border-primary transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm font-medium text-foreground">{appointment.time}</span>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full border ${statusColors[appointment.status]}`}>
                  {appointment.status}
                </span>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-foreground">{appointment.clientName}</span>
                </div>
                <div className="text-sm text-muted-foreground pl-6">
                  Dr. {appointment.doctorName} • {appointment.service}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
