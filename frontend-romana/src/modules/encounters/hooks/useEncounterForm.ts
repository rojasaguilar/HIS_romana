import { useForm, useFieldArray } from "react-hook-form";
import type { EncounterFormValues } from "../types/encounter-form.types";

export const useEncounterForm = (encounter?: any) => {
  const form = useForm<EncounterFormValues>({
    defaultValues: {
      symptoms: encounter?.symptoms || "",
      notes: encounter?.notes || "",

      interrogatorioAparatosSistemas:
        encounter?.interrogatorioAparatosSistemas || [],

      signosVitales: encounter?.signosVitales || {
        tensionArterial: {
          sistolica: 0,
          diastolica: 0,
          unidad: "mmHg",
        },
        temperatura: { valor: 36.5, unidad: "°C" },
        frecuenciaCardiaca: { valor: 0, unidad: "lpm" },
        frecuenciaRespiratoria: { valor: 0, unidad: "rpm" },
        peso: { valor: 0, unidad: "kg" },
        talla: { valor: 0, unidad: "cm" },
        imc: { valor: 0, clasificacion: "" },
        icc: { valor: 0, clasificacion: "" },
      },

      integracionDiagnostica: encounter?.integracionDiagnostica || [],
      exploracionFisica: encounter?.exploracionFisica || [],
      prescriptions: encounter?.prescriptions || [],
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