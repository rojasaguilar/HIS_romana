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
  ConciergeBell,
} from "lucide-react";
import { useAuthStore } from "@/modules/auth/store/auth.store";

export const DashboardLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const logout = useAuthStore((state) => state.logout);
  const user = useAuthStore((state) => state.user);

  // Obtenemos el array de roles (fallback a array vacío por seguridad)
  const userRoles = user?.roles || [];

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  const getLinkClass = ({ isActive }: { isActive: boolean }) => {
    const baseClass =
      "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group";
    return isActive
      ? `${baseClass} bg-indigo-50 text-indigo-700 shadow-sm`
      : `${baseClass} text-gray-500 hover:bg-gray-50 hover:text-gray-900`;
  };

  // Definimos qué roles pueden ver cada ruta
  const menuItems = [
    {
      path: "/dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
      allowedRoles: ["ADMIN", "MEDIC", "RECEPTIONIST"],
    },
    {
      path: "/patients",
      label: "Pacientes",
      icon: Users,
      allowedRoles: ["ADMIN", "MEDIC", "RECEPTIONIST"],
    },
    {
      path: "/medics",
      label: "Médicos",
      icon: Stethoscope,
      allowedRoles: ["ADMIN"],
    },
    {
      path: "/receptionists",
      label: "Recepcionistas",
      icon: ConciergeBell,
      allowedRoles: ["ADMIN"],
    },
    {
      path: "/specialities",
      label: "Especialidades",
      icon: Activity,
      allowedRoles: ["ADMIN"],
    },
    {
      path: "/services",
      label: "Servicios",
      icon: Activity,
      allowedRoles: ["ADMIN"],
    },
    {
      path: "/appointments",
      label: "Citas",
      icon: CalendarDays,
      allowedRoles: ["ADMIN", "MEDIC", "RECEPTIONIST"],
    },
    {
      path: "/subscriptions",
      label: "Suscripciones",
      icon: CreditCard,
      allowedRoles: ["ADMIN", "RECEPTIONIST"],
    },
    {
      path: "/plans",
      label: "Planes",
      icon: Package,
      allowedRoles: ["ADMIN", "MEDIC", "RECEPTIONIST"],
    },
  ];

  // FILTRADO POR ARRAY DE ROLES:
  // Mostramos el item si el usuario tiene AL MENOS UNO de los roles permitidos
  const allowedMenuItems = menuItems.filter((item) =>
    item.allowedRoles.some((allowedRole) => userRoles.includes(allowedRole)),
  );

  // Formateamos el email para que se vea como nombre
  const displayUserName =
    user?.email?.split("@")[0].replace(".", " ") || "Usuario";

  // Para la etiqueta de "Puesto" en el header, mostramos el rol principal basado en el profileType,
  // o si quieres mostrar todos los roles unidos: userRoles.join(" / ")
  const roleDisplayNames = {
    ADMIN: "Administrador",
    MEDIC: "Médico",
    RECEPTIONIST: "Recepción",
  };

  // Usaremos profileType solo para pintar la etiquetita bonita bajo el nombre
  const displayProfileType = user?.profileType
    ? roleDisplayNames[user.profileType as keyof typeof roleDisplayNames]
    : "Personal";

  const userInitials = user?.email?.substring(0, 2).toUpperCase() || "US";

  return (
    <div className="flex min-h-screen bg-gray-50/50">
      {/* SIDEBAR */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col fixed h-screen z-20">
        <div className="p-6 flex items-center gap-3 border-b border-gray-100">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center shadow-indigo-200 shadow-lg">
            <img
              src="/romana_logo.jpg"
              alt="Logo Romana"
              className="object-fill rounded-lg"
            />
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

        <nav className="flex-grow p-4 flex flex-col gap-1 mt-2">
          {allowedMenuItems.map((item) => (
            <NavLink key={item.path} to={item.path} className={getLinkClass}>
              <item.icon className="w-5 h-5 transition-transform group-hover:scale-110" />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-100 flex flex-col gap-1">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-all"
          >
            <LogOut className="w-5 h-5" />
            Cerrar Sesión
          </button>
        </div>
      </aside>

      {/* CONTENIDO PRINCIPAL */}
      <main className="flex-1 ml-64 min-h-screen flex flex-col">
        {/* Header Superior */}
        <header className="h-16 bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-10 px-8 flex items-center justify-start">
          <div className="flex justify-start gap-4 ">
            <div className="w-10 h-10 bg-indigo-100 border border-indigo-200 rounded-full flex items-center justify-center text-indigo-700 font-bold uppercase">
              {userInitials}
            </div>
            <div className="text-left">
              <p className="text-sm font-bold text-gray-900 capitalize">
                {displayUserName}
              </p>
              <p className="text-[10px] text-indigo-600 font-bold uppercase tracking-wider">
                {user?.roles.join(", ")}
              </p>
            </div>
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
