import {
  Schema,
  Types,
  model,
  HydratedDocument,
} from "mongoose";

import { CreateMedicalRecordDTO } from "../../../../core/domain/dtos/medicalRecord.dto";
import { ROUTE_ADMINISTRATION_VALUES } from "../../../../core/domain/types/routeAdministration.type";


/* -------------------------------------------------------------------------- */
/*                            CURRENT CONDITIONS                              */
/* -------------------------------------------------------------------------- */

const currentConditionSchema = new Schema(
  {
    conditionId: {
      type: Types.ObjectId,
      ref: "Conditions",

      required: [true, "A disease must be specified"],
    },

    since: {
      type: Date,

      required: [true, "Must specify an approximate date"],
    },

    diagnosedBy: String,
  },
  { _id: false },
);

/* -------------------------------------------------------------------------- */
/*                                   DOSAGE                                   */
/* -------------------------------------------------------------------------- */

const dosageSchema = new Schema(
  {
    amount: {
      type: Number,

      required: true,

      min: [1, "Too low dosage"],
    },

    unit: {
      type: String,

      required: true,
    },
  },
  { _id: false },
);

/* -------------------------------------------------------------------------- */
/*                                 FREQUENCY                                  */
/* -------------------------------------------------------------------------- */

const frequencySchema = new Schema(
  {
    timesPerDay: {
      type: Number,

      required: true,

      min: [1, "Minimum 1 time per day"],

      max: [24, "Too many times per day"],
    },
  },
  { _id: false },
);

/* -------------------------------------------------------------------------- */
/*                             SURGICAL HISTORY                               */
/* -------------------------------------------------------------------------- */

const surgeryRecordSchema = new Schema(
  {
    surgeryName: {
      type: String,

      required: true,
    },

    surgeryDate: {
      type: Date,

      required: true,
    },
  },
  { _id: false },
);

/* -------------------------------------------------------------------------- */
/*                              FAMILY HISTORY                                */
/* -------------------------------------------------------------------------- */

const familyHistorySchema = new Schema(
  {
    relationship: {
      type: String,

      enum: [
        "madre",
        "padre",
        "abuelo",
        "abuela",
        "hermano",
        "hermana",
      ],

      required: true,
    },

    diseaseId: {
      type: Types.ObjectId,

      ref: "Conditions",

      required: [true, "A disease must be specified"],
    },
  },
  { _id: false },
);

/* -------------------------------------------------------------------------- */
/*                           CHRONIC MEDICATIONS                              */
/* -------------------------------------------------------------------------- */

const chronicMedicationSchema = new Schema(
  {
    medicationName: {
      type: String,

      required: [true, "A medication name must be specified"],
    },

    routeAdministration: {
      type: String,

      enum: Object.values(
        ROUTE_ADMINISTRATION_VALUES,
      ),

      required: true,
    },

    dosage: {
      type: dosageSchema,

      required: true,
    },

    frequency: {
      type: frequencySchema,

      required: true,
    },

    startedAt: {
      type: Date,

      required: [true, "Must specify approximate start date"],
    },
  },
  { _id: false },
);

/* -------------------------------------------------------------------------- */
/*                  ANTECEDENTES PERSONALES PATOLOGICOS                       */
/* -------------------------------------------------------------------------- */

const consumoSchema = new Schema(
  {
    consume: Boolean,

    frecuencia: String,

    cantidad: String,

    tiempoConsumo: String,

    fechaUltimoConsumo: String,

    observaciones: String,
  },
  { _id: false },
);

const toxicomaniasSchema = new Schema(
  {
    consume: Boolean,

    sustancias: [String],

    frecuencia: String,

    tiempoConsumo: String,

    fechaUltimoConsumo: String,

    observaciones: String,
  },
  { _id: false },
);

const quirurgicoSchema = new Schema(
  {
    procedimiento: String,

    fecha: String,

    hospital: String,

    complicaciones: String,

    observaciones: String,
  },
  { _id: false },
);

const hemotransfusionesSchema = new Schema(
  {
    haRecibido: Boolean,

    cantidad: Number,

    fechaUltima: String,

    motivo: String,

    reaccionesAdversas: Boolean,

    observaciones: String,
  },
  { _id: false },
);

const fracturaSchema = new Schema(
  {
    hueso: String,

    fecha: String,

    causa: String,

    tratamiento: String,

    secuelas: String,

    observaciones: String,
  },
  { _id: false },
);

const infectocontagiosaSchema = new Schema(
  {
    enfermedad: String,

    fechaDiagnostico: String,

    tratamiento: String,

    secuelas: String,

    observaciones: String,
  },
  { _id: false },
);

const hospitalizacionSchema = new Schema(
  {
    motivo: String,

    hospital: String,

    fechaIngreso: String,

    fechaEgreso: String,

    tratamiento: String,

    observaciones: String,
  },
  { _id: false },
);

const cronicoDegenerativoSchema = new Schema(
  {
    enfermedad: String,

    fechaDiagnostico: String,

    tratamientoActual: String,

    controlada: Boolean,

    observaciones: String,
  },
  { _id: false },
);

const antecedentesPersonalesPatologicosSchema =
  new Schema(
    {
      tabaquismo: consumoSchema,

      alcoholismo: consumoSchema,

      toxicomanias: toxicomaniasSchema,

      quirurgicos: [quirurgicoSchema],

      hemotransfusiones:
        hemotransfusionesSchema,

      fracturas: [fracturaSchema],

      infectocontagiosas: [
        infectocontagiosaSchema,
      ],

      hospitalizacionesPrevias: [
        hospitalizacionSchema,
      ],

      cronicoDegenerativo: [
        cronicoDegenerativoSchema,
      ],
    },
    { _id: false },
  );

/* -------------------------------------------------------------------------- */
/*                 ANTECEDENTES GINECO OBSTETRICOS                            */
/* -------------------------------------------------------------------------- */

const antecedentesGinecoObstetricosSchema =
  new Schema(
    {
      menarca: {
        edad: Number,

        observaciones: String,
      },

      fum: {
        fecha: String,

        ciclosRegulares: Boolean,

        duracionCicloDias: Number,

        observaciones: String,
      },

      inicioVidaSexualActiva: {
        edad: Number,

        observaciones: String,
      },

      gestas: {
        embarazos: Number,

        partos: Number,

        cesareas: Number,

        abortos: Number,

        hijosVivos: Number,

        observaciones: String,
      },

      metodoPlanificacionFamiliar: {
        usaMetodo: Boolean,

        metodo: String,

        tiempoUso: String,

        observaciones: String,
      },
    },
    { _id: false },
  );

/* -------------------------------------------------------------------------- */
/*                              MEDICAL RECORD                                */
/* -------------------------------------------------------------------------- */

const medicalRecordSchema = new Schema(
  {
    patientId: {
      type: Types.ObjectId,

      ref: "Patient",

      required: [
        true,
        "A medical record must belong to a patient",
      ],
    },

    allergies: [
      {
        type: String,
      },
    ],

    height: {
      type: Number,

      required: [true, "Height must be specified"],

      min: [0.15, "Height too low"],
    },

    weight: {
      type: Number,

      required: [true, "Weight must be specified"],

      min: [1, "Weight too low"],
    },

    currentConditions: [
      currentConditionSchema,
    ],

    chronicMedications: [
      chronicMedicationSchema,
    ],

    riskFactors: [String],

    surgicalHistory: [
      surgeryRecordSchema,
    ],

    familyHistory: [
      familyHistorySchema,
    ],

    antecedentesPersonalesPatologicos: {
      type:
        antecedentesPersonalesPatologicosSchema,

      required: true,
    },

    antecedentesGinecoObstetricos: {
      type:
        antecedentesGinecoObstetricosSchema,
    },

    summary: String,
  },
  {
    timestamps: true,
  },
);

medicalRecordSchema.index(
  { patientId: 1 },
  { unique: true },
);

export type medicalRecordDocument =
  HydratedDocument<CreateMedicalRecordDTO>;

export default model<CreateMedicalRecordDTO>(
  "MedicalRecord",
  medicalRecordSchema,
);