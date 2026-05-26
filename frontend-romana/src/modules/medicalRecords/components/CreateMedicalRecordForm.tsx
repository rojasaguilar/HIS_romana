import { useState } from "react";

import { useToast } from "@/shared/components/feedback/toast/ToastProvider";
import { useCreateMedicalRecord } from "../hooks/useMedicalRecord";
import { useConditions } from "@/modules/conditions/hooks/useConditions";

import { BiometricsSection } from "./sections/BiometricsSection";
import { AllergiesSection } from "./sections/AllergiesSection";
import { ConditionsSection } from "./sections/ConditionsSection";
import { FamilyHistorySection } from "./sections/FamilyHistorySection";
import { MedicationsSection } from "./sections/MedicationsSection";
import { RiskFactorsSection } from "./sections/RiskFactorsSection";
import { SummarySection } from "./sections/SummarySection";
import { SurgicalHistorySection } from "./sections/SurgicalHistorySection";

// Importamos el componente y la interfaz que acabamos de crear
import { 
  PersonalHistorySection, 
  type AntecedentesPersonalesPatologicosProps 
} from "./sections/PersonalHistorySection";

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

  const {
    data: backendConditions = [],
    isLoading: isLoadingConditions,
  } = useConditions();

  // ===============================
  // BASIC INFO
  // ===============================

  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [summary, setSummary] = useState("");

  // ===============================
  // ALLERGIES
  // ===============================

  const [allergyInput, setAllergyInput] = useState("");
  const [allergies, setAllergies] = useState<string[]>([]);

  const addAllergy = () => {
    if (!allergyInput.trim()) return;
    setAllergies((prev) => [...prev, allergyInput.trim()]);
    setAllergyInput("");
  };

  const removeAllergy = (index: number) => {
    setAllergies((prev) => prev.filter((_, i) => i !== index));
  };

  // ===============================
  // RISK FACTORS
  // ===============================

  const [riskInput, setRiskInput] = useState("");
  const [riskFactors, setRiskFactors] = useState<string[]>([]);

  const addRiskFactor = () => {
    if (!riskInput.trim()) return;
    setRiskFactors((prev) => [...prev, riskInput.trim()]);
    setRiskInput("");
  };

  const removeRiskFactor = (index: number) => {
    setRiskFactors((prev) => prev.filter((_, i) => i !== index));
  };

  // ===============================
  // CONDITIONS
  // ===============================

  const [conditions, setConditions] = useState([
    {
      conditionId: "",
      since: "",
      diagnosedBy: "",
    },
  ]);

  const addCondition = () => {
    setConditions((prev) => [
      ...prev,
      {
        conditionId: "",
        since: "",
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

  const [medications, setMedications] = useState([
    {
      medicationName: "",
      routeAdministration: "oral",
      amount: "",
      unit: "mg",
      timesPerDay: "",
      startedAt: "",
    },
  ]);

  const addMedication = () => {
    setMedications((prev) => [
      ...prev,
      {
        medicationName: "",
        routeAdministration: "oral",
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
    field:
      | "medicationName"
      | "routeAdministration"
      | "amount"
      | "unit"
      | "timesPerDay"
      | "startedAt",
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

  const [surgeries, setSurgeries] = useState([
    {
      surgeryName: "",
      surgeryDate: "",
    },
  ]);

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
  // FAMILY HISTORY
  // ===============================

  const [familyHistory, setFamilyHistory] = useState([
    {
      relationship: "",
      diseaseId: "",
    },
  ]);

  const addFamilyHistory = () => {
    setFamilyHistory((prev) => [
      ...prev,
      {
        relationship: "",
        diseaseId: "",
      },
    ]);
  };

  const removeFamilyHistory = (index: number) => {
    setFamilyHistory((prev) => prev.filter((_, i) => i !== index));
  };

  const updateFamilyHistory = (
    index: number,
    field: "relationship" | "diseaseId",
    value: string,
  ) => {
    setFamilyHistory((prev) => {
      const updated = [...prev];
      updated[index] = {
        ...updated[index],
        [field]: value,
      };
      return updated;
    });
  };

  // ===============================
  // PERSONAL HISTORY (UNIFICADO)
  // ===============================

  const [personalHistory, setPersonalHistory] = useState<AntecedentesPersonalesPatologicosProps>({
    tabaquismo: {
      consume: false,
      frecuencia: "",
      cantidad: "",
      tiempoConsumo: "",
      fechaUltimoConsumo: "",
      observaciones: "",
    },
    alcoholismo: {
      consume: false,
      frecuencia: "",
      cantidad: "",
      tiempoConsumo: "",
      fechaUltimoConsumo: "",
      observaciones: "",
    },
    toxicomanias: {
      consume: false,
      sustancias: [],
      frecuencia: "",
      tiempoConsumo: "",
      fechaUltimoConsumo: "",
      observaciones: "",
    },
    quirurgicos: [],
    hemotransfusiones: {
      haRecibido: false,
      cantidad: 0,
      fechaUltima: "",
      motivo: "",
      reaccionesAdversas: false,
      observaciones: "",
    },
    fracturas: [],
    infectocontagiosas: [],
    hospitalizacionesPrevias: [],
    cronicoDegenerativo: [],
  });

  // ===============================
  // SUBMIT
  // ===============================

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
            since: c.since,
            diagnosedBy: c.diagnosedBy || undefined,
          })),

        chronicMedications: medications
          .filter(
            (m) =>
              m.medicationName &&
              m.amount &&
              m.timesPerDay &&
              m.startedAt,
          )
          .map((m) => ({
            medicationName: m.medicationName,
            routeAdministration: m.routeAdministration,
            dosage: {
              amount: Number(m.amount),
              unit: m.unit,
            },
            frequency: {
              timesPerDay: Number(m.timesPerDay),
            },
            startedAt: new Date(m.startedAt),
          })),

        familyHistory: familyHistory.filter(
          (f) => f.relationship && f.diseaseId,
        ),

        riskFactors,

        surgicalHistory: surgeries
          .filter((s) => s.surgeryName && s.surgeryDate)
          .map((s) => ({
            surgeryName: s.surgeryName,
            surgeryDate: new Date(s.surgeryDate),
          })),

        // Ahora solo pasamos el estado unificado directamente
        antecedentesPersonalesPatologicos: personalHistory,

        summary,
      },
      {
        onSuccess: () => {
          showToast("Expediente médico creado", "success");
          onSuccess?.();
        },
        onError: (err: any) => {
          showToast(
            err?.response?.data?.message ||
              "Error al crear expediente médico",
            "error",
          );
        },
      },
    );
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8">
      <BiometricsSection
        height={height}
        weight={weight}
        setHeight={setHeight}
        setWeight={setWeight}
      />

      <AllergiesSection
        allergies={allergies}
        allergyInput={allergyInput}
        setAllergyInput={setAllergyInput}
        addAllergy={addAllergy}
        removeAllergy={removeAllergy}
      />

      <RiskFactorsSection
        riskInput={riskInput}
        riskFactors={riskFactors}
        setRiskInput={setRiskInput}
        addRiskFactor={addRiskFactor}
        removeRiskFactor={removeRiskFactor}
      />

      <ConditionsSection
        conditions={conditions}
        backendConditions={backendConditions}
        isLoadingConditions={isLoadingConditions}
        addCondition={addCondition}
        removeCondition={removeCondition}
        updateCondition={updateCondition}
      />

      <MedicationsSection
        medications={medications}
        addMedication={addMedication}
        removeMedication={removeMedication}
        updateMedication={updateMedication}
      />

      <SurgicalHistorySection
        surgeries={surgeries}
        addSurgery={addSurgery}
        removeSurgery={removeSurgery}
        updateSurgery={updateSurgery}
      />

      <FamilyHistorySection
        familyHistory={familyHistory}
        conditions={backendConditions}
        addFamilyHistory={addFamilyHistory}
        removeFamilyHistory={removeFamilyHistory}
        updateFamilyHistory={updateFamilyHistory}
      />

      {/* Actualizado para usar la nueva estructura de props */}
      <PersonalHistorySection
        data={personalHistory}
        setData={setPersonalHistory}
      />

      <SummarySection
        summary={summary}
        setSummary={setSummary}
      />

      <div className="flex justify-end gap-3">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-5 py-3 border border-slate-200 rounded-xl font-semibold transition hover:bg-slate-50"
          >
            Cancelar
          </button>
        )}

        <button
          type="submit"
          disabled={createMedicalRecord.isPending}
          className="px-5 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {createMedicalRecord.isPending
            ? "Creando expediente..."
            : "Crear Expediente"}
        </button>
      </div>
    </form>
  );
};