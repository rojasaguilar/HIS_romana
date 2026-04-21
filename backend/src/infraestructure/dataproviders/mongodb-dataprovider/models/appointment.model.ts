import { Schema, model, Types, HydratedDocument } from 'mongoose';
import { CancellationDTO } from '../../../../core/domain/value-objects/cancellation.vo';
import {
  Status,
  STATUS_VALUES,
} from '../../../../core/domain/types/appointment-status.type';

const BillingSchema = new Schema(
  {
    source: {
      type: String,
      enum: ['DIRECT', 'PROMOTION', 'SUBSCRIPTION'],
      required: true,
    },

    promotionId: {
      type: Schema.Types.ObjectId,
      ref: 'Promotion',
      required: function () {
        return this.source === 'PROMOTION';
      },
    },

    subscriptionId: {
      type: Schema.Types.ObjectId,
      ref: 'Subscription',
      required: function () {
        return this.source === 'SUBSCRIPTION';
      },
    },
  },
  { _id: false },
);

const appointmentSchema = new Schema({
  startDate: {
    type: Date,
    required: [true, 'Appointment requires a starting date'],
  },
  endTime: {
    type: Date,
    required: [true, 'Appointment requires a starting date'],
  },
  patientId: {
    type: Types.ObjectId,
    ref: 'Patient',
    required: [true, 'Appointment requires a patient'],
  },
  medicId: {
    type: Types.ObjectId,
    ref: 'Medic',
    required: [true, 'Appointment requires a medic'],
  },
  serviceId: {
    type: Types.ObjectId,
    ref: 'Service',
    required: [true, 'Appointment requires a service'],
  },
  status: {
    type: String,
    enum: Object.values(STATUS_VALUES),
    required: [true, 'Appointment requires a status'],
  },
  type: {
    type: String,
    enum: ['IN_PERSON', 'ONLINE'],
    required: [true, 'Appointment requires a type'],
  },
  patientCharge: {
    type: Number,
    validate: {
      validator: function (charge: number) {
        return charge >= 0;
      },
      message: (charge: number) => `${charge} is not a valid charge`,
    },
    required: [true, 'Appointment requires a patient charge'],
  },
  medicEarning: {
    type: Number,
    validate: {
      validator: function (charge: number) {
        return charge >= 0;
      },
      message: (charge: number) => `${charge} is not a valid charge`,
    },
    required: [true, 'Appointment requires the medic earning'],
  },
  billing: {
    type: BillingSchema,
    required: [true, 'Appointment requires a billing type'],
  },
  cancellation: Object,
  preNotes: String,
  postNotes: String,
  completedAt: Date,
});

appointmentSchema.index({
  medicId: 1,
  startDate: 1,
});

appointmentSchema.index({
  patientId: 1,
  startDate: 1,
});

export default model<AppointmentPersistance>('Appointment', appointmentSchema);

export interface AppointmentPersistance {
  startDate: Date;
  endTime: Date;

  patientId: Types.ObjectId;
  medicId: Types.ObjectId;
  serviceId: Types.ObjectId;

  status: string;
  type: 'IN_PERSON' | 'ONLINE';

  patientCharge: number;
  medicEarning: number;

  billing: {
    source: 'DIRECT' | 'PROMOTION' | 'SUBSCRIPTION';
    promotionId?: Types.ObjectId | null;
    subscriptionId?: Types.ObjectId | null;
  };

  cancellation?: CancellationDTO;

  preNotes?: string | null;
  postNotes?: string | null;

  completedAt?: Date;

  _id: Types.ObjectId;
}

export type AppointmentDocument = HydratedDocument<AppointmentPersistance>;
