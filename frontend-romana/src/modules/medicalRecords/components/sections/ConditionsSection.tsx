// ===============================
// ConditionsSection.tsx
// ===============================

import { HeartPulse, Plus, Trash2 } from "lucide-react";

interface ConditionInput {
  conditionId: string;
  since: string;
  diagnosedBy: string;
}

interface Condition {
  id: string;
  code: string;
  name: string;
}

interface Props {
  conditions: ConditionInput[];
  backendConditions: Condition[];
  isLoadingConditions: boolean;

  addCondition: () => void;

  removeCondition: (index: number) => void;

  updateCondition: (
    index: number,
    field: keyof ConditionInput,
    value: string,
  ) => void;
}

export const ConditionsSection = ({
  conditions,
  backendConditions,
  isLoadingConditions,
  addCondition,
  removeCondition,
  updateCondition,
}: Props) => {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <HeartPulse className="w-5 h-5 text-pink-600" />

          <h3 className="font-bold text-slate-900">
            Condiciones Actuales
          </h3>
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
            className="grid grid-cols-1 md:grid-cols-4 gap-3 border border-slate-200 rounded-xl p-4"
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
              value={condition.since}
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
  );
};