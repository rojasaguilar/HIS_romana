import React, { useState } from "react";
import { Layout } from "./components/layout/Layout";
import { ManagerDashboard } from "./components/views/ManagerDashboard";
import { ReceptionistDashboard } from "./components/views/ReceptionistDashboard";
import { ClientsView } from "./components/views/ClientsView";
import { DoctorsView } from "./components/views/DoctorsView";
import { ServicesView } from "./components/views/ServicesView";
import { AppointmentsView } from "./components/views/AppointmentsView";
import { PackagesView } from "./components/views/PackagesView";
import { SubscriptionsView } from "./components/views/SubscriptionsView";
import { ClientDetailView } from "./components/views/ClientDetailView";
import { DoctorDetailView } from "./components/views/DoctorDetailView";

type Role = "gerente" | "recepcionista" | "medico" | "nutriologo";
type View =
  | "dashboard"
  | "clientes"
  | "medicos"
  | "servicios"
  | "citas"
  | "paquetes"
  | "suscripciones"
  | "client-detail"
  | "doctor-detail";

function App() {
  // Estado para simular el rol del usuario (cambiar entre 'gerente' y 'recepcionista')
  const [currentRole, setCurrentRole] = useState<Role>("gerente");
  const [currentView, setCurrentView] = useState<View>("dashboard");
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null);
  const [selectedDoctorId, setSelectedDoctorId] = useState<string | null>(null);

  const handleViewClientDetail = (clientId: string) => {
    setSelectedClientId(clientId);
    setCurrentView("client-detail");
  };

  const handleViewDoctorDetail = (doctorId: string) => {
    setSelectedDoctorId(doctorId);
    setCurrentView("doctor-detail");
  };

  const handleBackToClients = () => {
    setCurrentView("clientes");
    setSelectedClientId(null);
  };

  const handleBackToDoctors = () => {
    setCurrentView("medicos");
    setSelectedDoctorId(null);
  };

  const renderView = () => {
    switch (currentView) {
      case "dashboard":
        return currentRole === "gerente" ? (
          <ManagerDashboard />
        ) : (
          <ReceptionistDashboard />
        );
      case "clientes":
        return <ClientsView onViewDetail={handleViewClientDetail} />;
      case "client-detail":
        return selectedClientId ? (
          <ClientDetailView
            clientId={selectedClientId}
            onBack={handleBackToClients}
            role={currentRole}
          />
        ) : (
          <ClientsView onViewDetail={handleViewClientDetail} />
        );
      case "medicos":
        return <DoctorsView onViewDetail={handleViewDoctorDetail} />;
      case "doctor-detail":
        return selectedDoctorId ? (
          <DoctorDetailView
            doctorId={selectedDoctorId}
            onBack={handleBackToDoctors}
          />
        ) : (
          <DoctorsView onViewDetail={handleViewDoctorDetail} />
        );
      case "servicios":
        return <ServicesView />;
      case "citas":
        return <AppointmentsView />;
      case "paquetes":
        return <PackagesView />;
      case "suscripciones":
        return <SubscriptionsView />;
      default:
        return currentRole === "gerente" ? (
          <ManagerDashboard />
        ) : (
          <ReceptionistDashboard />
        );
    }
  };

  return (
    <div className="relative">
      {/* Role Switcher - Solo para demo */}
      <div className="fixed bottom-6 right-6 z-50">
        <div className="bg-white rounded-xl border-2 border-border shadow-2xl p-4">
          <p className="text-xs text-muted-foreground mb-2 font-medium">
            Demo - Cambiar Rol:
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => {
                setCurrentRole("gerente");
                setCurrentView("dashboard");
              }}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                currentRole === "gerente"
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-secondary text-foreground hover:bg-accent"
              }`}
            >
              Gerente
            </button>
            <button
              onClick={() => {
                setCurrentRole("recepcionista");
                setCurrentView("dashboard");
              }}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                currentRole === "recepcionista"
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-secondary text-foreground hover:bg-accent"
              }`}
            >
              Recepcionista
            </button>
            <button
              onClick={() => {
                setCurrentRole("medico");
                setCurrentView("dashboard");
              }}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                currentRole === "medico"
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-secondary text-foreground hover:bg-accent"
              }`}
            >
              Médico
            </button>
            <button
              onClick={() => {
                setCurrentRole("nutriologo");
                setCurrentView("dashboard");
              }}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                currentRole === "nutriologo"
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-secondary text-foreground hover:bg-accent"
              }`}
            >
              Nutriologo
            </button>
          </div>
        </div>
      </div>

      {/* Main App */}
      <Layout
        role={currentRole}
        currentView={currentView}
        onNavigate={(view) => setCurrentView(view as View)}
      >
        {renderView()}
      </Layout>
    </div>
  );
}

export default App;
