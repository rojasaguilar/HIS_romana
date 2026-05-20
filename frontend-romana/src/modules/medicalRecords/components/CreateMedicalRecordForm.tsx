import { useState } from "react";
import {
  Activity,
  Plus,
  Trash2,
  Pill,
  HeartPulse,
  Scissors,
  AlertTriangle,
  FileText,
} from "lucide-react";

import { useToast } from "@/shared/components/feedback/toast/ToastProvider";

import { useCreateMedicalRecord } from "../hooks/useMedicalRecord";
import { useConditions } from "@/modules/conditions/hooks/useConditions";

interface Props {
  patientId: string;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export const CreateMedicalRecordForm = ({
  patientId,
  onSuccess,
  onCancel,
}: Props) => {
  const { showToast } = useToast();

  const createMedicalRecord = useCreateMedicalRecord();

  const { data: backendConditions = [], isLoading: isLoadingConditions } =
    useConditions();

  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [summary, setSummary] = useState("");

  const [allergyInput, setAllergyInput] = useState("");
  const [allergies, setAllergies] = useState<string[]>([]);

  const [riskInput, setRiskInput] = useState("");
  const [riskFactors, setRiskFactors] = useState<string[]>([]);

  const [conditions, setConditions] = useState([
    {
      conditionId: "",
      since: new Date(),
      diagnosedBy: "",
    },
  ]);

  const [medications, setMedications] = useState([
    {
      medicationName: "",
      amount: "",
      unit: "mg",
      timesPerDay: "",
      startedAt: "",
    },
  ]);

  const [surgeries, setSurgeries] = useState([
    {
      surgeryName: "",
      surgeryDate: "",
    },
  ]);

  const addAllergy = () => {
    if (!allergyInput.trim()) return;

    setAllergies((prev) => [...prev, allergyInput.trim()]);
    setAllergyInput("");
  };

  const removeAllergy = (index: number) => {
    setAllergies((prev) => prev.filter((_, i) => i !== index));
  };
  // ===============================
  // CONDITIONS
  // ===============================

  const addCondition = () => {
    setConditions((prev) => [
      ...prev,
      {
        conditionId: "",
        since: new Date(),
        diagnosedBy: "",
      },
    ]);
  };

  const removeCondition = (index: number) => {
    setConditions((prev) => prev.filter((_, i) => i !== index));
  };

  const updateCondition = (
    index: number,
    field: "conditionId" | "since" | "diagnosedBy",
    value: string,
  ) => {
    setConditions((prev) => {
      const updated = [...prev];

      updated[index] = {
        ...updated[index],
        [field]: value,
      };

      return updated;
    });
  };

  // ===============================
  // MEDICATIONS
  // ===============================

  const addMedication = () => {
    setMedications((prev) => [
      ...prev,
      {
        medicationName: "",
        amount: "",
        unit: "mg",
        timesPerDay: "",
        startedAt: "",
      },
    ]);
  };

  const removeMedication = (index: number) => {
    setMedications((prev) => prev.filter((_, i) => i !== index));
  };

  const updateMedication = (
    index: number,
    field: "medicationName" | "amount" | "unit" | "timesPerDay" | "startedAt",
    value: string,
  ) => {
    setMedications((prev) => {
      const updated = [...prev];

      updated[index] = {
        ...updated[index],
        [field]: value,
      };

      return updated;
    });
  };

  // ===============================
  // SURGERIES
  // ===============================

  const addSurgery = () => {
    setSurgeries((prev) => [
      ...prev,
      {
        surgeryName: "",
        surgeryDate: "",
      },
    ]);
  };

  const removeSurgery = (index: number) => {
    setSurgeries((prev) => prev.filter((_, i) => i !== index));
  };

  const updateSurgery = (
    index: number,
    field: "surgeryName" | "surgeryDate",
    value: string,
  ) => {
    setSurgeries((prev) => {
      const updated = [...prev];

      updated[index] = {
        ...updated[index],
        [field]: value,
      };

      return updated;
    });
  };

  // ===============================
  // RISK FACTORS
  // ===============================

  const addRiskFactor = () => {
    if (!riskInput.trim()) return;

    setRiskFactors((prev) => [...prev, riskInput.trim()]);
    setRiskInput("");
  };

  const removeRiskFactor = (index: number) => {
    setRiskFactors((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!height || !weight) {
      showToast("Peso y altura son obligatorios", "error");
      return;
    }

    createMedicalRecord.mutate(
      {
        patientId,
        allergies,
        height: Number(height),
        weight: Number(weight),

        currentConditions: conditions
          .filter((c) => c.conditionId && c.since)
          .map((c) => ({
            conditionId: c.conditionId,
            since: new Date(c.since).toISOString(),
            diagnosedBy: c.diagnosedBy || undefined,
          })),

        chronicMedications: medications
          .filter(
            (m) => m.medicationName && m.amount && m.timesPerDay && m.startedAt,
          )
          .map((m) => ({
            medicationName: m.medicationName,
            dosage: {
              amount: Number(m.amount),
              unit: m.unit,
            },
            frequency: {
              timesPerDay: Number(m.timesPerDay),
            },
            startedAt: new Date(m.startedAt).toISOString(),
          })),

        familyHistory: [],

        riskFactors,

        surgicalHistory: surgeries
          .filter((s) => s.surgeryName && s.surgeryDate)
          .map((s) => ({
            surgeryName: s.surgeryName,
            surgeryDate: new Date(s.surgeryDate).toISOString(),
          })),

        summary,
      },
      {
        onSuccess: () => {
          showToast("Expediente médico creado", "success");
          onSuccess?.();
        },

        onError: (err: any) => {
          showToast(
            err?.response?.data?.message || "Error al crear expediente médico",
            "error",
          );
        },
      },
    );
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8">
      {/* BIOMETRÍA */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-5">
          <Activity className="w-5 h-5 text-indigo-600" />
          <h3 className="font-bold text-slate-900">Biometría</h3>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <input
            type="number"
            placeholder="Altura (cm)"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="px-4 py-3 rounded-xl border border-slate-200"
          />

          <input
            type="number"
            placeholder="Peso (kg)"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="px-4 py-3 rounded-xl border border-slate-200"
          />
        </div>
      </div>

      {/* ALERGIAS */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-5">
          <AlertTriangle className="w-5 h-5 text-red-500" />
          <h3 className="font-bold text-slate-900">Alergias</h3>
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            value={allergyInput}
            onChange={(e) => setAllergyInput(e.target.value)}
            placeholder="Ej. Penicilina"
            className="flex-1 px-4 py-3 rounded-xl border border-slate-200"
          />

          <button
            type="button"
            onClick={addAllergy}
            className="px-4 bg-red-500 text-white rounded-xl"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        <div className="flex flex-wrap gap-2 mt-4">
          {allergies.map((a, i) => (
            <div
              key={i}
              className="flex items-center gap-2 px-3 py-2 bg-red-100 text-red-700 rounded-lg"
            >
              <span>{a}</span>

              <button type="button" onClick={() => removeAllergy(i)}>
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* FACTORES DE RIESGO */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-5">
          <AlertTriangle className="w-5 h-5 text-orange-500" />
          <h3 className="font-bold text-slate-900">Factores de Riesgo</h3>
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            value={riskInput}
            onChange={(e) => setRiskInput(e.target.value)}
            placeholder="Ej. Tabaquismo"
            className="flex-1 px-4 py-3 rounded-xl border border-slate-200"
          />

          <button
            type="button"
            onClick={addRiskFactor}
            className="px-4 bg-orange-500 text-white rounded-xl"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        <div className="flex flex-wrap gap-2 mt-4">
          {riskFactors.map((risk, i) => (
            <div
              key={i}
              className="flex items-center gap-2 px-3 py-2 bg-orange-100 text-orange-700 rounded-lg"
            >
              <span>{risk}</span>

              <button type="button" onClick={() => removeRiskFactor(i)}>
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* CONDICIONES ACTUALES */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <HeartPulse className="w-5 h-5 text-pink-600" />
            <h3 className="font-bold text-slate-900">Condiciones Actuales</h3>
          </div>

          <button
            type="button"
            onClick={addCondition}
            className="px-3 py-2 bg-pink-100 text-pink-700 rounded-xl text-sm font-semibold flex items-center gap-1"
          >
            <Plus className="w-4 h-4" />
            Agregar
          </button>
        </div>

        <div className="flex flex-col gap-4">
          {conditions.map((condition, index) => (
            <div
              key={index}
              className="grid grid-cols-4 gap-3 border border-slate-200 rounded-xl p-4"
            >
              <select
                value={condition.conditionId}
                onChange={(e) =>
                  updateCondition(index, "conditionId", e.target.value)
                }
                className="px-4 py-3 rounded-xl border border-slate-200"
              >
                <option value="">
                  {isLoadingConditions
                    ? "Cargando condiciones..."
                    : "Seleccionar condición"}
                </option>

                {backendConditions.map((cond) => (
                  <option key={cond.id} value={cond.id}>
                    {cond.code} - {cond.name}
                  </option>
                ))}
              </select>

              <input
                type="date"
                value={
                  condition.since
                    ? new Date(condition.since).toISOString().split("T")[0]
                    : ""
                }
                onChange={(e) =>
                  updateCondition(index, "since", e.target.value)
                }
                className="px-4 py-3 rounded-xl border border-slate-200"
              />

              <input
                type="text"
                placeholder="Diagnosticado por"
                value={condition.diagnosedBy}
                onChange={(e) =>
                  updateCondition(index, "diagnosedBy", e.target.value)
                }
                className="px-4 py-3 rounded-xl border border-slate-200"
              />

              <button
                type="button"
                onClick={() => removeCondition(index)}
                className="bg-red-50 hover:bg-red-100 text-red-600 rounded-xl flex items-center justify-center"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* MEDICACIÓN CRÓNICA */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <Pill className="w-5 h-5 text-indigo-600" />
            <h3 className="font-bold text-slate-900">Medicación Crónica</h3>
          </div>

          <button
            type="button"
            onClick={addMedication}
            className="px-3 py-2 bg-indigo-100 text-indigo-700 rounded-xl text-sm font-semibold flex items-center gap-1"
          >
            <Plus className="w-4 h-4" />
            Agregar
          </button>
        </div>

        <div className="flex flex-col gap-4">
          {medications.map((med, index) => (
            <div
              key={index}
              className="grid grid-cols-5 gap-3 border border-slate-200 rounded-xl p-4"
            >
              <input
                type="text"
                placeholder="Medicamento"
                value={med.medicationName}
                onChange={(e) =>
                  updateMedication(index, "medicationName", e.target.value)
                }
                className="px-4 py-3 rounded-xl border border-slate-200"
              />

              <input
                type="number"
                placeholder="Cantidad"
                value={med.amount}
                onChange={(e) =>
                  updateMedication(index, "amount", e.target.value)
                }
                className="px-4 py-3 rounded-xl border border-slate-200"
              />

              <input
                type="text"
                placeholder="Unidad"
                value={med.unit}
                onChange={(e) =>
                  updateMedication(index, "unit", e.target.value)
                }
                className="px-4 py-3 rounded-xl border border-slate-200"
              />

              <input
                type="number"
                placeholder="Veces al día"
                value={med.timesPerDay}
                onChange={(e) =>
                  updateMedication(index, "timesPerDay", e.target.value)
                }
                className="px-4 py-3 rounded-xl border border-slate-200"
              />

              <div className="flex gap-2">
                <input
                  type="date"
                  value={med.startedAt}
                  onChange={(e) =>
                    updateMedication(index, "startedAt", e.target.value)
                  }
                  className="w-full px-4 py-3 rounded-xl border border-slate-200"
                />

                <button
                  type="button"
                  onClick={() => removeMedication(index)}
                  className="px-3 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CIRUGÍAS */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <Scissors className="w-5 h-5 text-slate-700" />
            <h3 className="font-bold text-slate-900">
              Antecedentes Quirúrgicos
            </h3>
          </div>

          <button
            type="button"
            onClick={addSurgery}
            className="px-3 py-2 bg-slate-100 text-slate-700 rounded-xl text-sm font-semibold flex items-center gap-1"
          >
            <Plus className="w-4 h-4" />
            Agregar
          </button>
        </div>

        <div className="flex flex-col gap-4">
          {surgeries.map((surgery, index) => (
            <div
              key={index}
              className="grid grid-cols-3 gap-3 border border-slate-200 rounded-xl p-4"
            >
              <input
                type="text"
                placeholder="Nombre de cirugía"
                value={surgery.surgeryName}
                onChange={(e) =>
                  updateSurgery(index, "surgeryName", e.target.value)
                }
                className="px-4 py-3 rounded-xl border border-slate-200"
              />

              <input
                type="date"
                value={surgery.surgeryDate}
                onChange={(e) =>
                  updateSurgery(index, "surgeryDate", e.target.value)
                }
                className="px-4 py-3 rounded-xl border border-slate-200"
              />

              <button
                type="button"
                onClick={() => removeSurgery(index)}
                className="bg-red-50 hover:bg-red-100 text-red-600 rounded-xl flex items-center justify-center"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* RESUMEN */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-5">
          <FileText className="w-5 h-5 text-slate-700" />
          <h3 className="font-bold text-slate-900">Resumen Clínico</h3>
        </div>

        <textarea
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          placeholder="Resumen general del paciente..."
          className="w-full h-32 resize-none px-4 py-3 rounded-xl border border-slate-200"
        />
      </div>

      {/* ACTIONS */}
      <div className="flex justify-end gap-3">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-5 py-3 border border-slate-200 rounded-xl font-semibold"
          >
            Cancelar
          </button>
        )}

        <button
          type="submit"
          disabled={createMedicalRecord.isPending}
          className="px-5 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold"
        >
          {createMedicalRecord.isPending
            ? "Creando expediente..."
            : "Crear Expediente"}
        </button>
      </div>
    </form>
  );
};
