import { AlertTriangle, Plus, Trash2 } from "lucide-react";

interface Props {
  riskInput: string;
  setRiskInput: (value: string) => void;
  riskFactors: string[];
  addRiskFactor: () => void;
  removeRiskFactor: (index: number) => void;
}

export const RiskFactorsSection = ({
  riskInput,
  setRiskInput,
  riskFactors,
  addRiskFactor,
  removeRiskFactor,
}: Props) => {
  return (
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
          placeholder="Ej. Sedentarismo"
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
  );
};