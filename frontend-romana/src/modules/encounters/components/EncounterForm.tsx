import { useEffect } from "react";
import { useToast } from "@/shared/components/feedback/toast/ToastProvider";
import {
  Plus,
  Trash2,
  Pill,
  Activity,
  Stethoscope,
  FileText,
  ClipboardList,
  Eye,
} from "lucide-react";

import { useSaveEncounter } from "../hooks/useUpdateEncounter";
import { useEncounterForm } from "../hooks/useEncounterForm";
import { DIAGNOSTICO_TIPO } from "../dtos/encounter.dto";
import { Cie10Autocomplete } from "./Cie10Autocomplete";

interface EncounterFormProps {
  appointment: any;
  onCancel: () => void;
  encounter?: any;
  mode?: "create" | "edit";
}

export const EncounterForm = ({
  appointment,
  onCancel,
  encounter,
  mode = "create",
}: EncounterFormProps) => {
  const { showToast } = useToast();
  const saveEncounter = useSaveEncounter();

  const { form, interrogatorio, diagnosticos, exploracion, recetas } =
    useEncounterForm(encounter);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue, // <- Agrega esto
    watch,
  } = form;
  const isPending = saveEncounter.isPending;

  // =========================
  // CARGAR DATOS EN MODO EDICIÓN
  // =========================
  useEffect(() => {
    if (mode === "edit" && encounter) {
      // 1. Formatear las fechas de las recetas para que los inputs type="date" las reconozcan (YYYY-MM-DD)
      const formattedPrescriptions =
        encounter.prescriptions?.map((p: any) => ({
          ...p,
          fechaInicio: p.fechaInicio
            ? new Date(p.fechaInicio).toISOString().split("T")[0]
            : "",
          fechaFin: p.fechaFin
            ? new Date(p.fechaFin).toISOString().split("T")[0]
            : "",
        })) || [];

      // 2. Insertar los datos en el react-hook-form
      reset({
        symptoms: encounter.symptoms || "",
        notes: encounter.notes || "",
        signosVitales: encounter.signosVitales || undefined,
        interrogatorioAparatosSistemas:
          encounter.interrogatorioAparatosSistemas || [],
        exploracionFisica: encounter.exploracionFisica || [],
        integracionDiagnostica: encounter.integracionDiagnostica || [],
        prescriptions: formattedPrescriptions,
      });
    }
  }, [encounter, mode, reset]);

  // =========================
  // GUARDAR / ACTUALIZAR
  // =========================
  const onSubmit = (data: any) => {
    if (!data.symptoms.trim()) {
      showToast("El motivo de consulta / síntomas es obligatorio", "error");
      return;
    }

    // Regresar las fechas al formato ISO para el backend
    const formattedPrescriptions = data.prescriptions.map((p: any) => ({
      ...p,
      fechaInicio: p.fechaInicio
        ? new Date(`${p.fechaInicio}T00:00:00.000Z`).toISOString()
        : undefined,
      fechaFin: p.fechaFin
        ? new Date(`${p.fechaFin}T00:00:00.000Z`).toISOString()
        : undefined,
    }));

    const encounterData = {
      patientId: appointment.patientId,
      medicId: appointment.medicId,
      appointmentId: appointment.id,
      ...data,
      prescriptions: formattedPrescriptions,
    };

    saveEncounter.mutate(
      {
        id: mode === "edit" ? encounter?.id || encounter?._id : undefined,
        data: encounterData,
      },
      {
        onSuccess: () => {
          showToast(
            mode === "edit"
              ? "Nota clínica actualizada con éxito"
              : "Nota clínica guardada con éxito",
            "success",
          );
          onCancel();
        },
        onError: (err: any) => {
          showToast(
            err?.response?.data?.message || "Error al procesar la nota clínica",
            "error",
          );
        },
      },
    );
  };

  // Clases CSS compartidas
  const sectionHeaderClass =
    "flex items-center justify-between border-b border-slate-200 pb-2 mb-4";
  const sectionTitleClass =
    "flex items-center gap-2 text-md font-bold text-slate-800";
  const labelClass = "text-xs font-semibold text-slate-600 mb-1 ml-1";
  const inputClass =
    "w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-indigo-400 focus:bg-white transition-colors";
  const btnAddClass =
    "flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg transition-colors";

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-8 max-h-[80vh] overflow-y-auto pr-2"
    >
      {/* ========================= */}
      {/* MOTIVO DE CONSULTA */}
      {/* ========================= */}
      <div className="flex flex-col gap-3">
        <div className={sectionHeaderClass}>
          <div className={sectionTitleClass}>
            <FileText className="w-5 h-5 text-indigo-600" />
            <h4>Motivo de Consulta</h4>
          </div>
        </div>
        <div className="flex flex-col">
          <label className={labelClass}>Síntomas / Motivo principal *</label>
          <textarea
            {...register("symptoms", { required: true })}
            placeholder="Ej. Dolor abdominal de 3 días de evolución..."
            className={`${inputClass} resize-none h-20`}
          />
        </div>
        <div className="flex flex-col">
          <label className={labelClass}>Notas adicionales (Opcional)</label>
          <textarea
            {...register("notes")}
            placeholder="Observaciones generales..."
            className={`${inputClass} resize-none h-16`}
          />
        </div>
      </div>

      {/* ========================= */}
      {/* SIGNOS VITALES Y SOMATOMETRÍA */}
      {/* ========================= */}
      <div className="flex flex-col gap-3">
        <div className={sectionHeaderClass}>
          <div className={sectionTitleClass}>
            <Activity className="w-5 h-5 text-red-500" />
            <h4>Signos Vitales y Somatometría</h4>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-slate-50 p-4 border border-slate-200 rounded-2xl">
          <div className="flex flex-col">
            <label className={labelClass}>T.A. Sistólica (mmHg)</label>
            <input
              type="number"
              {...register("signosVitales.tensionArterial.sistolica", {
                valueAsNumber: true,
              })}
              className={inputClass}
            />
          </div>
          <div className="flex flex-col">
            <label className={labelClass}>T.A. Diastólica (mmHg)</label>
            <input
              type="number"
              {...register("signosVitales.tensionArterial.diastolica", {
                valueAsNumber: true,
              })}
              className={inputClass}
            />
          </div>
          <div className="flex flex-col">
            <label className={labelClass}>Frec. Cardíaca (lpm)</label>
            <input
              type="number"
              {...register("signosVitales.frecuenciaCardiaca.valor", {
                valueAsNumber: true,
              })}
              className={inputClass}
            />
          </div>
          <div className="flex flex-col">
            <label className={labelClass}>Frec. Respiratoria (rpm)</label>
            <input
              type="number"
              {...register("signosVitales.frecuenciaRespiratoria.valor", {
                valueAsNumber: true,
              })}
              className={inputClass}
            />
          </div>
          <div className="flex flex-col">
            <label className={labelClass}>Temperatura (°C)</label>
            <input
              type="number"
              step="0.1"
              {...register("signosVitales.temperatura.valor", {
                valueAsNumber: true,
              })}
              className={inputClass}
            />
          </div>
          <div className="flex flex-col">
            <label className={labelClass}>Talla / Estatura (cm)</label>
            <input
              type="number"
              {...register("signosVitales.talla.valor", {
                valueAsNumber: true,
              })}
              className={inputClass}
            />
          </div>
          <div className="flex flex-col col-span-2 gap-1">
            <label className={labelClass}>Peso Corporal</label>
            <div className="flex gap-2">
              <input
                type="number"
                step="0.1"
                placeholder="Valor"
                {...register("signosVitales.peso.valor", {
                  valueAsNumber: true,
                })}
                className={inputClass}
              />
              <select
                {...register("signosVitales.peso.unidad")}
                className={`${inputClass} max-w-[85px] bg-white cursor-pointer`}
              >
                <option value="kg">kg</option>
                <option value="lb">lb</option>
              </select>
            </div>
          </div>
          <div className="flex flex-col col-span-2 gap-1">
            <label className={labelClass}>Índice de Masa Corporal (IMC)</label>
            <div className="flex gap-2">
              <input
                type="number"
                step="0.01"
                placeholder="Valor"
                {...register("signosVitales.imc.valor", {
                  valueAsNumber: true,
                })}
                className={inputClass}
              />
              <input
                type="text"
                placeholder="Clasificación (Ej. Normal, Sobrepeso)"
                {...register("signosVitales.imc.clasificacion")}
                className={inputClass}
              />
            </div>
          </div>
          <div className="flex flex-col col-span-2 gap-1">
            <label className={labelClass}>Índice Cintura-Cadera (ICC)</label>
            <div className="flex gap-2">
              <input
                type="number"
                step="0.01"
                placeholder="Valor"
                {...register("signosVitales.icc.valor", {
                  valueAsNumber: true,
                })}
                className={inputClass}
              />
              <input
                type="text"
                placeholder="Clasificación"
                {...register("signosVitales.icc.clasificacion")}
                className={inputClass}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ========================= */}
      {/* INTERROGATORIO POR APARATOS Y SISTEMAS */}
      {/* ========================= */}
      <div className="flex flex-col gap-3">
        <div className={sectionHeaderClass}>
          <div className={sectionTitleClass}>
            <ClipboardList className="w-5 h-5 text-amber-600" />
            <h4>Interrogatorio (Aparatos y Sistemas)</h4>
          </div>
          <button
            type="button"
            onClick={() =>
              interrogatorio.append({
                system: "",
                normal: true,
                sintomas: "",
                notas: "",
              })
            }
            className={`${btnAddClass} text-amber-700 bg-amber-50 hover:bg-amber-100`}
          >
            <Plus className="w-3.5 h-3.5" /> Agregar Sistema
          </button>
        </div>
        <div className="flex flex-col gap-3">
          {interrogatorio.fields.map((field, index) => (
            <div
              key={field.id}
              className="border border-slate-200 p-4 rounded-xl bg-white grid grid-cols-1 md:grid-cols-2 gap-4 relative"
            >
              <button
                type="button"
                onClick={() => interrogatorio.remove(index)}
                className="absolute top-4 right-4 text-red-400 hover:text-red-600"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              <div className="pr-8 flex flex-col gap-1">
                <label className={labelClass}>Sistema interrogado</label>
                <input
                  {...register(
                    `interrogatorioAparatosSistemas.${index}.system` as const,
                    { required: true },
                  )}
                  placeholder="Ej. Respiratorio, Digestivo..."
                  className={inputClass}
                />
              </div>
              <div className="flex items-center gap-2 mt-4 md:mt-6">
                <input
                  type="checkbox"
                  {...register(
                    `interrogatorioAparatosSistemas.${index}.normal` as const,
                  )}
                  className="w-4 h-4 accent-indigo-600"
                />
                <span className="text-sm font-semibold text-slate-700">
                  Aparato / Sistema Normal
                </span>
              </div>
              <div className="md:col-span-2 flex flex-col gap-1">
                <label className={labelClass}>Síntomas reportados</label>
                <input
                  {...register(
                    `interrogatorioAparatosSistemas.${index}.sintomas` as const,
                  )}
                  placeholder="Síntomas referidos por el paciente..."
                  className={inputClass}
                />
              </div>
              <div className="md:col-span-2 flex flex-col gap-1">
                <label className={labelClass}>Notas adicionales</label>
                <textarea
                  {...register(
                    `interrogatorioAparatosSistemas.${index}.notas` as const,
                  )}
                  placeholder="Observaciones..."
                  className={`${inputClass} h-12 resize-none`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ========================= */}
      {/* EXPLORACIÓN FÍSICA */}
      {/* ========================= */}
      <div className="flex flex-col gap-3">
        <div className={sectionHeaderClass}>
          <div className={sectionTitleClass}>
            <Eye className="w-5 h-5 text-teal-600" />
            <h4>Exploración Física</h4>
          </div>
          <button
            type="button"
            onClick={() =>
              exploracion.append({
                sistema: "",
                normal: true,
                hallazgos: "",
                descripcion: "",
                observaciones: "",
              })
            }
            className={`${btnAddClass} text-teal-700 bg-teal-50 hover:bg-teal-100`}
          >
            <Plus className="w-3.5 h-3.5" /> Agregar Exploración
          </button>
        </div>
        <div className="flex flex-col gap-3">
          {exploracion.fields.map((field, index) => (
            <div
              key={field.id}
              className="border border-slate-200 p-4 rounded-xl bg-white grid grid-cols-1 md:grid-cols-2 gap-4 relative"
            >
              <button
                type="button"
                onClick={() => exploracion.remove(index)}
                className="absolute top-4 right-4 text-red-400 hover:text-red-600"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              <div className="pr-8 flex flex-col gap-1">
                <label className={labelClass}>Región o Sistema</label>
                <input
                  {...register(`exploracionFisica.${index}.sistema` as const, {
                    required: true,
                  })}
                  placeholder="Ej. Cabeza y cuello, Tórax..."
                  className={inputClass}
                />
              </div>
              <div className="flex items-center gap-2 mt-4 md:mt-6">
                <input
                  type="checkbox"
                  {...register(`exploracionFisica.${index}.normal` as const)}
                  className="w-4 h-4 accent-indigo-600"
                />
                <span className="text-sm font-semibold text-slate-700">
                  Exploración Normal
                </span>
              </div>
              <div className="md:col-span-2 flex flex-col gap-1">
                <label className={labelClass}>Hallazgos</label>
                <input
                  {...register(`exploracionFisica.${index}.hallazgos` as const)}
                  placeholder="Hallazgos principales..."
                  className={inputClass}
                />
              </div>
              <div className="flex flex-col gap-1 md:col-span-1">
                <label className={labelClass}>Descripción detallada</label>
                <textarea
                  {...register(
                    `exploracionFisica.${index}.descripcion` as const,
                  )}
                  placeholder="Describe lo explorado..."
                  className={`${inputClass} h-16 resize-none`}
                />
              </div>
              <div className="flex flex-col gap-1 md:col-span-1">
                <label className={labelClass}>Observaciones</label>
                <textarea
                  {...register(
                    `exploracionFisica.${index}.observaciones` as const,
                  )}
                  placeholder="Notas clínicas extra..."
                  className={`${inputClass} h-16 resize-none`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ========================= */}
      {/* INTEGRACIÓN DIAGNÓSTICA */}
      {/* ========================= */}
      <div className="flex flex-col gap-3">
        <div className={sectionHeaderClass}>
          <div className={sectionTitleClass}>
            <Stethoscope className="w-5 h-5 text-emerald-600" />
            <h4>Integración Diagnóstica</h4>
          </div>
          <button
            type="button"
            onClick={() =>
              diagnosticos.append({
                diagnostico: "",
                cie10: "",
                tipo: DIAGNOSTICO_TIPO.PRESUNTIVO, // Corrección: asume el valor "presuntivo" y no la key "PRESUNTIVO"
                estado: "ACTIVO",
              })
            }
            className={`${btnAddClass} text-emerald-700 bg-emerald-50 hover:bg-emerald-100`}
          >
            <Plus className="w-3.5 h-3.5" /> Agregar Diagnóstico
          </button>
        </div>
        <div className="flex flex-col gap-3">
          {diagnosticos.fields.map((field, index) => (
            <div
              key={field.id}
              className="border border-slate-200 p-4 rounded-xl bg-white grid grid-cols-1 md:grid-cols-12 gap-3 relative"
            >
              <button
                type="button"
                onClick={() => diagnosticos.remove(index)}
                className="absolute top-4 right-4 text-red-400 hover:text-red-600"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              <div className="md:col-span-6 pr-6 flex flex-col gap-1">
                <label className={labelClass}>Diagnóstico</label>
                <textarea
                  {...register(
                    `integracionDiagnostica.${index}.diagnostico` as const,
                    { required: true },
                  )}
                  placeholder="Descripción de diagnostico"
                  className={inputClass}
                />
              </div>
              <div className="md:col-span-3 flex flex-col gap-1">
                <Cie10Autocomplete
                  index={index}
                  setValue={setValue}
                  watch={watch}
                  inputClass={inputClass}
                  labelClass={labelClass}
                />
              </div>
              <div className="md:col-span-3 flex flex-col gap-1">
                <label className={labelClass}>Tipo</label>
                <select
                  {...register(`integracionDiagnostica.${index}.tipo` as const)}
                  className={inputClass}
                >
                  {/* Corrección: Se extraen [key, value] para que el atributo 'value' apunte a "presuntivo" en vez de a todo el arreglo */}
                  {Object.entries(DIAGNOSTICO_TIPO).map(([key, value]) => (
                    <option key={key} value={value}>
                      {key}
                    </option>
                  ))}
                </select>
              </div>
              <div className="md:col-span-12 flex flex-col gap-1">
                <label className={labelClass}>Observaciones (opcional)</label>
                <input
                  {...register(
                    `integracionDiagnostica.${index}.observaciones` as const,
                  )}
                  placeholder="Notas..."
                  className={inputClass}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ========================= */}
      {/* TRATAMIENTO Y RECETA */}
      {/* ========================= */}
      <div className="flex flex-col gap-3">
        <div className={sectionHeaderClass}>
          <div className={sectionTitleClass}>
            <Pill className="w-5 h-5 text-blue-600" />
            <h4>Tratamiento y Receta</h4>
          </div>
          <button
            type="button"
            onClick={() =>
              recetas.append({
                nombre: "",
                tipo: "Medicamento",
                dosis: "",
                frecuencia: "",
                routeAdministration: "oral",
                fechaInicio: new Date().toISOString().split("T")[0],
                fechaFin: "",
              })
            }
            className={`${btnAddClass} text-blue-700 bg-blue-50 hover:bg-blue-100`}
          >
            <Plus className="w-3.5 h-3.5" /> Agregar Fármaco
          </button>
        </div>
        <div className="flex flex-col gap-3">
          {recetas.fields.map((field, index) => (
            <div
              key={field.id}
              className="border border-slate-200 p-4 rounded-xl bg-white grid grid-cols-1 md:grid-cols-2 gap-4 relative"
            >
              <button
                type="button"
                onClick={() => recetas.remove(index)}
                className="absolute top-4 right-4 text-red-400 hover:text-red-600"
              >
                <Trash2 className="w-4 h-4" />
              </button>

              <div className="pr-6 flex flex-col gap-1">
                <label className={labelClass}>Medicamento</label>
                <input
                  {...register(`prescriptions.${index}.nombre` as const, {
                    required: true,
                  })}
                  placeholder="Nombre comercial/genérico"
                  className={inputClass}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className={labelClass}>Dosis y Unidad</label>
                <input
                  {...register(`prescriptions.${index}.dosis` as const, {
                    required: true,
                  })}
                  placeholder="Ej. 500mg, 1 tableta..."
                  className={inputClass}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label className={labelClass}>Frecuencia</label>
                  <input
                    {...register(`prescriptions.${index}.frecuencia` as const, {
                      required: true,
                    })}
                    placeholder="Ej. Cada 8 horas"
                    className={inputClass}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className={labelClass}>Vía Adm.</label>
                  <select
                    {...register(
                      `prescriptions.${index}.routeAdministration` as const,
                    )}
                    className={inputClass}
                  >
                    <option value="oral">Oral</option>
                    <option value="intravenosa">Intravenosa</option>
                    <option value="intramuscular">Intramuscular</option>
                    <option value="subcutanea">Subcutánea</option>
                    <option value="topica">Tópica</option>
                    <option value="otra">Otra</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label className={labelClass}>Fecha Inicio</label>
                  <input
                    type="date"
                    {...register(
                      `prescriptions.${index}.fechaInicio` as const,
                      { required: true },
                    )}
                    className={inputClass}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className={labelClass}>Fecha Fin</label>
                  <input
                    type="date"
                    {...register(`prescriptions.${index}.fechaFin` as const, {
                      required: true,
                    })}
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="md:col-span-2 flex flex-col gap-1">
                <label className={labelClass}>Indicaciones Especiales</label>
                <textarea
                  {...register(`prescriptions.${index}.indicacion` as const)}
                  placeholder="Ej. Tomar junto con los alimentos..."
                  className={`${inputClass} resize-none h-12`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ========================= */}
      {/* BOTONES DE ACCIÓN */}
      {/* ========================= */}
      <div className="flex justify-end gap-3 border-t border-slate-200 pt-6 sticky bottom-0 bg-white pb-2 mt-2 z-10">
        <button
          type="button"
          onClick={onCancel}
          disabled={isPending}
          className="px-5 py-2.5 text-sm font-semibold text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl transition-colors"
        >
          Cancelar
        </button>

        <button
          type="submit"
          disabled={isPending}
          className="px-6 py-2.5 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 rounded-xl transition-colors shadow-sm"
        >
          {isPending
            ? mode === "edit"
              ? "Actualizando..."
              : "Guardando..."
            : mode === "edit"
              ? "Actualizar Nota Clínica"
              : "Guardar Nota Clínica"}
        </button>
      </div>
    </form>
  );
};
