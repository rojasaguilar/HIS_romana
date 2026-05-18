import { useState } from "react";
import { useToast } from "@/shared/components/feedback/toast/ToastProvider";
import { Plus, Trash2, Pill, FlaskConical } from "lucide-react";
import { useCreateEncounter } from "../hooks/useCreateEncounter";

import {
  CATEGORIAS_ESTUDIOS_LAB,
  type CategoriaEstudiosLab,
} from "@/modules/lab-test/dtos/lab-test.dto";

// =========================
// TYPES
// =========================

interface PrescriptionInput {
  medicationName: string;
  dosageAmount: string;
  dosageUnit: string;
  frequency: string;
  startDate: string;
  endDate: string;
}

interface LabTestInput {
  category: CategoriaEstudiosLab;
  testName: string;
  instructions: string;
}

interface EncounterFormProps {
  appointment: any;
  onCancel: () => void;
}

export const EncounterForm = ({
  appointment,
  onCancel,
}: EncounterFormProps) => {
  const { showToast } = useToast();
  const createEncounter = useCreateEncounter();

  // =========================
  // FORM STATES
  // =========================

  const [symptoms, setSymptoms] = useState("");
  const [preliminaryDiagnosis, setPreliminaryDiagnosis] = useState("");
  const [differentialDiagnosis, setDifferentialDiagnosis] = useState("");
  const [notes, setNotes] = useState("");

  const [prescriptions, setPrescriptions] = useState<PrescriptionInput[]>([]);

  const [labTests, setLabTests] = useState<LabTestInput[]>([]);

  // =========================
  // PRESCRIPTIONS
  // =========================

  const handleAddPrescription = () => {
    setPrescriptions((prev) => [
      ...prev,
      {
        medicationName: "",
        dosageAmount: "",
        dosageUnit: "mg",
        frequency: "",
        startDate: "",
        endDate: "",
      },
    ]);
  };

  const handleRemovePrescription = (index: number) => {
    setPrescriptions((prev) => prev.filter((_, i) => i !== index));
  };

  const handlePrescriptionChange = (
    index: number,
    field: keyof PrescriptionInput,
    value: string,
  ) => {
    const updated = [...prescriptions];

    updated[index] = {
      ...updated[index],
      [field]: value,
    };

    setPrescriptions(updated);
  };

  // =========================
  // LAB TESTS
  // =========================

  const handleAddLabTest = () => {
    setLabTests((prev) => [
      ...prev,
      {
        category: CATEGORIAS_ESTUDIOS_LAB.SANGRE,
        testName: "",
        instructions: "",
      },
    ]);
  };

  const handleRemoveLabTest = (index: number) => {
    setLabTests((prev) => prev.filter((_, i) => i !== index));
  };

  const handleLabTestChange = (
    index: number,
    field: keyof LabTestInput,
    value: string,
  ) => {
    const updated = [...labTests];

    updated[index] = {
      ...updated[index],
      [field]: value,
    };

    setLabTests(updated);
  };

  // =========================
  // SUBMIT
  // =========================

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!symptoms.trim() || !preliminaryDiagnosis.trim()) {
      showToast(
        "Los síntomas y diagnóstico preliminar son obligatorios",
        "error",
      );
      return;
    }

    // VALIDAR RECETAS

    for (const p of prescriptions) {
      if (
        !p.medicationName ||
        !p.dosageAmount ||
        !p.frequency ||
        !p.startDate ||
        !p.endDate
      ) {
        showToast("Completa todos los campos de los medicamentos", "error");
        return;
      }

      if (isNaN(Number(p.dosageAmount))) {
        showToast(
          `La dosis de ${p.medicationName || "un medicamento"} debe ser válida`,
          "error",
        );
        return;
      }
    }

    // VALIDAR LAB TESTS

    for (const lab of labTests) {
      if (!lab.testName.trim()) {
        showToast("Todos los estudios deben tener nombre", "error");
        return;
      }
    }

    const encounterData = {
      patientId: appointment.patientId,
      medicId: appointment.medicId,
      appointmentId: appointment.id,

      symptoms: symptoms.trim(),

      preliminaryDiagnosis: preliminaryDiagnosis.trim(),

      differentialDiagnosis: differentialDiagnosis.trim(),

      notes: notes.trim() || undefined,

      prescriptions: prescriptions.map((p) => ({
        medicationName: p.medicationName,

        dosage: {
          amount: Number(p.dosageAmount),
          unit: p.dosageUnit,
        },

        frequency: p.frequency,

        startDate: new Date(p.startDate).toISOString(),

        endDate: new Date(p.endDate).toISOString(),
      })),

      labTests: labTests.map((lab) => ({
        category: lab.category,
        testName: lab.testName,
        instructions: lab.instructions,
      })),
    };

    createEncounter.mutate(encounterData, {
      onSuccess: () => {
        showToast("Nota clínica guardada y cita finalizada", "success");

        onCancel();
      },

      onError: (err: any) => {
        showToast(
          err?.response?.data?.message || "Error al guardar la nota",
          "error",
        );
      },
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      {/* ========================= */}
      {/* EVALUACIÓN */}
      {/* ========================= */}

      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2 border-b border-gray-100 pb-2">
          <h4 className="text-md font-bold text-gray-800">
            Evaluación del Paciente
          </h4>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold text-gray-700">
            Síntomas / Motivo de consulta *
          </label>

          <textarea
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            placeholder="Ej. Dolor abdominal..."
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl resize-none h-24 text-sm"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-700">
              Diagnóstico Preliminar *
            </label>

            <textarea
              value={preliminaryDiagnosis}
              onChange={(e) => setPreliminaryDiagnosis(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl resize-none h-24 text-sm"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-700">
              Diagnóstico Diferencial
            </label>

            <textarea
              value={differentialDiagnosis}
              onChange={(e) => setDifferentialDiagnosis(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl resize-none h-24 text-sm"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold text-gray-700">
            Notas adicionales
          </label>

          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl resize-none h-20 text-sm"
          />
        </div>
      </div>

      {/* ========================= */}
      {/* RECETAS */}
      {/* ========================= */}

      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between border-b border-gray-100 pb-2">
          <div className="flex items-center gap-2">
            <Pill className="w-5 h-5 text-blue-600" />

            <h4 className="text-md font-bold text-gray-800">
              Tratamiento y Receta
            </h4>
          </div>

          <button
            type="button"
            onClick={handleAddPrescription}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-blue-700 bg-blue-50 rounded-lg"
          >
            <Plus className="w-3.5 h-3.5" />
            Agregar Medicamento
          </button>
        </div>

        {prescriptions.length === 0 ? (
          <p className="text-sm text-gray-400 italic text-center py-4 bg-gray-50 rounded-xl border border-dashed border-gray-200">
            No se han agregado medicamentos.
          </p>
        ) : (
          <div className="flex flex-col gap-4">
            {prescriptions.map((prescription, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-xl p-4 flex flex-col gap-4"
              >
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => handleRemovePrescription(index)}
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </button>
                </div>

                <input
                  type="text"
                  placeholder="Medicamento"
                  value={prescription.medicationName}
                  onChange={(e) =>
                    handlePrescriptionChange(
                      index,
                      "medicationName",
                      e.target.value,
                    )
                  }
                  className="px-3 py-2 border rounded-lg"
                />

                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="number"
                    placeholder="Cantidad"
                    value={prescription.dosageAmount}
                    onChange={(e) =>
                      handlePrescriptionChange(
                        index,
                        "dosageAmount",
                        e.target.value,
                      )
                    }
                    className="px-3 py-2 border rounded-lg"
                  />

                  <select
                    value={prescription.dosageUnit}
                    onChange={(e) =>
                      handlePrescriptionChange(
                        index,
                        "dosageUnit",
                        e.target.value,
                      )
                    }
                    className="px-3 py-2 border rounded-lg"
                  >
                    <option value="mg">mg</option>
                    <option value="g">g</option>
                    <option value="ml">ml</option>
                    <option value="mcg">mcg</option>
                    <option value="UI">UI</option>
                    <option value="tabletas">tabletas</option>
                    <option value="cápsulas">cápsulas</option>
                    <option value="gotas">gotas</option>
                  </select>
                </div>

                <input
                  type="text"
                  placeholder="Frecuencia"
                  value={prescription.frequency}
                  onChange={(e) =>
                    handlePrescriptionChange(index, "frequency", e.target.value)
                  }
                  className="px-3 py-2 border rounded-lg"
                />

                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="date"
                    value={prescription.startDate}
                    onChange={(e) =>
                      handlePrescriptionChange(
                        index,
                        "startDate",
                        e.target.value,
                      )
                    }
                    className="px-3 py-2 border rounded-lg"
                  />

                  <input
                    type="date"
                    value={prescription.endDate}
                    onChange={(e) =>
                      handlePrescriptionChange(index, "endDate", e.target.value)
                    }
                    className="px-3 py-2 border rounded-lg"
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ========================= */}
      {/* LAB TESTS */}
      {/* ========================= */}

      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between border-b border-gray-100 pb-2">
          <div className="flex items-center gap-2">
            <FlaskConical className="w-5 h-5 text-purple-600" />

            <h4 className="text-md font-bold text-gray-800">
              Estudios de Laboratorio
            </h4>
          </div>

          <button
            type="button"
            onClick={handleAddLabTest}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-purple-700 bg-purple-50 rounded-lg"
          >
            <Plus className="w-3.5 h-3.5" />
            Agregar Estudio
          </button>
        </div>

        {labTests.length === 0 ? (
          <p className="text-sm text-gray-400 italic text-center py-4 bg-gray-50 rounded-xl border border-dashed border-gray-200">
            No se han agregado estudios de laboratorio.
          </p>
        ) : (
          <div className="flex flex-col gap-4">
            {labTests.map((lab, index) => (
              <div
                key={index}
                className="relative border border-purple-100 bg-white rounded-2xl shadow-sm p-5 flex flex-col gap-4"
              >
                <div className="absolute top-0 left-0 w-1 h-full bg-purple-500 rounded-l-2xl"></div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FlaskConical className="w-5 h-5 text-purple-600" />

                    <span className="font-semibold text-gray-800">
                      Estudio #{index + 1}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleRemoveLabTest(index)}
                    className="p-2 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-600 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-semibold text-gray-700">
                      Nombre del estudio
                    </label>

                    <input
                      type="text"
                      required
                      value={lab.testName}
                      onChange={(e) =>
                        handleLabTestChange(index, "testName", e.target.value)
                      }
                      placeholder="Ej. Biometría Hemática"
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-semibold text-gray-700">
                      Categoría
                    </label>

                    <select
                      value={lab.category}
                      onChange={(e) =>
                        handleLabTestChange(index, "category", e.target.value)
                      }
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm"
                    >
                      {Object.values(CATEGORIAS_ESTUDIOS_LAB).map(
                        (category) => (
                          <option key={category} value={category}>
                            {category}
                          </option>
                        ),
                      )}
                    </select>
                  </div>

                  <div className="md:col-span-2 flex flex-col gap-1">
                    <label className="text-sm font-semibold text-gray-700">
                      Indicaciones
                    </label>

                    <textarea
                      value={lab.instructions}
                      onChange={(e) =>
                        handleLabTestChange(
                          index,
                          "instructions",
                          e.target.value,
                        )
                      }
                      placeholder="Ayuno de 8 horas..."
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl resize-none h-20 text-sm"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ========================= */}
      {/* ACTIONS */}
      {/* ========================= */}

      <div className="flex justify-end gap-3 border-t border-gray-100 pt-4">
        <button
          type="button"
          onClick={onCancel}
          disabled={createEncounter.isPending}
          className="px-4 py-2 text-sm font-semibold text-gray-600 bg-white border border-gray-200 rounded-xl"
        >
          Cancelar
        </button>

        <button
          type="submit"
          disabled={createEncounter.isPending}
          className="px-5 py-2 text-sm font-semibold text-white bg-blue-600 rounded-xl"
        >
          {createEncounter.isPending
            ? "Guardando nota..."
            : "Guardar Nota Clínica"}
        </button>
      </div>
    </form>
  );
};
