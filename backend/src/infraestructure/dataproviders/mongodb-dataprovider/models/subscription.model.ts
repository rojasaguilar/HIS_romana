import { Schema, model, Document, Types } from 'mongoose';

export interface SubscriptionDocument extends Document {
  patientId: Types.ObjectId;
  planId: Types.ObjectId;
  durationInMonths: number;
  price: number;
  startDate: Date;
  endDate: Date;

  monthlyVisitsIncluded: {
    serviceId: Types.ObjectId;
    visits: number;
  }[];

  visitsUsed: {
    serviceId: Types.ObjectId;
    used: number;
    month: number;
    year: number;
  }[];

  status: 'active' | 'cancelled' | 'expired';
}

const MonthlyVisitSchema = new Schema(
  {
    serviceId: {
      type: Schema.Types.ObjectId,
      ref: 'Service', // 🔥 referencia real
      required: true,
    },
    visits: {
      type: Number,
      required: true,
      min: 1,
    },
  },
  { _id: false },
);

const VisitUsageSchema = new Schema(
  {
    serviceId: {
      type: Schema.Types.ObjectId,
      ref: 'Service', // 🔥 referencia real
      required: true,
    },
    used: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
    month: {
      type: Number,
      required: true,
      min: 1,
      max: 12,
    },
    year: {
      type: Number,
      required: true,
    },
  },
  { _id: false },
);

const SubscriptionSchema = new Schema<SubscriptionDocument>(
  {
    patientId: {
      type: Schema.Types.ObjectId,
      ref: 'Patient',
      required: true,
      index: true, // 🔥 mejora performance
    },
    planId: {
      type: Schema.Types.ObjectId,
      ref: 'Plan',
      required: true,
    },
    durationInMonths: {
      type: Number,
      required: true,
      min: 1,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
      index: true, // 🔥 útil para queries de expiración
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
    visitsUsed: {
      type: [VisitUsageSchema],
      default: [],
    },
    status: {
      type: String,
      enum: ['active', 'cancelled', 'expired'],
      default: 'active',
      index: true, // 🔥 consultas rápidas
    },
  },
  {
    timestamps: true,
  },
);

export const SubscriptionModel = model<SubscriptionDocument>(
  'Subscription',
  SubscriptionSchema,
);
