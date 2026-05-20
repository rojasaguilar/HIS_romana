import { useState } from "react";

import { useEncounterByAppointment } from "../hooks/useEncounter";

import {
  Activity,
  CalendarClock,
  FileText,
  Pill,
  PlusCircle,
  FlaskConical,
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
    useEncounterLabTests(encounter?.id);

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

        encounterId: encounter?.id ?? "",

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
  // LOADING
  // =========================

  if (isLoading) {
    return (
      <div className="p-6 text-center text-gray-500">
        Cargando nota clínica...
      </div>
    );
  }

  if (isLoadingLabTests) {
    return <div className="text-sm text-gray-500">Cargando estudios...</div>;
  }

  // =========================
  // NO ENCOUNTER
  // =========================

  if (!encounter) {
    return (
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">
          Nota Clínica
        </h3>

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
          {/* EVALUACIÓN */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-1.5">
              <h4 className="flex items-center gap-1.5 text-sm font-semibold text-gray-700">
                <Activity className="w-4 h-4 text-gray-400" />
                Síntomas / Motivo
              </h4>

              <p className="text-sm text-gray-600 bg-gray-50 p-3.5 rounded-xl border border-gray-100 leading-relaxed h-full">
                {encounter.symptoms || "No especificado"}
              </p>
            </div>

            <div className="flex flex-col gap-1.5">
              <h4 className="flex items-center gap-1.5 text-sm font-semibold text-gray-700">
                <FileText className="w-4 h-4 text-gray-400" />
                Diagnóstico Preliminar
              </h4>

              <p className="text-sm text-gray-600 bg-gray-50 p-3.5 rounded-xl border border-gray-100 leading-relaxed h-full">
                {encounter.preliminaryDiagnosis || "No especificado"}
              </p>
            </div>

            <div className="flex flex-col gap-1.5">
              <h4 className="flex items-center gap-1.5 text-sm font-semibold text-gray-700">
                <FileText className="w-4 h-4 text-gray-400" />
                Diagnóstico Diferencial
              </h4>

              <p className="text-sm text-gray-600 bg-gray-50 p-3.5 rounded-xl border border-gray-100 leading-relaxed h-full">
                {encounter.differentialDiagnosis || "No especificado"}
              </p>
            </div>

            <div className="flex flex-col gap-1.5">
              <h4 className="flex items-center gap-1.5 text-sm font-semibold text-gray-700">
                <FileText className="w-4 h-4 text-gray-400" />
                Notas Adicionales
              </h4>

              <p className="text-sm text-gray-600 bg-gray-50 p-3.5 rounded-xl border border-gray-100 leading-relaxed h-full">
                {encounter.notes || "Sin notas adicionales"}
              </p>
            </div>
          </div>

          {/* PRESCRIPTIONS */}
          <div className="pt-6 border-t border-gray-100">
            <div className="flex items-center justify-between gap-4 mb-4">
              <h4 className="flex items-center gap-2 text-md font-bold text-gray-800">
                <Pill className="w-5 h-5 text-blue-600" />
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
                    <div className="absolute top-0 left-0 w-1 h-full bg-blue-500"></div>

                    <div className="flex justify-between items-start gap-2">
                      <span className="font-bold text-gray-900 leading-tight">
                        {p.medicationName}
                      </span>

                      <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2 py-1 rounded-md border border-blue-100">
                        {p.dosage?.amount} {p.dosage?.unit}
                      </span>
                    </div>

                    <div className="text-sm text-gray-600">
                      {p.frequency}
                    </div>

                    <div className="flex items-center justify-center gap-1.5 text-xs font-medium text-gray-500 mt-1 bg-gray-50 p-1.5 rounded-md">
                      <CalendarClock className="w-3.5 h-3.5 text-gray-400" />

                      <span>
                        {new Date(p.startDate).toLocaleDateString()}
                      </span>

                      <span>-</span>

                      <span>
                        {new Date(p.endDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* LAB TESTS */}
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