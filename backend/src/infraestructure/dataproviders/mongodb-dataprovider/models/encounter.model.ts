import { Schema, model, HydratedDocument, InferSchemaType } from 'mongoose';
import { DIAGNOSTICO_TIPO } from '../../../../core/domain/types/diagnosticoTipo.type';

/* -----------------------------
   UNIT CATALOG (control central)
------------------------------*/

const UNIDADES = {
  presion: ['mmHg'],
  temperatura: ['°C'],
  frecuencia: ['lpm'],
  peso: ['kg', 'lb'],
  talla: ['cm'],
} as const;

/* -----------------------------
   Subschemas
------------------------------*/

const InterrogatorioSistemaSchema = new Schema(
  {
    system: { type: String, required: true },
    normal: { type: Boolean, required: true },

    // FIX: no puede ser array si es string
    sintomas: { type: String, default: '' },

    notas: { type: String },
  },
  { _id: false },
);

const SignosVitalesSchema = new Schema(
  {
    tensionArterial: {
      sistolica: { type: Number, required: true },
      diastolica: { type: Number, required: true },

      unidad: {
        type: String,
        required: true,
        enum: UNIDADES.presion,
      },
    },

    temperatura: {
      valor: { type: Number, required: true },
      unidad: {
        type: String,
        required: true,
        enum: UNIDADES.temperatura,
      },
    },

    frecuenciaCardiaca: {
      valor: { type: Number, required: true },
      unidad: {
        type: String,
        required: true,
        enum: UNIDADES.frecuencia,
      },
    },

    frecuenciaRespiratoria: {
      valor: { type: Number, required: true },
      unidad: {
        type: String,
        required: true,
        enum: ['rpm'],
      },
    },

    peso: {
      valor: { type: Number, required: true },
      unidad: {
        type: String,
        required: true,
        enum: UNIDADES.peso,
      },
    },

    talla: {
      valor: { type: Number, required: true },
      unidad: {
        type: String,
        required: true,
        enum: UNIDADES.talla,
      },
    },

    imc: {
      valor: { type: Number, required: true },
      clasificacion: { type: String, required: true },
    },

    icc: {
      valor: { type: Number, required: true },
      clasificacion: { type: String, required: true },
    },
  },
  { _id: false },
);

const IntegracionDiagnosticaSchema = new Schema(
  {
    conditionId: {
      type: Schema.Types.ObjectId,
      ref: 'Condition',
    },

    diagnostico: {
      type: String,
      required: true,
    },
    cie10: { type: String, required: true },

    tipo: { type: String, required: true, enum: DIAGNOSTICO_TIPO },
    estado: { type: String, required: true },

    principal: { type: Boolean, default: false },

    fechaDiagnostico: { type: Date, default: Date.now },

    observaciones: { type: String },
  },
  { _id: false },
);

const ExploracionFisicaSchema = new Schema(
  {
    sistema: { type: String, required: true },
    normal: { type: Boolean, required: true },

    hallazgos: { type: String, default: '' },

    descripcion: { type: String },
    observaciones: { type: String },
  },
  { _id: false },
);

const TratamientoPrevioSchema = new Schema(
  {
    nombre: { type: String, required: true },
    tipo: { type: String, required: true },

    dosis: { type: String, required: true },
    frecuencia: { type: String, required: true },

    routeAdministration: { type: String, required: true },

    fechaInicio: { type: Date, required: true },
    fechaFin: { type: Date, required: true },

    duracion: { type: String },
    indicacion: { type: String },

    respuestaTratamiento: { type: String },

    // FIX: debe ser array
    efectosAdversos: { type: [String], default: [] },

    suspendido: { type: Boolean, default: false },
    motivoSuspension: { type: String },

    observaciones: { type: String },
  },
  { _id: false },
);

/* -----------------------------
   Main Schema
------------------------------*/

const encounterSchema = new Schema(
  {
    patientId: {
      type: Schema.Types.ObjectId,
      ref: 'Patient',
      required: true,
    },

    medicId: {
      type: Schema.Types.ObjectId,
      ref: 'Medic',
      required: true,
    },

    appointmentId: {
      type: Schema.Types.ObjectId,
      ref: 'Appointment',
      required: true,
      // unique: true,
    },

    symptoms: {
      type: String,
      required: true,
    },

    notes: {
      type: String,
    },

    interrogatorioAparatosSistemas: {
      type: [InterrogatorioSistemaSchema],
      default: [],
    },

    signosVitales: {
      type: SignosVitalesSchema,
      required: true,
    },

    integracionDiagnostica: {
      type: [IntegracionDiagnosticaSchema],
      default: [],
    },

    exploracionFisica: {
      type: [ExploracionFisicaSchema],
      default: [],
    },

    prescriptions: {
      type: [TratamientoPrevioSchema],
      default: [],
    },
  },
  { timestamps: true },
);

/* -----------------------------
   Indexes
------------------------------*/

encounterSchema.index({ patientId: 1 });
encounterSchema.index({ medicId: 1 });
encounterSchema.index({ appointmentId: 1 }, { unique: true });

/* -----------------------------
   Types
------------------------------*/

export type EncounterSchemaType = InferSchemaType<typeof encounterSchema>;
export type encounterDocument = HydratedDocument<EncounterSchemaType>;

export const encounterModel = model<EncounterSchemaType>(
  'Encounter',
  encounterSchema,
);
