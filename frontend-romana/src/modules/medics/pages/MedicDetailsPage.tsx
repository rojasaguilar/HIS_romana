import { useParams, Link } from "react-router-dom";
import { useMedicDetails } from "../hooks/useMedic";
import { MedicProfileHeader } from "../components/MedicProfileHeader";
// import { MedicTabs } from "../components/MedicTabs"; // Asumiendo que ya tienes este componente
import { MoveLeft, Pencil, Search, Bell } from "lucide-react"; // Iconos de layout
import { MedicAppointments } from "../components/MedicAppointments";

export const MedicDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: medic, isLoading, isError } = useMedicDetails(id!);

  if (isLoading)
    return <div className="p-8">Cargando perfil del médico...</div>;
  if (isError || !medic)
    return <div className="p-8">Error al cargar la información.</div>;

  return (
    <div className="flex flex-col gap-6 p-6 bg-gray-50 min-h-screen">
      {/* 2. Enlace "Volver a Médicos" */}
      <div>
        <Link
          to="/medics"
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-blue-600 transition"
        >
          <MoveLeft className="w-4 h-4" />
          Volver a Médicos
        </Link>
      </div>

      {/* 3. La Tarjeta de Perfil Blanca (Corregida) */}
      <MedicProfileHeader medic={medic} />

      {/* 4. Sistema de Tabs (Información General, Historial, Pacientes) */}
      {/* <MedicTabs medic={medic} /> */}
      <MedicAppointments medicId={medic.id} />
    </div>
  );
};
