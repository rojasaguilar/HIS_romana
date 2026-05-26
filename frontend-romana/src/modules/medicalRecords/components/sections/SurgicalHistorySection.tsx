import { Scissors, Plus, Trash2 } from "lucide-react";

interface SurgeryInput {
  surgeryName: string;
  surgeryDate: string;
}

interface Props {
  surgeries: SurgeryInput[];
  addSurgery: () => void;
  removeSurgery: (index: number) => void;
  updateSurgery: (
    index: number,
    field: keyof SurgeryInput,
    value: string,
  ) => void;
}

export const SurgicalHistorySection = ({
  surgeries,
  addSurgery,
  removeSurgery,
  updateSurgery,
}: Props) => {
  return (
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
              placeholder="Nombre cirugía"
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
  );
};