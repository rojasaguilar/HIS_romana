import React, { useState } from "react";
import { Header } from "../layout/Header";
import {
  ArrowLeft,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Edit2,
  CreditCard,
  Clock,
  User,
  CheckCircle2,
  XCircle,
  AlertCircle,
} from "lucide-react";

interface ClientDetailViewProps {
  clientId: string;
  onBack: () => void;
  role: "gerente" | "recepcionista" | "medico" | "nutriologo";
}

// Mock data - en producción vendría de una API
const mockClientData = {
  id: "1",
  name: "María González",
  email: "maria.g@email.com",
  phone: "555-0101",
  address: "Calle Principal 123, Ciudad",
  dateOfBirth: "15 Mar 1985",
  memberSince: "12 Ene 2024",
  subscription: "Paquete Premium",
  subscriptionStatus: "activa",
  subscriptionEnd: "15 May 2026",
  status: "activo" as const,
  bloodType: "O+",
  allergies: "Penicilina",
  emergencyContact: "Juan González - 555-0199",
  appointments: [
    {
      id: "1",
      date: "10 Feb 2026",
      time: "09:00 AM",
      doctor: "Dr. Carlos Ruiz",
      service: "Consulta General",
      status: "confirmada" as const,
    },
    {
      id: "2",
      date: "15 Ene 2026",
      time: "02:00 PM",
      doctor: "Dra. Ana López",
      service: "Dermatología",
      status: "completada" as const,
    },
    {
      id: "3",
      date: "20 Dic 2025",
      time: "10:30 AM",
      doctor: "Dr. Luis Torres",
      service: "Cardiología",
      status: "completada" as const,
    },
    {
      id: "4",
      date: "05 Dic 2025",
      time: "11:00 AM",
      doctor: "Dr. Carlos Ruiz",
      service: "Consulta General",
      status: "completada" as const,
    },
    {
      id: "5",
      date: "15 Nov 2025",
      time: "03:30 PM",
      doctor: "Dra. Patricia Vega",
      service: "Pediatría",
      status: "cancelada" as const,
    },
  ],
};

const statusConfig = {
  confirmada: {
    color: "bg-blue-100 text-blue-700 border-blue-200",
    label: "Confirmada",
    icon: AlertCircle,
  },
  completada: {
    color: "bg-green-100 text-green-700 border-green-200",
    label: "Completada",
    icon: CheckCircle2,
  },
  cancelada: {
    color: "bg-red-100 text-red-700 border-red-200",
    label: "Cancelada",
    icon: XCircle,
  },
  pendiente: {
    color: "bg-yellow-100 text-yellow-700 border-yellow-200",
    label: "Pendiente",
    icon: Clock,
  },
};

export function ClientDetailView({
  clientId,
  onBack,
  role,
}: ClientDetailViewProps) {
  const [activeTab, setActiveTab] = useState<
    "info" | "appointments" | "medical history" | "labs"
  >("info");
  const client = mockClientData; // En producción: fetch por clientId

  return (
    <div className="min-h-screen bg-background">
      <Header
        title={client.name}
        subtitle="Información del cliente"
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
          <span className="text-sm font-medium">Volver a Clientes</span>
        </button>

        {/* Client Header Card */}
        <div className="bg-white rounded-xl border border-border p-6 mb-6">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-2xl font-medium text-primary">
                  {client.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </span>
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-foreground mb-2">
                  {client.name}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Mail className="w-4 h-4" />
                    <span>{client.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Phone className="w-4 h-4" />
                    <span>{client.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span>{client.address}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    <span>Miembro desde {client.memberSince}</span>
                  </div>
                </div>
              </div>
            </div>
            <span
              className={`inline-flex px-3 py-1.5 rounded-full text-xs font-medium ${
                client.status === "activo"
                  ? "bg-green-100 text-green-700"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              {client.status}
            </span>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-xl border border-border p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Suscripción</p>
                <p className="font-semibold text-foreground">
                  {client.subscription}
                </p>
              </div>
            </div>
            <div className="text-xs text-muted-foreground mt-3">
              Vence: {client.subscriptionEnd}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-border p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                <Calendar className="w-5 h-5 text-blue-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Citas</p>
                <p className="font-semibold text-foreground">
                  {client.appointments.length}
                </p>
              </div>
            </div>
            <div className="text-xs text-muted-foreground mt-3">
              Última: {client.appointments[1].date}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-border p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">
                  Citas Completadas
                </p>
                <p className="font-semibold text-foreground">
                  {
                    client.appointments.filter((a) => a.status === "completada")
                      .length
                  }
                </p>
              </div>
            </div>
            <div className="text-xs text-muted-foreground mt-3">
              Asistencia: 80%
            </div>
          </div>
        </div>

        {/* {role} */}

        {/* Tabs */}
        <div className="bg-white rounded-xl border border-border overflow-hidden">
          <div className="border-b border-border">
            <div className="flex">
              <button
                onClick={() => setActiveTab("info")}
                className={`px-6 py-4 text-sm font-medium transition-colors relative ${
                  activeTab === "info"
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Información General
                {activeTab === "info" && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
                )}
              </button>
              <button
                onClick={() => setActiveTab("appointments")}
                className={`px-6 py-4 text-sm font-medium transition-colors relative ${
                  activeTab === "appointments"
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }
                ${role === "medico" ? "" : "hidden"}
                `}
              >
                Historial de Citas
                {activeTab === "appointments" && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
                )}
              </button>
              <button
                onClick={() => setActiveTab("medical history")}
                className={`px-6 py-4 text-sm font-medium transition-colors relative ${
                  activeTab === "medical history"
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }  ${role === "medico" ? "" : "hidden"}`}
              >
                Historia médica
                {activeTab === "medical history" && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
                )}
              </button>
              <button
                onClick={() => setActiveTab("labs")}
                className={`px-6 py-4 text-sm font-medium transition-colors relative ${
                  activeTab === "labs"
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                } ${role === "medico" ? "" : "hidden"}`}
              >
                Laboratorios
                {activeTab === "labs" && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
                )}
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === "info" && (
              <div className="space-y-6">
                {/* Personal Information */}
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-4">
                    Datos Personales
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-sm text-muted-foreground">
                        Fecha de Nacimiento
                      </label>
                      <p className="text-foreground font-medium mt-1">
                        {client.dateOfBirth}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm text-muted-foreground">
                        Tipo de Sangre
                      </label>
                      <p className="text-foreground font-medium mt-1">
                        {client.bloodType}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm text-muted-foreground">
                        Alergias
                      </label>
                      <p className="text-foreground font-medium mt-1">
                        {client.allergies}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm text-muted-foreground">
                        Contacto de Emergencia
                      </label>
                      <p className="text-foreground font-medium mt-1">
                        {client.emergencyContact}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-border pt-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">
                    Información de Suscripción
                  </h3>
                  <div className="bg-secondary/50 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <p className="font-semibold text-foreground mb-1">
                          {client.subscription}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Estado:{" "}
                          <span className="text-green-600 font-medium">
                            {client.subscriptionStatus}
                          </span>
                        </p>
                      </div>
                      <span className="text-xs bg-primary/10 text-primary px-2.5 py-1 rounded-full">
                        Renovación automática
                      </span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Período: {client.memberSince} - {client.subscriptionEnd}
                    </div>
                  </div>
                </div>

                <div className="border-t border-border pt-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">
                    Notas Adicionales
                  </h3>
                  <div className="bg-secondary/50 rounded-lg p-4">
                    <p className="text-sm text-muted-foreground">
                      Cliente preferencial. Siempre solicita citas matutinas.
                      Prefiere ser atendido por el Dr. Carlos Ruiz.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "appointments" && (
              <div className="space-y-4">
                {client.appointments.map((appointment) => {
                  const StatusIcon = statusConfig[appointment.status].icon;

                  return (
                    <div
                      key={appointment.id}
                      className="border border-border rounded-lg p-4 hover:border-primary transition-colors"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-medium text-foreground">
                              {appointment.service}
                            </h4>
                            <span
                              className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border ${statusConfig[appointment.status].color}`}
                            >
                              <StatusIcon className="w-3 h-3" />
                              {statusConfig[appointment.status].label}
                            </span>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <User className="w-4 h-4" />
                              <span>{appointment.doctor}</span>
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
          </div>
        </div>
      </div>
    </div>
  );
}
