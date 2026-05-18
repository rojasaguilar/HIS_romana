// src/modules/receptionists/pages/ReceptionistDetailsPage.tsx

import { Link, useParams } from "react-router-dom";
import {
  MoveLeft,
  Mail,
  Phone,
  Languages,
  User,
  ShieldCheck,
  ShieldX,
} from "lucide-react";
import { useReceptionistDetails } from "../hooks/useReceptionists";

export const ReceptionistDetailsPage = () => {
  const { id } = useParams();

  const { data: receptionist, isLoading } = useReceptionistDetails(id!);

  if (isLoading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <p className="text-slate-500 font-medium">Cargando recepcionista...</p>
      </div>
    );
  }

  if (!receptionist) {
    return (
      <div className="min-h-[400px] flex flex-col items-center justify-center gap-3">
        <h2 className="text-xl font-bold text-slate-900">
          Recepcionista no encontrada
        </h2>

        <Link
          to="/receptionists"
          className="text-indigo-600 hover:text-indigo-700 font-medium"
        >
          Volver al listado
        </Link>
      </div>
    );
  }

  return (
    <div className="p-8 bg-slate-50 min-h-screen flex flex-col gap-6">
      {/* BACK */}
      <Link
        to="/receptionists"
        className="inline-flex items-center gap-2 text-slate-500 hover:text-indigo-600 transition-colors decoration-transparent"
      >
        <MoveLeft className="w-4 h-4" />
        Volver a Recepcionistas
      </Link>

      {/* HEADER */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 flex justify-between items-start">
        <div className="flex gap-6 items-center">
          {/* AVATAR */}
          {receptionist.profilePictureUrl ? (
            <img
              src={receptionist.profilePictureUrl}
              alt={receptionist.name}
              className="w-24 h-24 rounded-full object-cover border border-slate-200"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-4xl font-bold">
              {receptionist.name.charAt(0)}
            </div>
          )}

          {/* INFO */}
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">
              {receptionist.name}
            </h1>

            <div className="flex flex-col gap-2 text-slate-600">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-slate-400" />
                <span>{receptionist.email}</span>
              </div>

              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-slate-400" />
                <span>{receptionist.phoneNumber}</span>
              </div>
            </div>
          </div>
        </div>

        {/* STATUS */}
        <div>
          <span
            className={`px-4 py-2 rounded-full text-sm font-semibold inline-flex items-center gap-2 ${
              receptionist.isActive
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {receptionist.isActive ? (
              <>
                <ShieldCheck className="w-4 h-4" />
                Activa
              </>
            ) : (
              <>
                <ShieldX className="w-4 h-4" />
                Inactiva
              </>
            )}
          </span>
        </div>
      </div>

      {/* CONTENT */}
      <div className="grid grid-cols-3 gap-6">
        {/* INFO GENERAL */}
        <div className="col-span-2 bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
          <div className="flex items-center gap-2 mb-6">
            <User className="w-5 h-5 text-indigo-600" />

            <h2 className="text-lg font-bold text-slate-900">
              Información General
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-slate-500 mb-1">Nombre completo</p>

              <p className="font-semibold text-slate-900">
                {receptionist.name}
              </p>
            </div>

            <div>
              <p className="text-sm text-slate-500 mb-1">Correo electrónico</p>

              <p className="font-semibold text-slate-900">
                {receptionist.email}
              </p>
            </div>

            <div>
              <p className="text-sm text-slate-500 mb-1">Número telefónico</p>

              <p className="font-semibold text-slate-900">
                {receptionist.phoneNumber}
              </p>
            </div>

            <div>
              <p className="text-sm text-slate-500 mb-1">Estado</p>

              <p
                className={`font-semibold ${
                  receptionist.isActive ? "text-green-600" : "text-red-600"
                }`}
              >
                {receptionist.isActive ? "Activo" : "Inactivo"}
              </p>
            </div>
          </div>
        </div>

        {/* LANGUAGES */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
          <div className="flex items-center gap-2 mb-6">
            <Languages className="w-5 h-5 text-indigo-600" />

            <h2 className="text-lg font-bold text-slate-900">Idiomas</h2>
          </div>

          {receptionist.languages.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {receptionist.languages.map((language, index) => (
                <span
                  key={index}
                  className="px-3 py-2 bg-indigo-50 text-indigo-700 rounded-xl text-sm font-medium"
                >
                  {language}
                </span>
              ))}
            </div>
          ) : (
            <div className="h-full flex items-center justify-center">
              <p className="text-sm text-slate-500">Sin idiomas registrados</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
