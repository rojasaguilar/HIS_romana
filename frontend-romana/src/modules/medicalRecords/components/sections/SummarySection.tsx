// ===============================
// SummarySection.tsx
// ===============================

import { FileText } from "lucide-react";

interface Props {
  summary: string;
  setSummary: (value: string) => void;
}

export const SummarySection = ({
  summary,
  setSummary,
}: Props) => {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6">
      <div className="flex items-center gap-2 mb-5">
        <FileText className="w-5 h-5 text-slate-700" />

        <h3 className="font-bold text-slate-900">
          Resumen Clínico
        </h3>
      </div>

      <textarea
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
        placeholder="Resumen general del paciente..."
        className="w-full h-32 resize-none px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
    </div>
  );
};