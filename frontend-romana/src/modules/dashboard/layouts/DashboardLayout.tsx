import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Stethoscope,
  Activity,
  CalendarDays,
  CreditCard,
  Package,
  LogOut,
  Settings,
} from "lucide-react";
import { useAuthStore } from "@/modules/auth/store/auth.store";

export const DashboardLayout = () => {
  const location = useLocation();

  const navigate = useNavigate();

  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    logout();

    navigate("/login", {
      replace: true,
    });
  };

  // Función para definir clases de los links (activo vs inactivo)
  const getLinkClass = ({ isActive }: { isActive: boolean }) => {
    const baseClass =
      "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group";
    return isActive
      ? `${baseClass} bg-indigo-50 text-indigo-700 shadow-sm`
      : `${baseClass} text-gray-500 hover:bg-gray-50 hover:text-gray-900`;
  };

  const menuItems = [
    { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { path: "/patients", label: "Pacientes", icon: Users },
    { path: "/medics", label: "Médicos", icon: Stethoscope },
    { path: "/services", label: "Servicios", icon: Activity },
    { path: "/appointments", label: "Citas", icon: CalendarDays },
    { path: "/subscriptions", label: "Suscripciones", icon: CreditCard },
    { path: "/plans/admin", label: "Planes", icon: Package },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50/50">
      {/* SIDEBAR */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col fixed h-screen z-20">
        {/* Logo / Brand */}
        <div className="p-6 flex items-center gap-3 border-b border-gray-100">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shadow-indigo-200 shadow-lg">
            <span className="text-white font-bold text-xl">R</span>
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900 leading-none">
              Romana
            </h2>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">
              Gestión Clínica
            </p>
          </div>
        </div>

        {/* Navegación Principal */}
        <nav className="flex-grow p-4 flex flex-col gap-1 mt-2">
          {menuItems.map((item) => (
            <NavLink key={item.path} to={item.path} className={getLinkClass}>
              <item.icon className="w-5 h-5 transition-transform group-hover:scale-110" />
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Footer Sidebar (User / Settings) */}
        <div className="p-4 border-t border-gray-100 flex flex-col gap-1">
          <button className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition-all">
            <Settings className="w-5 h-5" />
            Configuración
          </button>
          <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-all">
            <LogOut className="w-5 h-5" />
            Cerrar Sesión
          </button>
        </div>
      </aside>

      {/* CONTENIDO PRINCIPAL */}
      <main className="flex-1 ml-64 min-h-screen flex flex-col">
        {/* Header Superior (Opcional, pero da mucha presencia) */}
        <header className="h-16 bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-10 px-8 flex items-center justify-end">
          <div className="flex items-center gap-4">
            <div className="text-right">
              {/* <p className="text-sm font-bold text-gray-900">Admin</p>
                <p className="text-[10px] text-gray-500 font-medium">Gerente de Clínica</p> */}
            </div>
            {/* <div className="w-10 h-10 bg-indigo-100 border border-indigo-200 rounded-full flex items-center justify-center text-indigo-700 font-bold">
               AD
             </div> */}
          </div>
        </header>

        {/* Vista Actual */}
        <div className="p-8 max-w-[1400px] mx-auto w-full">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
