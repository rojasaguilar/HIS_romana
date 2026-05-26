import { Users, Plus, Trash2 } from "lucide-react";

interface FamilyHistoryInput {
  relationship: string;
  diseaseId: string;
}

interface Condition {
  id: string;
  code: string;
  name: string;
}

interface Props {
  familyHistory: FamilyHistoryInput[];
  conditions: Condition[];
  addFamilyHistory: () => void;
  removeFamilyHistory: (index: number) => void;
  updateFamilyHistory: (
    index: number,
    field: keyof FamilyHistoryInput,
    value: string,
  ) => void;
}

export const FamilyHistorySection = ({
  familyHistory,
  conditions,
  addFamilyHistory,
  removeFamilyHistory,
  updateFamilyHistory,
}: Props) => {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-cyan-700" />
          <h3 className="font-bold text-slate-900">
            Antecedentes Heredofamiliares
          </h3>
        </div>

        <button
          type="button"
          onClick={addFamilyHistory}
          className="px-3 py-2 bg-cyan-100 text-cyan-700 rounded-xl text-sm font-semibold flex items-center gap-1"
        >
          <Plus className="w-4 h-4" />
          Agregar
        </button>
      </div>

      <div className="flex flex-col gap-4">
        {familyHistory.map((fh, index) => (
          <div
            key={index}
            className="grid grid-cols-3 gap-3 border border-slate-200 rounded-xl p-4"
          >
            <select
              value={fh.relationship}
              onChange={(e) =>
                updateFamilyHistory(
                  index,
                  "relationship",
                  e.target.value,
                )
              }
              className="px-4 py-3 rounded-xl border border-slate-200"
            >
              <option value="">Parentesco</option>
              <option value="madre">Madre</option>
              <option value="padre">Padre</option>
              <option value="abuelo">Abuelo</option>
              <option value="abuela">Abuela</option>
              <option value="hermano">Hermano</option>
              <option value="hermana">Hermana</option>
            </select>

            <select
              value={fh.diseaseId}
              onChange={(e) =>
                updateFamilyHistory(index, "diseaseId", e.target.value)
              }
              className="px-4 py-3 rounded-xl border border-slate-200"
            >
              <option value="">Condición</option>

              {conditions.map((cond) => (
                <option key={cond.id} value={cond.id}>
                  {cond.code} - {cond.name}
                </option>
              ))}
            </select>

            <button
              type="button"
              onClick={() => removeFamilyHistory(index)}
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