import { AlertTriangle, Plus, Trash2 } from "lucide-react";

interface Props {
  allergies: string[];
  allergyInput: string;
  setAllergyInput: (value: string) => void;
  addAllergy: () => void;
  removeAllergy: (index: number) => void;
}

export const AllergiesSection = ({
  allergies,
  allergyInput,
  setAllergyInput,
  addAllergy,
  removeAllergy,
}: Props) => {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6">
      <div className="flex items-center gap-2 mb-5">
        <AlertTriangle className="w-5 h-5 text-red-500" />
        <h3 className="font-bold text-slate-900">Alergias</h3>
      </div>

      <div className="flex gap-2">
        <input
          value={allergyInput}
          onChange={(e) => setAllergyInput(e.target.value)}
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

            <button
              type="button"
              onClick={() => removeAllergy(i)}
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};