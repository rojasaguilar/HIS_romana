import React from 'react';
import { Header } from '../layout/Header';
import { StatsCard } from '../dashboard/StatsCard';
import { UpcomingAppointments } from '../dashboard/UpcomingAppointments';
import { ExpiringSubscriptions } from '../dashboard/ExpiringSubscriptions';
import { Users, Calendar, Clock, AlertCircle } from 'lucide-react';

// Mock data
const appointmentsData = [
  { id: '1', clientName: 'María González', doctorName: 'Carlos Ruiz', service: 'Consulta General', time: '09:00 AM', status: 'confirmada' as const },
  { id: '2', clientName: 'Juan Pérez', doctorName: 'Ana López', service: 'Dermatología', time: '10:30 AM', status: 'pendiente' as const },
  { id: '3', clientName: 'Sofia Martínez', doctorName: 'Carlos Ruiz', service: 'Pediatría', time: '11:00 AM', status: 'confirmada' as const },
  { id: '4', clientName: 'Pedro Sánchez', doctorName: 'Luis Torres', service: 'Cardiología', time: '02:00 PM', status: 'confirmada' as const },
  { id: '5', clientName: 'Laura Jiménez', doctorName: 'Ana López', service: 'Consulta General', time: '03:30 PM', status: 'pendiente' as const },
];

const expiringSubscriptions = [
  { id: '1', clientName: 'María González', packageName: 'Paquete Premium', expiryDate: '15 Feb 2026', daysLeft: 5 },
  { id: '2', clientName: 'Carlos Rivera', packageName: 'Paquete Básico', expiryDate: '18 Feb 2026', daysLeft: 8 },
  { id: '3', clientName: 'Ana Fernández', packageName: 'Paquete Familiar', expiryDate: '12 Feb 2026', daysLeft: 2 },
];

export function ReceptionistDashboard() {
  return (
    <div className="min-h-screen bg-background">
      <Header 
        title="Dashboard" 
        subtitle="Panel de recepción"
      />

      <div className="p-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Citas de Hoy"
            value="5"
            change="2 pendientes de confirmar"
            changeType="neutral"
            icon={Calendar}
            iconColor="bg-primary"
          />
          <StatsCard
            title="Próxima Cita"
            value="09:00 AM"
            change="María González"
            changeType="neutral"
            icon={Clock}
            iconColor="bg-blue-500"
          />
          <StatsCard
            title="Clientes en Espera"
            value="3"
            change="En sala de espera"
            changeType="neutral"
            icon={Users}
            iconColor="bg-green-500"
          />
          <StatsCard
            title="Alertas"
            value="3"
            change="Suscripciones por vencer"
            changeType="neutral"
            icon={AlertCircle}
            iconColor="bg-orange-500"
          />
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl border border-border p-6 mb-8">
          <h3 className="text-lg font-semibold text-foreground mb-4">Acciones Rápidas</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <button className="flex flex-col items-center gap-3 p-4 border-2 border-border rounded-xl hover:border-primary hover:bg-secondary/50 transition-all">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Calendar className="w-6 h-6 text-primary" />
              </div>
              <span className="text-sm font-medium text-foreground">Nueva Cita</span>
            </button>

            <button className="flex flex-col items-center gap-3 p-4 border-2 border-border rounded-xl hover:border-primary hover:bg-secondary/50 transition-all">
              <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-500" />
              </div>
              <span className="text-sm font-medium text-foreground">Nuevo Cliente</span>
            </button>

            <button className="flex flex-col items-center gap-3 p-4 border-2 border-border rounded-xl hover:border-primary hover:bg-secondary/50 transition-all">
              <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center">
                <Clock className="w-6 h-6 text-green-500" />
              </div>
              <span className="text-sm font-medium text-foreground">Check-in</span>
            </button>

            <button className="flex flex-col items-center gap-3 p-4 border-2 border-border rounded-xl hover:border-primary hover:bg-secondary/50 transition-all">
              <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-purple-500" />
              </div>
              <span className="text-sm font-medium text-foreground">Ver Alertas</span>
            </button>
          </div>
        </div>

        {/* Appointments and Subscriptions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <UpcomingAppointments appointments={appointmentsData} />
          <ExpiringSubscriptions subscriptions={expiringSubscriptions} />
        </div>
      </div>
    </div>
  );
}
