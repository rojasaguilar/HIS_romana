import { Pill, Plus, Trash2 } from "lucide-react";

// Asegúrate de que la ruta de importación coincida con tu estructura de archivos
import { 
  ROUTE_ADMINISTRATION_VALUES, 
  type RouteAdministration 
} from "../../types/medical-record.types";

export interface MedicationInput {
  medicationName: string;
  routeAdministration: RouteAdministration | string;
  amount: string; // Se mapeará a dosage.amount en el submit
  unit: string;   // Se mapeará a dosage.unit en el submit
  timesPerDay: string; // Se mapeará a frequency.timesPerDay en el submit
  startedAt: string; // Se mapeará a Date en el submit
}

interface Props {
  medications: MedicationInput[];
  addMedication: () => void;
  removeMedication: (index: number) => void;
  updateMedication: (
    index: number,
    field: keyof MedicationInput,
    value: string,
  ) => void;
}

export const MedicationsSection = ({
  medications,
  addMedication,
  removeMedication,
  updateMedication,
}: Props) => {
  // Función auxiliar para capitalizar la primera letra en las opciones del select
  const formatRouteLabel = (route: string) => {
    return route.charAt(0).toUpperCase() + route.slice(1);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <Pill className="w-5 h-5 text-indigo-600" />
          <h3 className="font-bold text-slate-900">
            Medicación Crónica
          </h3>
        </div>

        <button
          type="button"
          onClick={addMedication}
          className="px-3 py-2 bg-indigo-100 text-indigo-700 hover:bg-indigo-200 transition rounded-xl text-sm font-semibold flex items-center gap-1"
        >
          <Plus className="w-4 h-4" />
          Agregar
        </button>
      </div>

      <div className="flex flex-col gap-4">
        {medications.map((med, index) => (
          <div
            key={index}
            className="grid grid-cols-1 md:grid-cols-6 gap-3 border border-slate-200 rounded-xl p-4 bg-slate-50/50"
          >
            <input
              type="text"
              placeholder="Medicamento"
              value={med.medicationName}
              onChange={(e) =>
                updateMedication(
                  index,
                  "medicationName",
                  e.target.value,
                )
              }
              className="px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-slate-400"
            />

            <select
              value={med.routeAdministration}
              onChange={(e) =>
                updateMedication(
                  index,
                  "routeAdministration",
                  e.target.value,
                )
              }
              className="px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-slate-400 bg-white"
            >
              {Object.values(ROUTE_ADMINISTRATION_VALUES).map((route) => (
                <option key={route} value={route}>
                  {formatRouteLabel(route)}
                </option>
              ))}
            </select>

            <input
              type="number"
              placeholder="Cantidad"
              min="0"
              step="any"
              value={med.amount}
              onChange={(e) =>
                updateMedication(index, "amount", e.target.value)
              }
              className="px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-slate-400"
            />

            <input
              type="text"
              placeholder="Unidad (ej. mg)"
              value={med.unit}
              onChange={(e) =>
                updateMedication(index, "unit", e.target.value)
              }
              className="px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-slate-400"
            />

            <input
              type="number"
              placeholder="Veces al día"
              min="0"
              value={med.timesPerDay}
              onChange={(e) =>
                updateMedication(index, "timesPerDay", e.target.value)
              }
              className="px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-slate-400"
            />

            <div className="flex gap-2">
              <input
                type="date"
                value={med.startedAt}
                onChange={(e) =>
                  updateMedication(index, "startedAt", e.target.value)
                }
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-slate-400"
              />

              <button
                type="button"
                onClick={() => removeMedication(index)}
                className="px-3 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl transition"
                title="Eliminar medicamento"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
        
        {medications.length === 0 && (
          <p className="text-center text-sm text-slate-500 py-4">
            No hay medicamentos registrados. Haz clic en "Agregar" para comenzar.
          </p>
        )}
      </div>
    </div>
  );
};