// src/modules/patients/pages/PatientDetailsPage.tsx

import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { usePatient } from "../hooks/usePatient";
import { useSubscriptions } from "@/modules/subscriptions/hooks/useSubscriptions";
import { usePlans } from "@/modules/plans/hooks/usePlans";
import { useAppointments } from "@/modules/appointments/hooks/useAppointments";
import {
  useMedicalRecordByPatient,
  // Ya no importamos useCreate aquí directo si lo usa el form por dentro,
  // pero importamos el de update si hiciera falta a nivel página (aunque es mejor en el Form).
} from "@/modules/medicalRecords/hooks/useMedicalRecord";

import {
  MoveLeft,
  Activity,
  AlertTriangle,
  Pill,
  Scissors,
  HeartPulse,
  Scale,
  Ruler,
  FileText,
  User,
  CalendarDays,
  Plus,
  Edit, // <-- Nuevo icono importado
} from "lucide-react";
import { PatientEncountersList } from "../components/PatientEncountersList";
import { CreateMedicalRecordForm } from "@/modules/medicalRecords/components/CreateMedicalRecordForm";
// Asumimos que crearás este componente siguiendo el patrón del Create
import { UpdateMedicalRecordForm } from "@/modules/medicalRecords/components/UpdateMedicalRecordForm";
import { UpdatePatientForm } from "../components/UpdatePatientForm";
import { useConditions } from "@/modules/conditions/hooks/useConditions";
import { useAuthStore } from "@/modules/auth/store/auth.store";

export const PatientDetailsPage = () => {
  const { id } = useParams();

  const user = useAuthStore((state) => state.user);

  const isMedic = user?.roles.includes("MEDIC") ?? false;

  // Estado para controlar qué pestaña está visible
  const [activeTab, setActiveTab] = useState<
    "general" | "medical_record" | "appointments"
  >("general");

  const [showCreateMedicalRecordForm, setShowCreateMedicalRecordForm] =
    useState(false);

  // <-- NUEVO ESTADO: Controla si estamos editando el expediente existente
  const [isEditingMR, setIsEditingMR] = useState(false);
  const [isEditingPatient, setIsEditingPatient] = useState(false);

  const { data: patient, isLoading } = usePatient(id!);
  const { data: subscriptions } = useSubscriptions();
  const { data: plans } = usePlans();
  const { data: appointments } = useAppointments();
  const { data: conditions } = useConditions();

  // Obtenemos la historia médica del paciente
  const { data: medicalRecord, isLoading: isLoadingMR } =
    useMedicalRecordByPatient(patient?.id);

  if (isLoading || !patient) {
    return (
      <p className="p-8 text-center text-gray-500">Cargando paciente...</p>
    );
  }

  const patientSubscription = subscriptions?.find(
    (subscription) =>
      subscription._patientId === patient.id &&
      subscription._status === "active",
  );

  const getConditionName = (id: string) =>
    conditions?.find((c) => c.id === id)?.name;

  const plan = plans?.find((plan) => plan.id === patientSubscription?._planId);

  const patientAppointments =
    appointments?.filter(
      (appointment) => appointment.patientId === patient.id,
    ) || [];

  const completedAppointments = patientAppointments.filter(
    (appointment) => appointment.status === "COMPLETADA",
  );

  const attendance =
    patientAppointments.length > 0
      ? Math.round(
          (completedAppointments.length / patientAppointments.length) * 100,
        )
      : 0;

  const formatDate = (date: string | Date) => {
    return new Date(date).toLocaleDateString("es-MX", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      {/* BACK */}
      <Link
        to="/patients"
        className="inline-flex items-center gap-2 text-slate-500 hover:text-indigo-600 transition-colors mb-6 decoration-transparent"
      >
        <MoveLeft className="w-4 h-4" /> Volver a Pacientes
      </Link>

      {/* PROFILE CARD */}
      <div className="bg-white rounded-2xl p-8 flex justify-between items-center border border-slate-200 mb-6 shadow-sm">
        <div className="flex gap-6 items-center">
          <div className="w-20 h-20 rounded-full bg-violet-100 flex items-center justify-center text-3xl text-violet-600 font-bold">
            {patient.name.charAt(0)}
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-2 text-slate-900">
              {patient.name}
            </h2>
            <div className="flex flex-col gap-1 text-slate-500 font-medium">
              <span>{patient.email}</span>
              <span>{patient.phoneNumber}</span>
              <span>
                {patient.address.street}, {patient.address.city}
              </span>
            </div>
          </div>
        </div>

        <div>
          <span
            className={`px-4 py-2 rounded-full font-semibold text-sm ${
              patient.isActive
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {patient.isActive ? "Activo" : "Inactivo"}
          </span>
        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
          <p className="text-slate-500 mb-2 font-medium">Suscripción</p>
          <h3 className="text-xl font-bold text-slate-900">
            {plan?.name || "Sin plan"}
          </h3>
          {patientSubscription && (
            <p className="text-slate-500 mt-2 text-sm">
              Vence: {formatDate(patientSubscription._endDate)}
            </p>
          )}
        </div>
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
          <p className="text-slate-500 mb-2 font-medium">Total Citas</p>
          <h3 className="text-xl font-bold text-slate-900">
            {patientAppointments.length}
          </h3>
        </div>
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
          <p className="text-slate-500 mb-2 font-medium">Citas Completadas</p>
          <h3 className="text-xl font-bold text-slate-900">
            {completedAppointments.length}
          </h3>
          <p className="text-slate-500 mt-2 text-sm">
            Asistencia: {attendance}%
          </p>
        </div>
      </div>

      {/* CONTENEDOR DE PESTAÑAS */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {/* HEADER DE PESTAÑAS */}
        <div className="flex border-b border-slate-200 bg-slate-50/50">
          <button
            onClick={() => setActiveTab("general")}
            className={`px-8 py-4 text-sm font-bold transition-all border-b-2 flex items-center gap-2 ${
              activeTab === "general"
                ? "border-indigo-600 text-indigo-700 bg-white"
                : "border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-100"
            }`}
          >
            <User className="w-4 h-4" /> Información General
          </button>
          {isMedic ? (
            <button
              onClick={() => setActiveTab("medical_record")}
              className={`px-8 py-4 text-sm font-bold transition-all border-b-2 flex items-center gap-2 ${
                activeTab === "medical_record"
                  ? "border-indigo-600 text-indigo-700 bg-white"
                  : "border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-100"
              }`}
            >
              <Activity className="w-4 h-4" /> Historia Médica
            </button>
          ) : (
            <></>
          )}
          <button
            onClick={() => setActiveTab("appointments")}
            className={`px-8 py-4 text-sm font-bold transition-all border-b-2 flex items-center gap-2 ${
              activeTab === "appointments"
                ? "border-indigo-600 text-indigo-700 bg-white"
                : "border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-100"
            }`}
          >
            <CalendarDays className="w-4 h-4" />
            Citas
          </button>
        </div>

        {/* CONTENIDO DINÁMICO */}
        <div className="p-8">
          {activeTab === "general" && (
            <div className="animate-in fade-in duration-300">
              {isEditingPatient ? (
                <div className="animate-in fade-in zoom-in-95 duration-300">
                  <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
                    <div>
                      <h3 className="text-xl font-bold text-slate-900">
                        Editar Paciente
                      </h3>

                      <p className="text-slate-500 text-sm mt-1">
                        Actualiza la información general del paciente.
                      </p>
                    </div>

                    <button
                      onClick={() => setIsEditingPatient(false)}
                      className="px-4 py-2 border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors font-medium"
                    >
                      Cancelar
                    </button>
                  </div>

                  <UpdatePatientForm
                    patient={patient}
                    onSuccess={() => setIsEditingPatient(false)}
                    onCancel={() => setIsEditingPatient(false)}
                  />
                </div>
              ) : (
                <>
                  {/* BOTÓN EDITAR */}
                  <div className="flex justify-end mb-6">
                    <button
                      onClick={() => setIsEditingPatient(true)}
                      className="flex items-center gap-2 px-4 py-2 bg-white border border-indigo-200 text-indigo-700 text-sm font-semibold rounded-lg hover:bg-indigo-50 transition-colors shadow-sm"
                    >
                      <Edit className="w-4 h-4" />
                      Editar Datos
                    </button>
                  </div>

                  <div className="mb-8">
                    <h3 className="text-lg font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100">
                      Datos Personales
                    </h3>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-slate-500 text-sm">
                          Fecha de Nacimiento
                        </p>

                        <strong className="text-slate-900">
                          {formatDate(patient.birthDate)}
                        </strong>
                      </div>

                      <div>
                        <p className="text-slate-500 text-sm">Tipo de Sangre</p>

                        <strong className="text-slate-900">
                          {patient.bloodType}
                        </strong>
                      </div>

                      <div>
                        <p className="text-slate-500 text-sm">Sexo</p>

                        <strong className="text-slate-900">
                          {patient.sex === "M" ? "Masculino" : "Femenino"}
                        </strong>
                      </div>

                      <div>
                        <p className="text-slate-500 text-sm">Estado Civil</p>

                        <strong className="text-slate-900">
                          {patient.maritalStatus}
                        </strong>
                      </div>

                      <div>
                        <p className="text-slate-500 text-sm">Alergias</p>

                        <strong className="text-slate-900">
                          {patient.allergies?.join(", ") || "Sin alergias"}
                        </strong>
                      </div>

                      <div>
                        <p className="text-slate-500 text-sm">
                          Contacto de Emergencia
                        </p>

                        <strong className="text-slate-900">
                          {patient.emergencyContact?.name || "N/A"}{" "}
                          {patient.emergencyContact?.phoneNumber
                            ? `- ${patient.emergencyContact.phoneNumber}`
                            : ""}
                          {` - ${patient.emergencyContact?.relationship}`}
                        </strong>
                      </div>
                    </div>
                  </div>

                  {patientSubscription && (
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100">
                        Información de Suscripción
                      </h3>

                      <div>
                        <h4 className="font-bold text-slate-900">
                          {plan?.name}
                        </h4>

                        <p className="text-green-600 font-medium my-2">
                          Estado: activa
                        </p>

                        <p className="text-slate-500 text-sm">
                          Periodo: {formatDate(patientSubscription._startDate)}{" "}
                          - {formatDate(patientSubscription._endDate)}
                        </p>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          )}

          {/* VISTA: HISTORIA MÉDICA */}
          {activeTab === "medical_record" && (
            <div className="animate-in fade-in duration-300">
              {isLoadingMR ? (
                <p className="text-slate-500 text-center py-8">
                  Cargando expediente médico...
                </p>
              ) : !medicalRecord ? (
                <div className="bg-slate-50 border border-dashed border-slate-300 rounded-2xl p-8">
                  {!showCreateMedicalRecordForm ? (
                    <div className="text-center">
                      <Activity className="w-12 h-12 text-slate-300 mx-auto mb-4" />

                      <h3 className="text-xl font-bold text-slate-900">
                        Sin Historia Médica
                      </h3>

                      <p className="text-slate-500 mt-2 max-w-md mx-auto leading-relaxed">
                        Este paciente aún no tiene un expediente clínico
                        registrado.
                      </p>

                      <button
                        onClick={() => setShowCreateMedicalRecordForm(true)}
                        className="mt-6 inline-flex items-center gap-2 px-5 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                        Crear Expediente Médico
                      </button>
                    </div>
                  ) : (
                    <div className="animate-in fade-in zoom-in-95 duration-300">
                      <div className="flex items-center justify-between mb-6">
                        <div>
                          <h3 className="text-xl font-bold text-slate-900">
                            Crear Historia Médica
                          </h3>

                          <p className="text-slate-500 text-sm mt-1">
                            Completa la información clínica inicial del
                            paciente.
                          </p>
                        </div>

                        <button
                          onClick={() => setShowCreateMedicalRecordForm(false)}
                          className="px-4 py-2 border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors"
                        >
                          Cancelar
                        </button>
                      </div>

                      <CreateMedicalRecordForm
                        patientId={patient.id}
                        onSuccess={() => {
                          setShowCreateMedicalRecordForm(false);
                        }}
                        onCancel={() => {
                          setShowCreateMedicalRecordForm(false);
                        }}
                      />
                    </div>
                  )}
                </div>
              ) : isEditingMR ? (
                // <-- NUEVA VISTA: MODO EDICIÓN DEL EXPEDIENTE
                <div className="animate-in fade-in zoom-in-95 duration-300">
                  <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
                    <div>
                      <h3 className="text-xl font-bold text-slate-900">
                        Editar Historia Médica
                      </h3>
                      <p className="text-slate-500 text-sm mt-1">
                        Actualiza la información clínica y biometría del
                        paciente.
                      </p>
                    </div>

                    <button
                      onClick={() => setIsEditingMR(false)}
                      className="px-4 py-2 border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors font-medium"
                    >
                      Cancelar Edición
                    </button>
                  </div>

                  {/* Aquí invocas a tu componente de edición y le pasas la data actual */}
                  <UpdateMedicalRecordForm
                    medicalRecord={medicalRecord}
                    onSuccess={() => setIsEditingMR(false)}
                    onCancel={() => setIsEditingMR(false)}
                  />
                </div>
              ) : (
                <div className="flex flex-col gap-6 animate-in fade-in duration-300">
                  {/* <-- NUEVO: BOTÓN PARA ACTIVAR EDICIÓN --> */}
                  <div className="flex justify-end">
                    <button
                      onClick={() => setIsEditingMR(true)}
                      className="flex items-center gap-2 px-4 py-2 bg-white border border-indigo-200 text-indigo-700 text-sm font-semibold rounded-lg hover:bg-indigo-50 transition-colors shadow-sm"
                    >
                      <Edit className="w-4 h-4" />
                      Actualizar Expediente
                    </button>
                  </div>

                  {/* Fila 1: Biometría y Alertas */}
                  <div className="grid grid-cols-3 gap-6">
                    <div className="col-span-2 bg-red-50/50 border border-red-100 rounded-xl p-5">
                      <div className="flex items-center gap-2 mb-3 text-red-600">
                        <AlertTriangle className="w-5 h-5" />
                        <h4 className="font-bold">
                          Alertas y Factores de Riesgo
                        </h4>
                      </div>

                      <div className="flex gap-4">
                        <div className="flex-1">
                          <p className="text-xs text-slate-500 font-bold uppercase mb-2">
                            Alergias Clínicas
                          </p>

                          <div className="flex flex-wrap gap-2">
                            {medicalRecord.allergies?.length > 0 ? (
                              medicalRecord.allergies.map((a, i) => (
                                <span
                                  key={i}
                                  className="px-2 py-1 bg-red-100 text-red-700 text-xs font-bold rounded"
                                >
                                  {a}
                                </span>
                              ))
                            ) : (
                              <span className="text-sm text-slate-500">
                                Ninguna
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="flex-1">
                          <p className="text-xs text-slate-500 font-bold uppercase mb-2">
                            Factores de Riesgo
                          </p>

                          <div className="flex flex-wrap gap-2">
                            {medicalRecord.riskFactors?.length > 0 ? (
                              medicalRecord.riskFactors.map((r, i) => (
                                <span
                                  key={i}
                                  className="px-2 py-1 bg-orange-100 text-orange-700 text-xs font-bold rounded"
                                >
                                  {r}
                                </span>
                              ))
                            ) : (
                              <span className="text-sm text-slate-500">
                                Ninguno reportado
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-sky-50/50 border border-sky-100 rounded-xl p-5 flex flex-col justify-center gap-4">
                      <div className="flex justify-between items-center pb-2 border-b border-sky-100">
                        <div className="flex items-center gap-2 text-sky-700">
                          <Ruler className="w-4 h-4" />

                          <span className="font-semibold text-sm">
                            Estatura
                          </span>
                        </div>

                        <span className="font-bold text-lg text-sky-900">
                          {medicalRecord.height}

                          <span className="text-sm font-normal text-sky-600">
                            {" "}
                            cm
                          </span>
                        </span>
                      </div>

                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2 text-sky-700">
                          <Scale className="w-4 h-4" />

                          <span className="font-semibold text-sm">Peso</span>
                        </div>

                        <span className="font-bold text-lg text-sky-900">
                          {medicalRecord.weight}

                          <span className="text-sm font-normal text-sky-600">
                            {" "}
                            kg
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Fila 2: Condiciones y Medicamentos */}
                  <div className="grid grid-cols-2 gap-6">
                    <div className="border border-slate-200 rounded-xl p-5">
                      <div className="flex items-center gap-2 mb-4 text-indigo-600">
                        <HeartPulse className="w-5 h-5" />

                        <h4 className="font-bold text-slate-900">
                          Condiciones Actuales
                        </h4>
                      </div>

                      <div className="flex flex-col gap-3">
                        {medicalRecord.currentConditions?.length > 0 ? (
                          medicalRecord.currentConditions.map((cond, i) => (
                            <div key={i} className="p-3 bg-slate-50 rounded-lg">
                              <p className="font-bold text-slate-900 text-sm">
                                CIE: {getConditionName(cond.conditionId)}
                              </p>

                              <p className="text-xs text-slate-500 mt-1">
                                Diagnosticado por {cond.diagnosedBy || "N/A"} el{" "}
                                {formatDate(cond.since)}
                              </p>
                            </div>
                          ))
                        ) : (
                          <p className="text-sm text-slate-500">
                            Sin condiciones actuales registradas.
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="border border-slate-200 rounded-xl p-5">
                      <div className="flex items-center gap-2 mb-4 text-indigo-600">
                        <Pill className="w-5 h-5" />

                        <h4 className="font-bold text-slate-900">
                          Medicación Crónica
                        </h4>
                      </div>

                      <div className="flex flex-col gap-3">
                        {medicalRecord.chronicMedications?.length > 0 ? (
                          medicalRecord.chronicMedications.map((med, i) => (
                            <div
                              key={i}
                              className="p-3 bg-slate-50 rounded-lg flex justify-between items-center"
                            >
                              <div>
                                <p className="font-bold text-slate-900 text-sm">
                                  {med.medicationName}
                                </p>

                                <p className="text-xs text-slate-500 mt-1">
                                  {med.dosage.amount}
                                  {med.dosage.unit} •{" "}
                                  {med.frequency.timesPerDay} al día
                                </p>
                              </div>
                            </div>
                          ))
                        ) : (
                          <p className="text-sm text-slate-500">
                            Sin medicación crónica.
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Fila 3: Quirúrgico y Resumen */}
                  <div className="grid grid-cols-2 gap-6">
                    <div className="border border-slate-200 rounded-xl p-5">
                      <div className="flex items-center gap-2 mb-4 text-indigo-600">
                        <Scissors className="w-5 h-5" />

                        <h4 className="font-bold text-slate-900">
                          Antecedentes Quirúrgicos
                        </h4>
                      </div>

                      <ul className="list-disc list-inside text-sm text-slate-700 flex flex-col gap-2">
                        {medicalRecord.surgicalHistory?.length > 0 ? (
                          medicalRecord.surgicalHistory.map((surg, i) => (
                            <li key={i}>
                              <span className="font-semibold">
                                {surg.surgeryName}
                              </span>{" "}
                              ({formatDate(surg.surgeryDate)})
                            </li>
                          ))
                        ) : (
                          <p className="text-sm text-slate-500">
                            Sin antecedentes quirúrgicos.
                          </p>
                        )}
                      </ul>
                    </div>

                    <div className="border border-slate-200 rounded-xl p-5 bg-slate-50/50">
                      <div className="flex items-center gap-2 mb-3 text-indigo-600">
                        <FileText className="w-5 h-5" />

                        <h4 className="font-bold text-slate-900">
                          Resumen Clínico
                        </h4>
                      </div>

                      <p className="text-sm text-slate-600 leading-relaxed">
                        {medicalRecord.summary ||
                          "No hay resumen clínico disponible."}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* VISTA: CITAS */}
          {activeTab === "appointments" && (
            <div className="animate-in fade-in duration-300">
              <PatientEncountersList patientId={patient.id} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
