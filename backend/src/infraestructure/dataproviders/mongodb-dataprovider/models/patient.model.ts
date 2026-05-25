import { Schema, model, Types } from 'mongoose';

import { ESTADO_CIVIL } from '../../../../core/domain/types/martialStatus.type';

import { BLOOD_TYPE } from '../../../../core/domain/types/blood.type';
import { PatientPersistence } from '../../../../core/domain/dtos/patient.dto';
import { HydratedDocument } from 'mongoose';

const addressSchema = new Schema(
  {
    street: {
      type: String,
      required: true,
      trim: true,
    },

    number: {
      type: String,
      required: true,
      trim: true,
    },

    city: {
      type: String,
      required: true,
      trim: true,
    },

    state: {
      type: String,
      required: true,
      trim: true,
    },

    zipCode: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { _id: false },
);

const emergencyContactSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
    },

    phoneNumber: {
      type: String,
      trim: true,
    },

    relationship: {
      type: String,
      trim: true,
    },
  },
  { _id: false },
);

const patientSchema = new Schema<PatientPersistence>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    phoneNumber: {
      type: String,
      required: true,
      trim: true,
    },

    address: { type: addressSchema, required: true },

    birthDate: {
      type: String,
      required: true,
    },

    allergies: [
      {
        type: String,
        trim: true,
      },
    ],

    sex: {
      type: String,
      enum: ['F', 'M'],
      required: true,
    },

    maritalStatus: {
      type: String,
      enum: Object.values(ESTADO_CIVIL),
      required: true,
    },

    nationality: {
      type: String,
      required: true,
      trim: true,
    },

    bloodType: {
      type: String,
      enum: Object.values(BLOOD_TYPE),
      required: true,
    },

    emergencyContact: { type: emergencyContactSchema },

    ethnicity: {
      type: String,
      trim: true,
    },

    legalGuardian: {
      name: {
        type: String,
        trim: true,
      },

      relationship: {
        type: String,
        trim: true,
      },
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

patientSchema.index({ email: 1 }, { unique: true });

export type PatientDocument = HydratedDocument<PatientPersistence>;

export const PatientModel = model<PatientPersistence>('Patient', patientSchema);
