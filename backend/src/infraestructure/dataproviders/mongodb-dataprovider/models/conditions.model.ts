import { Schema, model, Document } from "mongoose";

export interface ConditionDocument extends Document {
  code: string;

  name: string;

  category: string;

  description?: string;

  isChronic: boolean;

  isActive: boolean;
}

const ConditionSchema = new Schema<ConditionDocument>(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      uppercase: true,
      index: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },

    category: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },

    description: {
      type: String,
      trim: true,
      default: "",
    },

    isChronic: {
      type: Boolean,
      required: true,
      default: false,
    },

    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

// ==========================
// INDEXES
// ==========================

// Búsqueda rápida por nombre
ConditionSchema.index({
  name: "text",
  code: "text",
  category: "text",
});

// ==========================
// MODEL
// ==========================

export const ConditionModel = model<ConditionDocument>(
  "Conditions",
  ConditionSchema,
);