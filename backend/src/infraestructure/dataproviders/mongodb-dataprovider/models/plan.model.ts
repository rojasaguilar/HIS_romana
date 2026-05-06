import { Schema, model, Document } from 'mongoose';

/**
 * Subdocumento: MonthlyVisit
 */
const MonthlyVisitSchema = new Schema(
  {
    service: {
      type: String,
      required: true,
      trim: true,
    },
    visits: {
      type: Number,
      required: true,
      min: 1,
    },
  },
  { _id: false },
);

/**
 * Subdocumento: Variant (antes PlanDescription)
 */
const VariantSchema = new Schema(
  {
    durationInMonths: {
      type: Number,
      required: true,
      min: 1,
    },
    price: {
      type: Number,
      required: true,
      min: 1,
    },
    monthlyVisitsIncluded: {
      type: [MonthlyVisitSchema],
      validate: {
        validator: function (v: any[]) {
          return v && v.length > 0;
        },
        message: 'Debe incluir al menos un servicio',
      },
    },
  },
  { _id: false },
);

/**
 * Documento principal: Plan
 */
export interface PlanDocument extends Document {
  name: string;
  description: string;
  isActive: boolean;
  variants: {
    durationInMonths: number;
    price: number;
    monthlyVisitsIncluded: {
      service: string;
      visits: number;
    }[];
  }[];
}

const PlanSchema = new Schema<PlanDocument>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: '',
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    variants: {
      type: [VariantSchema],
      validate: {
        validator: function (variants: any[]) {
          if (!variants || variants.length === 0) return false;

          const durations = new Set();
          for (const v of variants) {
            if (durations.has(v.durationInMonths)) return false;
            durations.add(v.durationInMonths);
          }

          return true;
        },
        message: 'Duraciones duplicadas o variantes inválidas',
      },
    },
  },
  {
    timestamps: true,
  },
);

export const PlanModel = model<PlanDocument>('Plan', PlanSchema);
