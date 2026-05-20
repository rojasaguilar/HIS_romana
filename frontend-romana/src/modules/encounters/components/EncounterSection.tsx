import { useState } from "react";
import { useEncounterByAppointment } from "../hooks/useEncounter";

import {
  Activity,
  CalendarClock,
  FileText,
  Pill,
  PlusCircle,
  FlaskConical,
  Printer,
  ClipboardList,
} from "lucide-react";

import { EncounterForm } from "./EncounterForm";
import { CATEGORIAS_ESTUDIOS_LAB } from "@/modules/lab-test/dtos/lab-test.dto";
import type { CategoriaEstudiosLab } from "@/modules/lab-test/dtos/lab-test.dto";

import { useCreateLabTest } from "@/modules/lab-test/hooks/useCreateLabTest";
import { useEncounterLabTests } from "@/modules/lab-test/hooks/useEncounterLabTests";
import { usePatientLabTests } from "@/modules/lab-test/hooks/usePatientLabTests";

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

  const [isEditing, setIsEditing] = useState(false);
  // STATES NUEVOS (debajo de isEditing)

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

  // HANDLER NUEVO (debajo de estados)

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

  if (!encounter) {
    return (
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Nota Clínica</h3>

        {!isEditing ? (
          <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50">
            <p className="text-sm text-gray-500 mb-4 text-center">
              Aún no has llenado la nota para esta cita.
            </p>

            {isMedic && (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <PlusCircle className="w-4 h-4" />
                Comenzar a llenar nota
              </button>
            )}
          </div>
        ) : (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="p-4 bg-blue-50 border border-blue-100 rounded-lg text-blue-700 text-sm mb-4">
              <EncounterForm
                appointment={appointment}
                onCancel={() => setIsEditing(false)}
              />
            </div>

            <button
              onClick={() => setIsEditing(false)}
              className="text-sm font-medium text-red-600 hover:text-red-700"
            >
              Cancelar
            </button>
          </div>
        )}
      </div>
    );
  }

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

        {/* ACTIONS */}
        {/* <div className="flex flex-wrap gap-3">
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
            <Printer className="w-4 h-4" />
            Imprimir receta digital
          </button>

          <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition-colors">
            <ClipboardList className="w-4 h-4" />
            Imprimir orden de laboratorio
          </button>
        </div> */}
      </div>

      <div className="flex flex-col gap-8">
        {/* EVALUACIÓN CLÍNICA */}
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

        {/* TRATAMIENTO */}
        <div className="pt-6 border-t border-gray-100">
          <div className="flex items-center justify-between gap-4 mb-4">
            <h4 className="flex items-center gap-2 text-md font-bold text-gray-800">
              <Pill className="w-5 h-5 text-blue-600" />
              Tratamiento Recetado
            </h4>

            {encounter.prescriptions?.length > 0 && (
              <span className="text-xs font-medium text-blue-700 bg-blue-50 border border-blue-100 px-2.5 py-1 rounded-full">
                {encounter.prescriptions.length} medicamento(s)
              </span>
            )}
          </div>

          {!encounter.prescriptions || encounter.prescriptions.length === 0 ? (
            <p className="text-sm text-gray-500 italic bg-gray-50 p-4 rounded-xl text-center border border-dashed border-gray-200">
              No se recetaron medicamentos en esta sesión.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {encounter.prescriptions.map((p: any, idx: number) => (
                <div
                  key={idx}
                  className="p-4 bg-white border border-gray-200 rounded-xl shadow-sm flex flex-col gap-2.5 relative overflow-hidden transition-all hover:shadow-md hover:border-blue-200"
                >
                  <div className="absolute top-0 left-0 w-1 h-full bg-blue-500"></div>

                  <div className="flex justify-between items-start gap-2">
                    <span className="font-bold text-gray-900 leading-tight">
                      {p.medicationName}
                    </span>

                    <span className="shrink-0 text-xs font-bold text-blue-700 bg-blue-50 px-2 py-1 rounded-md border border-blue-100">
                      {p.dosage?.amount} {p.dosage?.unit}
                    </span>
                  </div>

                  <div className="text-sm text-gray-600 flex flex-col gap-1">
                    <span className="flex items-baseline gap-1">
                      <span className="font-medium text-gray-700 text-xs uppercase tracking-wider">
                        Frecuencia:
                      </span>

                      {p.frequency}
                    </span>
                  </div>

                  <div className="flex items-center justify-center gap-1.5 text-xs font-medium text-gray-500 mt-1 bg-gray-50 p-1.5 rounded-md">
                    <CalendarClock className="w-3.5 h-3.5 text-gray-400" />

                    <span>{new Date(p.startDate).toLocaleDateString()}</span>

                    <span>-</span>

                    <span>{new Date(p.endDate).toLocaleDateString()}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* LABORATORIO */}
        {/* REEMPLAZA COMPLETAMENTE LA SECCIÓN LABORATORIO */}

        <div className="pt-6 border-t border-gray-100">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              <h4 className="flex items-center gap-2 text-md font-bold text-gray-800">
                <FlaskConical className="w-5 h-5 text-purple-600" />
                Estudios de Laboratorio
              </h4>

              {labTests?.length > 0 && (
                <span className="text-xs font-medium text-purple-700 bg-purple-50 border border-purple-100 px-2.5 py-1 rounded-full">
                  {labTests?.length} estudio(s)
                </span>
              )}
            </div>

            {/* ACTIONS */}
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

          {/* FORMULARIO NUEVO */}
          {isAddingLabTest && (
            <div className="mb-6 border border-purple-100 bg-purple-50 rounded-2xl p-5 animate-in fade-in slide-in-from-top-2 duration-300">
              <div className="flex items-center gap-2 mb-4">
                <FlaskConical className="w-5 h-5 text-purple-700" />

                <h5 className="font-bold text-purple-900">
                  Ordenar nuevo estudio
                </h5>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* NOMBRE */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-gray-700">
                    Nombre del estudio
                  </label>

                  <input
                    type="text"
                    value={labForm.testName}
                    onChange={(e) =>
                      setLabForm((prev) => ({
                        ...prev,
                        testName: e.target.value,
                      }))
                    }
                    placeholder="Ej: Química sanguínea de 27 elementos"
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-purple-200 focus:border-purple-300 bg-white"
                  />
                </div>

                {/* CATEGORÍA */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-gray-700">
                    Categoría
                  </label>

                  <select
                    value={labForm.category}
                    onChange={(e) =>
                      setLabForm((prev) => ({
                        ...prev,
                        category: e.target.value as CategoriaEstudiosLab,
                      }))
                    }
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-purple-200 focus:border-purple-300 bg-white"
                  >
                    {Object.values(CATEGORIAS_ESTUDIOS_LAB).map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* INDICACIONES */}
              <div className="mt-4 flex flex-col gap-1.5">
                <label className="text-sm font-medium text-gray-700">
                  Indicaciones para el paciente
                </label>

                <textarea
                  rows={4}
                  value={labForm.instructions}
                  onChange={(e) =>
                    setLabForm((prev) => ({
                      ...prev,
                      instructions: e.target.value,
                    }))
                  }
                  placeholder="Ej: Ayuno de 12 horas"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-purple-200 focus:border-purple-300 resize-none bg-white"
                />
              </div>

              {/* BOTONES */}
              <div className="flex justify-end gap-3 mt-5">
                <button
                  onClick={() => setIsAddingLabTest(false)}
                  className="px-4 py-2 text-sm font-medium border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>

                <button
                  onClick={handleCreateLabTest}
                  disabled={createLabTestMutation.isPending}
                  className="flex items-center gap-2 px-5 py-2 text-sm font-semibold text-white bg-purple-600 rounded-xl hover:bg-purple-700 transition-colors disabled:opacity-60"
                >
                  <PlusCircle className="w-4 h-4" />

                  {createLabTestMutation.isPending
                    ? "Guardando..."
                    : "Guardar estudio"}
                </button>
              </div>
            </div>
          )}

          {/* EMPTY STATE */}
          {!labTests || labTests.length === 0 ? (
            <div className="text-sm text-gray-500 italic bg-gray-50 p-6 rounded-2xl text-center border border-dashed border-gray-200 flex flex-col items-center gap-3">
              <div className="w-14 h-14 rounded-full bg-purple-100 flex items-center justify-center">
                <FlaskConical className="w-7 h-7 text-purple-500" />
              </div>

              <div>
                <p className="font-medium text-gray-700 not-italic">
                  No se solicitaron estudios de laboratorio
                </p>

                <p className="text-xs text-gray-500 mt-1">
                  Los estudios solicitados aparecerán aquí.
                </p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {labTests.map((lab: any, idx: number) => (
                <div
                  key={idx}
                  className="p-4 bg-white border border-gray-200 rounded-2xl shadow-sm flex flex-col gap-3 relative overflow-hidden transition-all hover:shadow-md hover:border-purple-200"
                >
                  <div className="absolute top-0 left-0 w-1 h-full bg-purple-500"></div>

                  {/* HEADER */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex flex-col">
                      <span className="font-bold text-gray-900 leading-tight">
                        {lab.testName}
                      </span>

                      <span className="text-xs text-gray-500 mt-1">
                        Categoría: {lab.category}
                      </span>
                    </div>

                    <span
                    // className={`text-[10px] font-bold px-2 py-1 rounded-md border whitespace-nowrap ${LAB_STATUS_STYLES[lab.status]}`}
                    >
                      {lab.status}
                    </span>
                  </div>

                  {/* INDICACIONES */}
                  <div className="bg-purple-50 border border-purple-100 rounded-xl p-3">
                    <span className="text-xs uppercase tracking-wide font-semibold text-purple-700">
                      Indicaciones
                    </span>

                    <p className="text-sm text-gray-700 mt-1 leading-relaxed">
                      {lab.instructions || "Sin instrucciones especiales"}
                    </p>
                  </div>

                  {/* FOOTER */}
                  <div className="flex items-center justify-between gap-2 text-xs text-gray-500 pt-1">
                    <div className="flex items-center gap-1">
                      <CalendarClock className="w-3.5 h-3.5" />

                      <span>
                        {new Date(lab.createdAt).toLocaleDateString()}
                      </span>
                    </div>

                    {lab.files?.length > 0 && (
                      <span className="font-medium text-green-700 bg-green-50 px-2 py-1 rounded-md border border-green-100">
                        {lab.files.length} resultado(s)
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
