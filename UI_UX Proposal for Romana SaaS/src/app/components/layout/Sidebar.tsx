import React from "react";
import {
  LayoutDashboard,
  Users,
  Stethoscope,
  Calendar,
  Package,
  CreditCard,
  Settings,
  LogOut,
  Handshake,
  Truck,
} from "lucide-react";

interface SidebarProps {
  role: "gerente" | "recepcionista" | "medico" | "nutriologo";
  currentView: string;
  onNavigate: (view: string) => void;
}

interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
  roles: string[];
}

const navItems: NavItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
    roles: ["gerente", "recepcionista", "nutriologo", "medico"],
  },
  {
    id: "clientes",
    label: "Pacientes",
    icon: Users,
    roles: ["gerente", "recepcionista", "medico", "nutriologo"],
  },
  { id: "medicos", label: "Médicos", icon: Stethoscope, roles: ["gerente"] },
  {
    id: "citas",
    label: "Citas",
    icon: Calendar,
    roles: ["gerente", "recepcionista", "medico", "nutriologo"],
  },
  {
    id: "servicios",
    label: "Servicios",
    icon: Settings,
    roles: ["gerente", "recepcionista", "medico", "nutriologo"],
  },
  {
    id: "paquetes",
    label: "Paquetes",
    icon: Package,
    roles: ["gerente", "recepcionista", "medico", "nutriologo"],
  },
  {
    id: "suscripciones",
    label: "Suscripciones",
    icon: CreditCard,
    roles: ["gerente", "recepcionista"],
  },
  {
    id: "proveedores",
    label: "Proveedores",
    icon: Truck,
    roles: ["gerente", "recepcionista"],
  },
  {
    id: "socios",
    label: "Socios",
    icon: Handshake,
    roles: ["gerente", "recepcionista"],
  },
];

export function Sidebar({ role, currentView, onNavigate }: SidebarProps) {
  const filteredItems = navItems.filter((item) => item.roles.includes(role));

  return (
    <div className="w-64 h-screen bg-white border-r border-border flex flex-col fixed left-0 top-0">
      {/* Logo */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-semibold text-lg">
              R
            </span>
          </div>
          <div>
            <h1 className="text-lg font-semibold text-foreground">Romana</h1>
            <p className="text-xs text-muted-foreground capitalize">{role}</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 overflow-y-auto">
        <div className="space-y-1">
          {filteredItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;

            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`
                  w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all
                  ${
                    isActive
                      ? "bg-secondary text-foreground"
                      : "text-muted-foreground hover:bg-accent hover:text-foreground"
                  }
                `}
              >
                <Icon className="w-5 h-5" />
                <span className="text-sm font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-border">
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-muted-foreground hover:bg-accent hover:text-foreground transition-all">
          <LogOut className="w-5 h-5" />
          <span className="text-sm font-medium">Cerrar sesión</span>
        </button>
      </div>
    </div>
  );
}
