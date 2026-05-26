import { useState } from "react";
import { useEncounterByAppointment } from "../hooks/useEncounter";
import {
  Activity,
  CalendarClock,
  FileText,
  Pill,
  PlusCircle,
  FlaskConical,
  HeartPulse,
  ClipboardList,
  Eye,
  Stethoscope,
} from "lucide-react";

import { EncounterForm } from "./EncounterForm";
import { CATEGORIAS_ESTUDIOS_LAB } from "@/modules/lab-test/dtos/lab-test.dto";
import type { CategoriaEstudiosLab } from "@/modules/lab-test/dtos/lab-test.dto";
import { useCreateLabTest } from "@/modules/lab-test/hooks/useCreateLabTest";
import { useEncounterLabTests } from "@/modules/lab-test/hooks/useEncounterLabTests";

export const EncounterSection = ({
  appointment,
  isMedic,
}: {
  appointment: any;
  isMedic: boolean;
}) => {
  const { data: encounter, isLoading } = useEncounterByAppointment(
    appointment.id,
  );

  const { data: labTests = [], isLoading: isLoadingLabTests } =
    useEncounterLabTests(encounter?._id);

  // console.log(encounter._id);

  // =========================
  // STATES
  // =========================
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isAddingLabTest, setIsAddingLabTest] = useState(false);

  const [labForm, setLabForm] = useState<{
    testName: string;
    category: CategoriaEstudiosLab;
    instructions: string;
  }>({
    testName: "",
    category: CATEGORIAS_ESTUDIOS_LAB.SANGRE,
    instructions: "",
  });

  const createLabTestMutation = useCreateLabTest();

  // =========================
  // HANDLERS
  // =========================
  const handleCreateLabTest = async () => {
    if (!labForm.testName.trim()) return;

    try {
      await createLabTestMutation.mutateAsync({
        patientId: appointment.patientId,
        orderedBy: appointment.medicId,
        encounterId: encounter?._id ?? "",
        category: labForm.category,
        testName: labForm.testName,
        instructions: labForm.instructions,
      });

      setLabForm({
        testName: "",
        category: CATEGORIAS_ESTUDIOS_LAB.SANGRE,
        instructions: "",
      });

      setIsAddingLabTest(false);
    } catch (error) {
      console.error(error);
    }
  };

  // =========================
  // 1. LOADING PRINCIPAL
  // =========================
  if (isLoading) {
    return (
      <div className="p-6 text-center text-gray-500">
        Cargando nota clínica...
      </div>
    );
  }

  // =========================
  // 2. NO ENCOUNTER (Debe ir ANTES de evaluar los laboratorios)
  // =========================
  if (!encounter) {
    return (
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Nota Clínica</h3>

        {!isCreating ? (
          <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50">
            <p className="text-sm text-gray-500 mb-4 text-center">
              Aún no has llenado la nota para esta cita.
            </p>

            {isMedic && (
              <button
                onClick={() => setIsCreating(true)}
                className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <PlusCircle className="w-4 h-4" />
                Comenzar a llenar nota
              </button>
            )}
          </div>
        ) : (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
            <EncounterForm
              appointment={appointment}
              mode="create"
              onCancel={() => setIsCreating(false)}
            />
          </div>
        )}
      </div>
    );
  }

  // =========================
  // 3. LOADING DE ESTUDIOS
  // =========================
  // Si ya sabemos que hay un encounter, ahora sí esperamos los estudios.
  if (isLoadingLabTests) {
    return (
      <div className="p-6 text-center text-sm text-gray-500">
        Cargando estudios de laboratorio...
      </div>
    );
  }

  // =========================
  // ENCOUNTER EXISTS
  // =========================
  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 mt-6">
      {/* HEADER */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6 border-b border-gray-100 pb-4">
        <div className="flex items-center gap-2">
          <FileText className="w-6 h-6 text-blue-600" />
          <h3 className="text-xl font-bold text-gray-900">
            Nota Clínica de la Sesión
          </h3>
        </div>

        {isMedic && !isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition-colors"
          >
            <FileText className="w-4 h-4" />
            Editar Nota
          </button>
        )}
      </div>

      {/* EDIT FORM */}
      {isEditing && (
        <div className="mb-6 border border-blue-100 bg-blue-50 rounded-2xl p-5">
          <EncounterForm
            appointment={appointment}
            encounter={encounter}
            mode="edit"
            onCancel={() => setIsEditing(false)}
          />
        </div>
      )}

      {/* VIEW MODE */}
      {!isEditing && (
        <div className="flex flex-col gap-8">
          {/* ======================================= */}
          {/* EVALUACIÓN PRINCIPAL */}
          {/* ======================================= */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-1.5 md:col-span-2">
              <h4 className="flex items-center gap-1.5 text-sm font-semibold text-gray-700">
                <Activity className="w-4 h-4 text-gray-400" />
                Síntomas / Motivo de Consulta
              </h4>
              <p className="text-sm text-gray-600 bg-gray-50 p-3.5 rounded-xl border border-gray-100 leading-relaxed h-full">
                {encounter.symptoms || "No especificado"}
              </p>
            </div>

            {encounter.notes && (
              <div className="flex flex-col gap-1.5 md:col-span-2">
                <h4 className="flex items-center gap-1.5 text-sm font-semibold text-gray-700">
                  <FileText className="w-4 h-4 text-gray-400" />
                  Notas Adicionales
                </h4>
                <p className="text-sm text-gray-600 bg-gray-50 p-3.5 rounded-xl border border-gray-100 leading-relaxed h-full">
                  {encounter.notes}
                </p>
              </div>
            )}
          </div>

          {/* ======================================= */}
          {/* SIGNOS VITALES Y SOMATOMETRÍA */}
          {/* ======================================= */}
          {encounter.signosVitales && (
            <div className="pt-6 border-t border-gray-100">
              <h4 className="flex items-center gap-2 text-md font-bold text-gray-800 mb-4">
                <HeartPulse className="w-5 h-5 text-red-500" />
                Signos Vitales y Somatometría
              </h4>

              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
                <div className="bg-white border border-gray-100 p-3 rounded-xl shadow-sm flex flex-col">
                  <span className="text-xs text-gray-500 font-semibold mb-1">
                    Tensión Arterial
                  </span>
                  <span className="font-bold text-gray-900 text-lg">
                    {encounter.signosVitales.tensionArterial?.sistolica}/
                    {encounter.signosVitales.tensionArterial?.diastolica}{" "}
                    <span className="text-xs font-normal text-gray-500">
                      mmHg
                    </span>
                  </span>
                </div>

                <div className="bg-white border border-gray-100 p-3 rounded-xl shadow-sm flex flex-col">
                  <span className="text-xs text-gray-500 font-semibold mb-1">
                    Frec. Cardíaca
                  </span>
                  <span className="font-bold text-gray-900 text-lg">
                    {encounter.signosVitales.frecuenciaCardiaca?.valor}{" "}
                    <span className="text-xs font-normal text-gray-500">
                      lpm
                    </span>
                  </span>
                </div>

                <div className="bg-white border border-gray-100 p-3 rounded-xl shadow-sm flex flex-col">
                  <span className="text-xs text-gray-500 font-semibold mb-1">
                    Frec. Respiratoria
                  </span>
                  <span className="font-bold text-gray-900 text-lg">
                    {encounter.signosVitales.frecuenciaRespiratoria?.valor}{" "}
                    <span className="text-xs font-normal text-gray-500">
                      rpm
                    </span>
                  </span>
                </div>

                <div className="bg-white border border-gray-100 p-3 rounded-xl shadow-sm flex flex-col">
                  <span className="text-xs text-gray-500 font-semibold mb-1">
                    Temperatura
                  </span>
                  <span className="font-bold text-gray-900 text-lg">
                    {encounter.signosVitales.temperatura?.valor}{" "}
                    <span className="text-xs font-normal text-gray-500">
                      °C
                    </span>
                  </span>
                </div>

                <div className="bg-white border border-gray-100 p-3 rounded-xl shadow-sm flex flex-col">
                  <span className="text-xs text-gray-500 font-semibold mb-1">
                    Peso y Talla
                  </span>
                  <span className="font-bold text-gray-900 text-md">
                    {encounter.signosVitales.peso?.valor}{" "}
                    {encounter.signosVitales.peso?.unidad} /{" "}
                    {encounter.signosVitales.talla?.valor}{" "}
                    {encounter.signosVitales.talla?.unidad}
                  </span>
                </div>

                <div className="bg-white border border-gray-100 p-3 rounded-xl shadow-sm flex flex-col md:col-span-2">
                  <span className="text-xs text-gray-500 font-semibold mb-1">
                    Índice de Masa Corporal (IMC)
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-gray-900 text-lg">
                      {encounter.signosVitales.imc?.valor}
                    </span>
                    <span className="px-2 py-0.5 bg-blue-50 text-blue-700 text-xs font-bold rounded-md border border-blue-100">
                      {encounter.signosVitales.imc?.clasificacion ||
                        "Sin clasificar"}
                    </span>
                  </div>
                </div>

                <div className="bg-white border border-gray-100 p-3 rounded-xl shadow-sm flex flex-col md:col-span-2 lg:col-span-3">
                  <span className="text-xs text-gray-500 font-semibold mb-1">
                    Índice Cintura-Cadera (ICC)
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-gray-900 text-lg">
                      {encounter.signosVitales.icc?.valor}
                    </span>
                    <span className="px-2 py-0.5 bg-orange-50 text-orange-700 text-xs font-bold rounded-md border border-orange-100">
                      {encounter.signosVitales.icc?.clasificacion ||
                        "Sin clasificar"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ======================================= */}
          {/* INTERROGATORIO POR APARATOS Y SISTEMAS */}
          {/* ======================================= */}
          {encounter.interrogatorioAparatosSistemas &&
            encounter.interrogatorioAparatosSistemas.length > 0 && (
              <div className="pt-6 border-t border-gray-100">
                <h4 className="flex items-center gap-2 text-md font-bold text-gray-800 mb-4">
                  <ClipboardList className="w-5 h-5 text-amber-600" />
                  Interrogatorio por Aparatos y Sistemas
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {encounter.interrogatorioAparatosSistemas.map(
                    (sistema: any, idx: number) => (
                      <div
                        key={idx}
                        className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm relative overflow-hidden"
                      >
                        <div
                          className={`absolute top-0 left-0 w-1 h-full ${sistema.normal ? "bg-green-400" : "bg-amber-500"}`}
                        ></div>
                        <div className="flex justify-between items-start mb-2">
                          <span className="font-bold text-gray-900">
                            {sistema.system}
                          </span>
                          <span
                            className={`text-xs font-bold px-2 py-1 rounded-md border ${sistema.normal ? "bg-green-50 text-green-700 border-green-100" : "bg-amber-50 text-amber-700 border-amber-100"}`}
                          >
                            {sistema.normal ? "Normal" : "Anormal"}
                          </span>
                        </div>
                        {!sistema.normal && (
                          <p className="text-sm text-gray-700 mb-1">
                            <span className="font-semibold text-gray-900">
                              Síntomas:
                            </span>{" "}
                            {sistema.sintomas || "No descritos"}
                          </p>
                        )}
                        {sistema.notas && (
                          <p className="text-sm text-gray-500 mt-2 bg-gray-50 p-2 rounded-lg">
                            {sistema.notas}
                          </p>
                        )}
                      </div>
                    ),
                  )}
                </div>
              </div>
            )}

          {/* ======================================= */}
          {/* EXPLORACIÓN FÍSICA */}
          {/* ======================================= */}
          {encounter.exploracionFisica &&
            encounter.exploracionFisica.length > 0 && (
              <div className="pt-6 border-t border-gray-100">
                <h4 className="flex items-center gap-2 text-md font-bold text-gray-800 mb-4">
                  <Eye className="w-5 h-5 text-teal-600" />
                  Exploración Física
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {encounter.exploracionFisica.map((exp: any, idx: number) => (
                    <div
                      key={idx}
                      className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm relative overflow-hidden"
                    >
                      <div
                        className={`absolute top-0 left-0 w-1 h-full ${exp.normal ? "bg-teal-400" : "bg-rose-500"}`}
                      ></div>
                      <div className="flex justify-between items-start mb-2">
                        <span className="font-bold text-gray-900">
                          {exp.sistema}
                        </span>
                        <span
                          className={`text-xs font-bold px-2 py-1 rounded-md border ${exp.normal ? "bg-teal-50 text-teal-700 border-teal-100" : "bg-rose-50 text-rose-700 border-rose-100"}`}
                        >
                          {exp.normal ? "Sin alteraciones" : "Con hallazgos"}
                        </span>
                      </div>
                      {!exp.normal && exp.hallazgos && (
                        <p className="text-sm text-gray-700 mb-1">
                          <span className="font-semibold text-gray-900">
                            Hallazgos:
                          </span>{" "}
                          {exp.hallazgos}
                        </p>
                      )}
                      {exp.descripcion && (
                        <p className="text-sm text-gray-600 mb-2">
                          {exp.descripcion}
                        </p>
                      )}
                      {exp.observaciones && (
                        <p className="text-xs text-gray-500 mt-2 bg-gray-50 p-2 rounded-lg italic">
                          Obs: {exp.observaciones}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

          {/* ======================================= */}
          {/* INTEGRACIÓN DIAGNÓSTICA */}
          {/* ======================================= */}
          {encounter.integracionDiagnostica &&
            encounter.integracionDiagnostica.length > 0 && (
              <div className="pt-6 border-t border-gray-100">
                <h4 className="flex items-center gap-2 text-md font-bold text-gray-800 mb-4">
                  <Stethoscope className="w-5 h-5 text-emerald-600" />
                  Integración Diagnóstica
                </h4>
                <div className="flex flex-col gap-3">
                  {encounter.integracionDiagnostica.map(
                    (diag: any, idx: number) => (
                      <div
                        key={idx}
                        className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4"
                      >
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-bold text-gray-900 text-base">
                              {diag.diagnostico}
                            </span>
                            {diag.cie10 && (
                              <span className="text-xs font-mono font-bold bg-gray-100 text-gray-600 px-2 py-0.5 rounded border border-gray-200">
                                CIE-10: {diag.cie10}
                              </span>
                            )}
                          </div>
                          {diag.observaciones && (
                            <p className="text-sm text-gray-500 mt-1">
                              {diag.observaciones}
                            </p>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <span
                            className={`text-xs font-bold px-3 py-1 rounded-full border ${diag.tipo === "DEFINITIVO" ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-blue-50 text-blue-700 border-blue-200"}`}
                          >
                            {diag.tipo}
                          </span>
                          <span className="text-xs font-bold px-3 py-1 rounded-full border bg-slate-50 text-slate-700 border-slate-200">
                            {diag.estado}
                          </span>
                        </div>
                      </div>
                    ),
                  )}
                </div>
              </div>
            )}

          {/* ======================================= */}
          {/* TRATAMIENTO RECETADO (PRESCRIPTIONS) */}
          {/* ======================================= */}
          <div className="pt-6 border-t border-gray-100">
            <div className="flex items-center justify-between gap-4 mb-4">
              <h4 className="flex items-center gap-2 text-md font-bold text-gray-800">
                <Pill className="w-5 h-5 text-indigo-600" />
                Tratamiento Recetado
              </h4>
            </div>

            {!encounter.prescriptions ||
            encounter.prescriptions.length === 0 ? (
              <p className="text-sm text-gray-500 italic bg-gray-50 p-4 rounded-xl text-center border border-dashed border-gray-200">
                No se recetaron medicamentos.
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {encounter.prescriptions.map((p: any, idx: number) => (
                  <div
                    key={idx}
                    className="p-4 bg-white border border-gray-200 rounded-xl shadow-sm flex flex-col gap-2.5 relative overflow-hidden"
                  >
                    <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500"></div>

                    <div className="flex justify-between items-start gap-2">
                      <div className="flex flex-col">
                        <span className="font-bold text-gray-900 leading-tight">
                          {p.nombre}
                        </span>
                        <span className="text-xs text-gray-500 capitalize">
                          {p.tipo} • {p.routeAdministration}
                        </span>
                      </div>
                      <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2 py-1 rounded-md border border-indigo-100 whitespace-nowrap">
                        {p.dosis}
                      </span>
                    </div>

                    <div className="text-sm text-gray-700 font-medium bg-gray-50 p-2 rounded-lg border border-gray-100 mt-1">
                      {p.frecuencia}
                    </div>

                    {p.indicacion && (
                      <div className="text-xs text-gray-600 italic">
                        Nota: {p.indicacion}
                      </div>
                    )}

                    <div className="flex items-center justify-center gap-1.5 text-xs font-medium text-gray-500 mt-2 bg-gray-50 p-1.5 rounded-md border border-gray-100">
                      <CalendarClock className="w-3.5 h-3.5 text-gray-400" />
                      <span>
                        {p.fechaInicio
                          ? new Date(p.fechaInicio).toLocaleDateString()
                          : "--"}
                      </span>
                      <span>hasta</span>
                      <span>
                        {p.fechaFin
                          ? new Date(p.fechaFin).toLocaleDateString()
                          : "--"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ======================================= */}
          {/* LAB TESTS */}
          {/* ======================================= */}
          <div className="pt-6 border-t border-gray-100">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4">
              <div className="flex items-center gap-3">
                <h4 className="flex items-center gap-2 text-md font-bold text-gray-800">
                  <FlaskConical className="w-5 h-5 text-purple-600" />
                  Estudios de Laboratorio
                </h4>
              </div>

              {isMedic && (
                <div className="flex items-center gap-2">
                  {!isAddingLabTest ? (
                    <button
                      onClick={() => setIsAddingLabTest(true)}
                      className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-xl hover:bg-purple-700 transition-colors"
                    >
                      <PlusCircle className="w-4 h-4" />
                      Agregar estudio
                    </button>
                  ) : (
                    <button
                      onClick={() => setIsAddingLabTest(false)}
                      className="px-4 py-2 text-sm font-medium border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
                    >
                      Cancelar
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* FORM LAB */}
            {isAddingLabTest && (
              <div className="mb-6 border border-purple-100 bg-purple-50 rounded-2xl p-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    value={labForm.testName}
                    onChange={(e) =>
                      setLabForm((prev) => ({
                        ...prev,
                        testName: e.target.value,
                      }))
                    }
                    placeholder="Nombre del estudio"
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm bg-white"
                  />

                  <select
                    value={labForm.category}
                    onChange={(e) =>
                      setLabForm((prev) => ({
                        ...prev,
                        category: e.target.value as CategoriaEstudiosLab,
                      }))
                    }
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm bg-white"
                  >
                    {Object.values(CATEGORIAS_ESTUDIOS_LAB).map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                <textarea
                  rows={4}
                  value={labForm.instructions}
                  onChange={(e) =>
                    setLabForm((prev) => ({
                      ...prev,
                      instructions: e.target.value,
                    }))
                  }
                  placeholder="Indicaciones"
                  className="mt-4 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm bg-white resize-none"
                />

                <div className="flex justify-end gap-3 mt-5">
                  <button
                    onClick={() => setIsAddingLabTest(false)}
                    className="px-4 py-2 text-sm font-medium border border-gray-200 rounded-xl hover:bg-gray-50"
                  >
                    Cancelar
                  </button>

                  <button
                    onClick={handleCreateLabTest}
                    disabled={createLabTestMutation.isPending}
                    className="flex items-center gap-2 px-5 py-2 text-sm font-semibold text-white bg-purple-600 rounded-xl hover:bg-purple-700"
                  >
                    <PlusCircle className="w-4 h-4" />
                    {createLabTestMutation.isPending
                      ? "Guardando..."
                      : "Guardar estudio"}
                  </button>
                </div>
              </div>
            )}

            {!labTests || labTests.length === 0 ? (
              <p className="text-sm text-gray-500 italic bg-gray-50 p-4 rounded-xl text-center border border-dashed border-gray-200">
                No se solicitaron estudios.
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {labTests.map((lab: any, idx: number) => (
                  <div
                    key={idx}
                    className="p-4 bg-white border border-gray-200 rounded-2xl shadow-sm flex flex-col gap-3 relative overflow-hidden"
                  >
                    <div className="absolute top-0 left-0 w-1 h-full bg-purple-500"></div>

                    <div className="flex flex-col">
                      <span className="font-bold text-gray-900">
                        {lab.testName}
                      </span>
                      <span className="text-xs text-gray-500 mt-1">
                        {lab.category}
                      </span>
                    </div>

                    <div className="bg-purple-50 border border-purple-100 rounded-xl p-3">
                      <p className="text-sm text-gray-700">
                        {lab.instructions || "Sin instrucciones"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
