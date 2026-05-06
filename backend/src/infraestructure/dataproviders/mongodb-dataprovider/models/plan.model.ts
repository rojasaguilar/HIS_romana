import { Schema, model, Document, Types } from 'mongoose';

/**
 * Subdocumento: MonthlyVisit
 */
const MonthlyVisitSchema = new Schema(
  {
    serviceId: {
      type: Schema.Types.ObjectId,
      ref: 'Service',
      required: true,
      index: true, 
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
 * Subdocumento: Variant
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
          if (!v || v.length === 0) return false;

          // validar duplicados SOLO dentro del mismo variant
          const serviceIds = new Set(
            v.map((item) => item.serviceId.toString()),
          );

          return serviceIds.size === v.length;
        },
        message:
          'Debe incluir al menos un servicio y no permitir duplicados en el mismo variant',
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
      serviceId: Types.ObjectId;
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
      unique: true,
      index: true, 
    },
    description: {
      type: String,
      default: '',
    },
    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
    variants: {
      type: [VariantSchema],
      validate: {
        validator: function (variants: any[]) {
          if (!variants || variants.length === 0) return false;

          //validar duraciones únicas
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

PlanSchema.index(
  { name: 1, 'variants.durationInMonths': 1 },
  { unique: true, sparse: true },
);

export const PlanModel = model<PlanDocument>('Plan', PlanSchema);