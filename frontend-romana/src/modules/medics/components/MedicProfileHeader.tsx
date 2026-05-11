import type { Medic } from "../types/medic.types";
import { Mail, Phone, Award, TrendingUp } from "lucide-react";
// import { differenceInYears } from "date-fns";

interface Props {
  medic: Medic;
}

export const MedicProfileHeader = ({ medic }: Props) => {
  // Protegemos el cálculo por si la fecha viene undefined o vacía en algún momento
  //   const yearsOfExperience = medic.startPracticeDate
  //     ? differenceInYears(new Date(), new Date(medic.startPracticeDate))
  //     : 0;

  return (
    <div className="relative flex items-center gap-6 p-6 bg-white border border-gray-200 rounded-xl shadow-sm">
      {/* Badge de Estado - Esquina superior derecha */}
      <div className="absolute top-6 right-6">
        <span
          className={`px-3 py-1 text-xs font-medium rounded-full ${medic.isActive ? "text-green-700 bg-green-100" : "text-red-700 bg-red-100"}`}
        >
          {medic.isActive ? "activo" : "inactivo"}
        </span>
      </div>

      {/* Avatar a la izquierda */}
      <div className="flex-shrink-0">
        {medic.profilePictureUrl ? (
          <img
            src={medic.profilePictureUrl}
            alt={medic.name}
            className="w-20 h-20 rounded-full object-cover"
          />
        ) : (
          <div className="w-20 h-20 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center">
            {/* Icono de medalla idéntico al de tu mockup */}
            <Award className="w-8 h-8" strokeWidth={2} />
          </div>
        )}
      </div>

      {/* Información del Médico */}
      <div className="flex flex-col flex-grow gap-1">
        <h1 className="text-2xl font-bold text-gray-900">{medic.name}</h1>
        {/* <p className="text-sm font-medium text-indigo-500">Medicina General</p> */}

        {/* Cuadrícula de detalles de contacto */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 mt-2 text-sm text-gray-500">
          <span className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-gray-400" />
            {medic.email}
          </span>
          <span className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-gray-400" />
            {medic.phoneNumber}
          </span>
          <span className="flex items-center gap-2">
            <Award className="w-4 h-4 text-gray-400" />
            Licencia: {medic.healthLicenseNumber}
          </span>
          <span className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-gray-400" />
            {12} años de experiencia
            {/* {yearsOfExperience} años de experiencia */}
          </span>
        </div>
      </div>
    </div>
  );
};
