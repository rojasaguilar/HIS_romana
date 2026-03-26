import React, { useState } from 'react';
import { Header } from '../layout/Header';
import { ArrowLeft, Mail, Phone, Award, Edit2, Calendar, Clock, User, CheckCircle2, XCircle, AlertCircle, TrendingUp } from 'lucide-react';

interface DoctorDetailViewProps {
  doctorId: string;
  onBack: () => void;
}

// Mock data - en producción vendría de una API
const mockDoctorData = {
  id: '1',
  name: 'Dr. Carlos Ruiz',
  specialty: 'Medicina General',
  email: 'carlos.r@romana.com',
  phone: '555-0201',
  licenseNumber: 'MED-12345',
  yearsExperience: 15,
  education: 'Universidad Nacional - Medicina General',
  languages: ['Español', 'Inglés'],
  schedule: 'Lunes a Viernes: 9:00 AM - 5:00 PM',
  status: 'activo' as const,
  totalPatients: 45,
  totalAppointments: 127,
  rating: 4.8,
  appointments: [
    { id: '1', date: '10 Feb 2026', time: '09:00 AM', client: 'María González', service: 'Consulta General', status: 'confirmada' as const },
    { id: '2', date: '10 Feb 2026', time: '11:00 AM', client: 'Sofia Martínez', service: 'Revisión', status: 'confirmada' as const },
    { id: '3', date: '09 Feb 2026', time: '02:00 PM', client: 'Pedro Sánchez', service: 'Consulta General', status: 'completada' as const },
    { id: '4', date: '08 Feb 2026', time: '10:30 AM', client: 'Laura Jiménez', service: 'Control', status: 'completada' as const },
    { id: '5', date: '08 Feb 2026', time: '03:30 PM', client: 'Juan Pérez', service: 'Consulta General', status: 'completada' as const },
    { id: '6', date: '07 Feb 2026', time: '11:00 AM', client: 'Ana Torres', service: 'Revisión', status: 'cancelada' as const },
  ],
  patients: [
    { id: '1', name: 'María González', lastVisit: '10 Feb 2026', totalVisits: 8, status: 'activo' },
    { id: '2', name: 'Sofia Martínez', lastVisit: '10 Feb 2026', totalVisits: 5, status: 'activo' },
    { id: '3', name: 'Pedro Sánchez', lastVisit: '09 Feb 2026', totalVisits: 12, status: 'activo' },
    { id: '4', name: 'Laura Jiménez', lastVisit: '08 Feb 2026', totalVisits: 3, status: 'activo' },
    { id: '5', name: 'Juan Pérez', lastVisit: '08 Feb 2026', totalVisits: 6, status: 'activo' },
  ]
};

const statusConfig = {
  confirmada: { color: 'bg-blue-100 text-blue-700 border-blue-200', label: 'Confirmada', icon: AlertCircle },
  completada: { color: 'bg-green-100 text-green-700 border-green-200', label: 'Completada', icon: CheckCircle2 },
  cancelada: { color: 'bg-red-100 text-red-700 border-red-200', label: 'Cancelada', icon: XCircle },
  pendiente: { color: 'bg-yellow-100 text-yellow-700 border-yellow-200', label: 'Pendiente', icon: Clock }
};

export function DoctorDetailView({ doctorId, onBack }: DoctorDetailViewProps) {
  const [activeTab, setActiveTab] = useState<'info' | 'appointments' | 'patients'>('info');
  const doctor = mockDoctorData; // En producción: fetch por doctorId

  return (
    <div className="min-h-screen bg-background">
      <Header 
        title={doctor.name}
        subtitle={doctor.specialty}
        actions={
          <button className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-secondary transition-colors">
            <Edit2 className="w-4 h-4" />
            <span>Editar</span>
          </button>
        }
      />

      <div className="p-8">
        {/* Back Button */}
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-medium">Volver a Médicos</span>
        </button>

        {/* Doctor Header Card */}
        <div className="bg-white rounded-xl border border-border p-6 mb-6">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4">
              <div className="w-20 h-20 rounded-full bg-blue-500/10 flex items-center justify-center">
                <Award className="w-10 h-10 text-blue-500" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-foreground mb-1">{doctor.name}</h2>
                <p className="text-primary font-medium mb-3">{doctor.specialty}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Mail className="w-4 h-4" />
                    <span>{doctor.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Phone className="w-4 h-4" />
                    <span>{doctor.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Award className="w-4 h-4" />
                    <span>Licencia: {doctor.licenseNumber}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <TrendingUp className="w-4 h-4" />
                    <span>{doctor.yearsExperience} años de experiencia</span>
                  </div>
                </div>
              </div>
            </div>
            <span className={`inline-flex px-3 py-1.5 rounded-full text-xs font-medium ${
              doctor.status === 'activo'
                ? 'bg-green-100 text-green-700'
                : 'bg-gray-100 text-gray-700'
            }`}>
              {doctor.status}
            </span>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-xl border border-border p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                <User className="w-5 h-5 text-blue-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Pacientes</p>
                <p className="text-2xl font-semibold text-foreground">{doctor.totalPatients}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-border p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                <Calendar className="w-5 h-5 text-green-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Citas</p>
                <p className="text-2xl font-semibold text-foreground">{doctor.totalAppointments}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-border p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-yellow-500/10 flex items-center justify-center">
                <Award className="w-5 h-5 text-yellow-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Calificación</p>
                <p className="text-2xl font-semibold text-foreground">{doctor.rating}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-border p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                <Clock className="w-5 h-5 text-purple-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Experiencia</p>
                <p className="text-2xl font-semibold text-foreground">{doctor.yearsExperience} años</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl border border-border overflow-hidden">
          <div className="border-b border-border">
            <div className="flex">
              <button
                onClick={() => setActiveTab('info')}
                className={`px-6 py-4 text-sm font-medium transition-colors relative ${
                  activeTab === 'info'
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Información General
                {activeTab === 'info' && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
                )}
              </button>
              <button
                onClick={() => setActiveTab('appointments')}
                className={`px-6 py-4 text-sm font-medium transition-colors relative ${
                  activeTab === 'appointments'
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Historial de Citas
                {activeTab === 'appointments' && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
                )}
              </button>
              <button
                onClick={() => setActiveTab('patients')}
                className={`px-6 py-4 text-sm font-medium transition-colors relative ${
                  activeTab === 'patients'
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Pacientes
                {activeTab === 'patients' && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
                )}
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'info' && (
              <div className="space-y-6">
                {/* Professional Information */}
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-4">Información Profesional</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-sm text-muted-foreground">Especialidad</label>
                      <p className="text-foreground font-medium mt-1">{doctor.specialty}</p>
                    </div>
                    <div>
                      <label className="text-sm text-muted-foreground">Número de Licencia</label>
                      <p className="text-foreground font-medium mt-1">{doctor.licenseNumber}</p>
                    </div>
                    <div>
                      <label className="text-sm text-muted-foreground">Años de Experiencia</label>
                      <p className="text-foreground font-medium mt-1">{doctor.yearsExperience} años</p>
                    </div>
                    <div>
                      <label className="text-sm text-muted-foreground">Educación</label>
                      <p className="text-foreground font-medium mt-1">{doctor.education}</p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-border pt-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Horario de Atención</h3>
                  <div className="bg-secondary/50 rounded-lg p-4">
                    <div className="flex items-center gap-2 text-foreground">
                      <Clock className="w-5 h-5 text-primary" />
                      <span className="font-medium">{doctor.schedule}</span>
                    </div>
                  </div>
                </div>

                <div className="border-t border-border pt-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Idiomas</h3>
                  <div className="flex gap-2">
                    {doctor.languages.map((lang) => (
                      <span key={lang} className="px-3 py-1.5 bg-primary/10 text-primary rounded-lg text-sm font-medium">
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="border-t border-border pt-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Biografía</h3>
                  <div className="bg-secondary/50 rounded-lg p-4">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Médico general con más de 15 años de experiencia en atención primaria. 
                      Especializado en medicina preventiva y atención familiar. Graduado con honores 
                      de la Universidad Nacional. Miembro activo de la Asociación Médica Nacional.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'appointments' && (
              <div className="space-y-4">
                {doctor.appointments.map((appointment) => {
                  const StatusIcon = statusConfig[appointment.status].icon;
                  
                  return (
                    <div 
                      key={appointment.id}
                      className="border border-border rounded-lg p-4 hover:border-primary transition-colors"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-medium text-foreground">{appointment.service}</h4>
                            <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border ${statusConfig[appointment.status].color}`}>
                              <StatusIcon className="w-3 h-3" />
                              {statusConfig[appointment.status].label}
                            </span>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <User className="w-4 h-4" />
                              <span>{appointment.client}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              <span>{appointment.date}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              <span>{appointment.time}</span>
                            </div>
                          </div>
                        </div>
                        <button className="text-sm text-primary hover:text-primary/80 font-medium">
                          Ver detalles
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {activeTab === 'patients' && (
              <div className="space-y-3">
                {doctor.patients.map((patient) => (
                  <div 
                    key={patient.id}
                    className="border border-border rounded-lg p-4 hover:border-primary transition-colors cursor-pointer"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-sm font-medium text-primary">
                            {patient.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <h4 className="font-medium text-foreground">{patient.name}</h4>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            Última visita: {patient.lastVisit}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-foreground">{patient.totalVisits} visitas</p>
                        <span className="inline-flex px-2 py-0.5 bg-green-100 text-green-700 rounded text-xs font-medium mt-1">
                          {patient.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
