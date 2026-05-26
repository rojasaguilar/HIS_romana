import { Activity } from "lucide-react";

interface Props {
  height: string;
  weight: string;
  setHeight: (value: string) => void;
  setWeight: (value: string) => void;
}

export const BiometricsSection = ({
  height,
  weight,
  setHeight,
  setWeight,
}: Props) => {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6">
      <div className="flex items-center gap-2 mb-5">
        <Activity className="w-5 h-5 text-indigo-600" />
        <h3 className="font-bold text-slate-900">Biometría</h3>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <input
          type="number"
          placeholder="Altura"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          className="px-4 py-3 rounded-xl border border-slate-200"
        />

        <input
          type="number"
          placeholder="Peso"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          className="px-4 py-3 rounded-xl border border-slate-200"
        />
      </div>
    </div>
  );
};