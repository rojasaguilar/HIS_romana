import { useState } from "react";
import { useToast } from "@/shared/components/feedback/toast/ToastProvider";
import { Plus, Trash2, Pill } from "lucide-react";
import { useCreateEncounter } from "../hooks/useCreateEncounter";

// Estado aplanado para facilitar el manejo de inputs en React
interface PrescriptionInput {
  medicationName: string;
  dosageAmount: string;
  dosageUnit: string;
  frequency: string;
  startDate: string;
  endDate: string;
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

  // Estados del formulario clínico
  const [symptoms, setSymptoms] = useState("");
  const [preliminaryDiagnosis, setPreliminaryDiagnosis] = useState("");
  const [differentialDiagnosis, setDifferentialDiagnosis] = useState("");
  const [notes, setNotes] = useState("");

  // Estado dinámico para las recetas
  const [prescriptions, setPrescriptions] = useState<PrescriptionInput[]>([]);

  // Agregar una nueva fila de medicamento
  const handleAddPrescription = () => {
    setPrescriptions([
      ...prescriptions,
      {
        medicationName: "",
        dosageAmount: "",
        dosageUnit: "mg", // Valor por defecto
        frequency: "",
        startDate: "",
        endDate: "",
      },
    ]);
  };

  // Remover una fila de medicamento
  const handleRemovePrescription = (index: number) => {
    setPrescriptions(prescriptions.filter((_, i) => i !== index));
  };

  // Manejar cambios en los campos de los medicamentos
  const handlePrescriptionChange = (
    index: number,
    field: keyof PrescriptionInput,
    value: string,
  ) => {
    const updated = [...prescriptions];
    updated[index][field] = value;
    setPrescriptions(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !symptoms.trim() ||
      !preliminaryDiagnosis.trim()
      //   !differentialDiagnosis.trim()
    ) {
      showToast("Los síntomas y ambos diagnósticos son obligatorios", "error");
      return;
    }

    // Validar que si hay recetas, tengan los campos mínimos
    for (const p of prescriptions) {
      if (
        !p.medicationName ||
        !p.dosageAmount ||
        !p.frequency ||
        !p.startDate ||
        !p.endDate
      ) {
        showToast(
          "Por favor completa todos los campos de los medicamentos agregados",
          "error",
        );
        return;
      }
      if (isNaN(Number(p.dosageAmount))) {
        showToast(
          `La dosis de ${p.medicationName || "un medicamento"} debe ser un número válido`,
          "error",
        );
        return;
      }
    }

    // Formateamos la data reconstruyendo el objeto anidado para dosage
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
    };

    createEncounter.mutate(encounterData, {
      onSuccess: () => {
        showToast("Nota clínica guardada y cita finalizada", "success");
        onCancel(); // Cierra el formulario volviendo al modo lectura
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
      {/* SECCIÓN 1: EVALUACIÓN CLÍNICA */}
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
            placeholder="Ej. Paciente refiere dolor abdominal agudo..."
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors resize-none h-24 text-sm"
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
              placeholder="Ej. Cuadro compatible con apendicitis..."
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors resize-none h-24 text-sm"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-700">
              Diagnóstico Diferencial *
            </label>
            <textarea
              value={differentialDiagnosis}
              onChange={(e) => setDifferentialDiagnosis(e.target.value)}
              placeholder="Ej. Descartar Gastroenteritis infecciosa..."
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors resize-none h-24 text-sm"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold text-gray-700">
            Notas Adicionales / Observaciones (Opcional)
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Resultados de exploración física, signos vitales significativos, etc."
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors resize-none h-20 text-sm"
          />
        </div>
      </div>

      {/* SECCIÓN 2: TRATAMIENTO / TRATAMIENTO RECETADO */}
      <div className="flex flex-col gap-4 mt-2">
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
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
          >
            <Plus className="w-3.5 h-3.5" /> Agregar Medicamento
          </button>
        </div>

        {prescriptions.length === 0 ? (
          <p className="text-sm text-gray-400 italic text-center py-4 bg-gray-50 rounded-xl border border-dashed border-gray-200">
            No se han agregado medicamentos a la receta de esta sesión.
          </p>
        ) : (
          <div className="flex flex-col gap-4">
            {prescriptions.map((prescription, index) => (
              <div
                key={index}
                className="relative flex justify-around py-4 px-6 border border-gray-200 bg-white rounded-xl shadow-sm gap-3 pt-8 sm:pt-4 animate-in fade-in zoom-in-95 duration-200"
              >
                <div className="flex flex-col gap-0.5 sm:col-span-1">
                  <label className="text-xs font-medium text-gray-500">
                    Medicamento
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Paracetamol..."
                    value={prescription.medicationName}
                    onChange={(e) =>
                      handlePrescriptionChange(
                        index,
                        "medicationName",
                        e.target.value,
                      )
                    }
                    className="px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>

                {/* NUEVO CAMPO DE DOSIS DIVIDIDO */}
                <div className="flex flex-col gap-0.5">
                  <label className="text-xs font-medium text-gray-500">
                    Dosis (Cant. / Unidad)
                  </label>
                  <div className="flex gap-1">
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      required
                      placeholder="500"
                      value={prescription.dosageAmount}
                      onChange={(e) =>
                        handlePrescriptionChange(
                          index,
                          "dosageAmount",
                          e.target.value,
                        )
                      }
                      className="w-1/2 px-2 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
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
                      className="w-1/2 px-1 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
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
                </div>

                <div className="flex flex-col gap-0.5">
                  <label className="text-xs font-medium text-gray-500">
                    Frecuencia
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Cada 8 horas..."
                    value={prescription.frequency}
                    onChange={(e) =>
                      handlePrescriptionChange(
                        index,
                        "frequency",
                        e.target.value,
                      )
                    }
                    className="px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="flex flex-col gap-0.5">
                  <label className="text-xs font-medium text-gray-500">
                    Inicio / Fin
                  </label>
                  <div className="flex gap-1">
                    <input
                      type="date"
                      required
                      value={prescription.startDate}
                      onChange={(e) =>
                        handlePrescriptionChange(
                          index,
                          "startDate",
                          e.target.value,
                        )
                      }
                      className="w-full px-2 py-2 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
                    />
                    <input
                      type="date"
                      required
                      value={prescription.endDate}
                      onChange={(e) =>
                        handlePrescriptionChange(
                          index,
                          "endDate",
                          e.target.value,
                        )
                      }
                      className="w-full px-2 py-2 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleRemovePrescription(index)}
                  //   className="absolute top-2 right-2 sm:static sm:order-last sm:flex sm:items-center sm:justify-center p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors self-end h-10 w-10"
                  title="Eliminar medicamento"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ACCIONES DEL FORMULARIO */}
      <div className="flex justify-end gap-3 border-t border-gray-100 pt-4 mt-2">
        <button
          type="button"
          onClick={onCancel}
          disabled={createEncounter.isPending}
          className="px-4 py-2 text-sm font-semibold text-gray-600 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors disabled:opacity-50"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={createEncounter.isPending}
          className="px-5 py-2 text-sm font-semibold text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 disabled:opacity-50"
        >
          {createEncounter.isPending
            ? "Guardando nota..."
            : "Guardar Nota Clínica"}
        </button>
      </div>
    </form>
  );
};
