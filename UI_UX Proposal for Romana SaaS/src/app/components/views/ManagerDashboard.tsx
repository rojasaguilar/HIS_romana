import React from 'react';
import { Header } from '../layout/Header';
import { StatsCard } from '../dashboard/StatsCard';
import { UpcomingAppointments } from '../dashboard/UpcomingAppointments';
import { ExpiringSubscriptions } from '../dashboard/ExpiringSubscriptions';
import { Users, Calendar, DollarSign, TrendingUp, Package } from 'lucide-react';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

// Mock data
const appointmentsData = [
  { id: '1', clientName: 'María González', doctorName: 'Carlos Ruiz', service: 'Consulta General', time: '09:00 AM', status: 'confirmada' as const },
  { id: '2', clientName: 'Juan Pérez', doctorName: 'Ana López', service: 'Dermatología', time: '10:30 AM', status: 'pendiente' as const },
  { id: '3', clientName: 'Sofia Martínez', doctorName: 'Carlos Ruiz', service: 'Pediatría', time: '11:00 AM', status: 'confirmada' as const },
  { id: '4', clientName: 'Pedro Sánchez', doctorName: 'Luis Torres', service: 'Cardiología', time: '02:00 PM', status: 'confirmada' as const },
];

const expiringSubscriptions = [
  { id: '1', clientName: 'María González', packageName: 'Paquete Premium', expiryDate: '15 Feb 2026', daysLeft: 5 },
  { id: '2', clientName: 'Carlos Rivera', packageName: 'Paquete Básico', expiryDate: '18 Feb 2026', daysLeft: 8 },
  { id: '3', clientName: 'Ana Fernández', packageName: 'Paquete Familiar', expiryDate: '12 Feb 2026', daysLeft: 2 },
];

const revenueData = [
  { month: 'Ago', revenue: 45000, appointments: 120 },
  { month: 'Sep', revenue: 52000, appointments: 145 },
  { month: 'Oct', revenue: 49000, appointments: 135 },
  { month: 'Nov', revenue: 61000, appointments: 170 },
  { month: 'Dic', revenue: 58000, appointments: 160 },
  { month: 'Ene', revenue: 67000, appointments: 185 },
  { month: 'Feb', revenue: 72000, appointments: 195 },
];

const servicesData = [
  { name: 'Consulta General', value: 45 },
  { name: 'Dermatología', value: 30 },
  { name: 'Pediatría', value: 25 },
  { name: 'Cardiología', value: 20 },
  { name: 'Otros', value: 15 },
];

export function ManagerDashboard() {
  return (
    <div className="min-h-screen bg-background">
      <Header 
        title="Dashboard" 
        subtitle="Resumen general de la clínica"
      />

      <div className="p-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Total Clientes"
            value="1,284"
            change="+12% vs mes anterior"
            changeType="positive"
            icon={Users}
            iconColor="bg-primary"
          />
          <StatsCard
            title="Citas del Mes"
            value="195"
            change="+8% vs mes anterior"
            changeType="positive"
            icon={Calendar}
            iconColor="bg-blue-500"
          />
          <StatsCard
            title="Ingresos del Mes"
            value="$72,000"
            change="+15% vs mes anterior"
            changeType="positive"
            icon={DollarSign}
            iconColor="bg-green-500"
          />
          <StatsCard
            title="Suscripciones Activas"
            value="856"
            change="+5% vs mes anterior"
            changeType="positive"
            icon={Package}
            iconColor="bg-purple-500"
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Revenue Chart */}
          <div className="bg-white rounded-xl border border-border p-6">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-foreground">Ingresos y Citas</h3>
              <p className="text-sm text-muted-foreground mt-0.5">
                Últimos 7 meses
              </p>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#635bff" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#635bff" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e3e8ef" />
                <XAxis dataKey="month" stroke="#6b7280" style={{ fontSize: '12px' }} />
                <YAxis stroke="#6b7280" style={{ fontSize: '12px' }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#ffffff', 
                    border: '1px solid #e3e8ef',
                    borderRadius: '8px',
                    fontSize: '12px'
                  }} 
                />
                <Area 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#635bff" 
                  strokeWidth={2}
                  fillOpacity={1} 
                  fill="url(#colorRevenue)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Services Chart */}
          <div className="bg-white rounded-xl border border-border p-6">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-foreground">Servicios Más Solicitados</h3>
              <p className="text-sm text-muted-foreground mt-0.5">
                Este mes
              </p>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={servicesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e3e8ef" />
                <XAxis dataKey="name" stroke="#6b7280" style={{ fontSize: '11px' }} />
                <YAxis stroke="#6b7280" style={{ fontSize: '12px' }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#ffffff', 
                    border: '1px solid #e3e8ef',
                    borderRadius: '8px',
                    fontSize: '12px'
                  }} 
                />
                <Bar dataKey="value" fill="#635bff" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
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
