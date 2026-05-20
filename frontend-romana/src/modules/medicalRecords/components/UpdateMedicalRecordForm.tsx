import { useState } from "react";
import { useUpdateMedicalRecord } from "../hooks/useMedicalRecord";
import { useToast } from "@/shared/components/feedback/toast/ToastProvider";
import { Save, Ruler, Scale, AlertTriangle, FileText } from "lucide-react";

interface UpdateMedicalRecordFormProps {
  medicalRecord: any; // O usa tu tipo explícito si lo tienes, ej: MedicalRecordDTO
  onSuccess: () => void;
  onCancel: () => void;
}

export const UpdateMedicalRecordForm = ({
  medicalRecord,
  onSuccess,
  onCancel,
}: UpdateMedicalRecordFormProps) => {
  const { showToast } = useToast();
  
  // Invocamos el hook pasando el patientId para que sepa qué caché invalidar
  const updateMedicalRecord = useUpdateMedicalRecord(medicalRecord.patientId);

  // ESTADOS LOCALES HIDRATADOS CON LA DATA EXISTENTE
  const [height, setHeight] = useState<number | "">(medicalRecord.height || "");
  const [weight, setWeight] = useState<number | "">(medicalRecord.weight || "");
  const [summary, setSummary] = useState(medicalRecord.summary || "");
  
  // Convertimos los arrays a strings separados por comas para facilitar la edición
  const [allergies, setAllergies] = useState(
    medicalRecord.allergies?.join(", ") || ""
  );
  const [riskFactors, setRiskFactors] = useState(
    medicalRecord.riskFactors?.join(", ") || ""
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Parseamos los strings de vuelta a arrays limpios
    const parsedAllergies = allergies
      .split(",")
      .map((item) => item.trim())
      .filter((item) => item !== "");

    const parsedRiskFactors = riskFactors
      .split(",")
      .map((item) => item.trim())
      .filter((item) => item !== "");

    const updateData = {
      height: Number(height),
      weight: Number(weight),
      summary,
      allergies: parsedAllergies,
      riskFactors: parsedRiskFactors,
      // Si tienes arrays complejos como chronicMedications, aquí deberías 
      // mapearlos desde su propio estado local si decides agregarlos al form.
    };

    updateMedicalRecord.mutate(
      { id: medicalRecord.id, data: updateData },
      {
        onSuccess: () => {
          showToast("Expediente actualizado correctamente", "success");
          onSuccess(); // Cierra el formulario
        },
        onError: () => {
          showToast("Error al actualizar el expediente", "error");
        },
      }
    );
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      
      {/* BIOMETRÍA */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-1.5">
          <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
            <Ruler className="w-4 h-4 text-slate-400" /> Estatura (cm)
          </label>
          <input
            type="number"
            required
            min="0"
            step="0.1"
            value={height}
            onChange={(e) => setHeight(e.target.value === "" ? "" : Number(e.target.value))}
            placeholder="Ej. 175"
            className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-colors"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
            <Scale className="w-4 h-4 text-slate-400" /> Peso (kg)
          </label>
          <input
            type="number"
            required
            min="0"
            step="0.1"
            value={weight}
            onChange={(e) => setWeight(e.target.value === "" ? "" : Number(e.target.value))}
            placeholder="Ej. 70.5"
            className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-colors"
          />
        </div>
      </div>

      {/* ALERTAS Y RIESGOS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 p-5 rounded-xl border border-slate-100">
        <div className="flex flex-col gap-1.5">
          <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
            <AlertTriangle className="w-4 h-4 text-red-400" /> Alergias
          </label>
          <p className="text-xs text-slate-500 mb-1">Separa con comas (Ej. Penicilina, Nueces)</p>
          <textarea
            value={allergies}
            onChange={(e) => setAllergies(e.target.value)}
            className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-colors resize-none h-20"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
            <AlertTriangle className="w-4 h-4 text-orange-400" /> Factores de Riesgo
          </label>
          <p className="text-xs text-slate-500 mb-1">Separa con comas (Ej. Tabaquismo, Obesidad)</p>
          <textarea
            value={riskFactors}
            onChange={(e) => setRiskFactors(e.target.value)}
            className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-colors resize-none h-20"
          />
        </div>
      </div>

      {/* RESUMEN CLÍNICO */}
      <div className="flex flex-col gap-1.5">
        <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
          <FileText className="w-4 h-4 text-slate-400" /> Resumen Clínico General
        </label>
        <textarea
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          placeholder="Anotaciones generales del expediente..."
          className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-colors resize-none h-32"
        />
      </div>

      {/* ACCIONES */}
      <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
        <button
          type="button"
          onClick={onCancel}
          disabled={updateMedicalRecord.isPending}
          className="px-5 py-2.5 text-sm font-semibold text-slate-600 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors disabled:opacity-50"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={updateMedicalRecord.isPending}
          className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 transition-colors shadow-sm disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          {updateMedicalRecord.isPending ? "Guardando..." : "Guardar Cambios"}
        </button>
      </div>
    </form>
  );
};