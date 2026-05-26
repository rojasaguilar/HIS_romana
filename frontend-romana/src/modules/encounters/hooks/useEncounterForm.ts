import { useForm, useFieldArray } from "react-hook-form";
import type { EncounterFormValues } from "../types/encounter-form.types";

export const useEncounterForm = (encounter?: any) => {
  // 1. Pre-procesar las fechas de las recetas para que los inputs type="date" las lean (YYYY-MM-DD)
  const formattedPrescriptions = encounter?.prescriptions?.map((p: any) => ({
    ...p,
    fechaInicio: p.fechaInicio ? new Date(p.fechaInicio).toISOString().split("T")[0] : "",
    fechaFin: p.fechaFin ? new Date(p.fechaFin).toISOString().split("T")[0] : "",
  })) || [];

  const form = useForm<EncounterFormValues>({
    // 2. 'values' reacciona dinámicamente si el 'encounter' llega de forma asíncrona
    values: encounter ? {
      symptoms: encounter.symptoms || "",
      notes: encounter.notes || "",
      interrogatorioAparatosSistemas: encounter.interrogatorioAparatosSistemas || [],
      signosVitales: encounter.signosVitales || {
        tensionArterial: { sistolica: 0, diastolica: 0, unidad: "mmHg" },
        temperatura: { valor: 36.5, unidad: "°C" },
        frecuenciaCardiaca: { valor: 0, unidad: "lpm" },
        frecuenciaRespiratoria: { valor: 0, unidad: "rpm" },
        peso: { valor: 0, unidad: "kg" },
        talla: { valor: 0, unidad: "cm" },
        imc: { valor: 0, clasificacion: "" },
        icc: { valor: 0, clasificacion: "" },
      },
      integracionDiagnostica: encounter.integracionDiagnostica || [],
      exploracionFisica: encounter.exploracionFisica || [],
      prescriptions: formattedPrescriptions,
    } : undefined, // Si no hay encounter, usará los defaultValues de abajo

    // 3. defaultValues se usa solo para el montaje inicial vacío (Modo Crear)
    defaultValues: {
      symptoms: "",
      notes: "",
      interrogatorioAparatosSistemas: [],
      signosVitales: {
        tensionArterial: { sistolica: 0, diastolica: 0, unidad: "mmHg" },
        temperatura: { valor: 36.5, unidad: "°C" },
        frecuenciaCardiaca: { valor: 0, unidad: "lpm" },
        frecuenciaRespiratoria: { valor: 0, unidad: "rpm" },
        peso: { valor: 0, unidad: "kg" },
        talla: { valor: 0, unidad: "cm" },
        imc: { valor: 0, clasificacion: "" },
        icc: { valor: 0, clasificacion: "" },
      },
      integracionDiagnostica: [],
      exploracionFisica: [],
      prescriptions: [],
    },
  });

  const interrogatorio = useFieldArray({
    control: form.control,
    name: "interrogatorioAparatosSistemas",
  });

  const diagnosticos = useFieldArray({
    control: form.control,
    name: "integracionDiagnostica",
  });

  const exploracion = useFieldArray({
    control: form.control,
    name: "exploracionFisica",
  });

  const recetas = useFieldArray({
    control: form.control,
    name: "prescriptions",
  });

  return {
    form,
    interrogatorio,
    diagnosticos,
    exploracion,
    recetas,
  };
};