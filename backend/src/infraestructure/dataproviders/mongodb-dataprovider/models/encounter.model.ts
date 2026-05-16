import { Schema, model, Types } from 'mongoose';

const encounterSchema = new Schema(
  {
    patientId: { type: Schema.Types.ObjectId, ref: 'Patient', required: true },
    medicId: { type: Schema.Types.ObjectId, ref: 'Medic', required: true },
    appointmentId: {
      type: Schema.Types.ObjectId,
      ref: 'Appointment',
      required: true,
    },
    symptoms: { type: String, required: true },
    notes: { type: String, default: null },
    preliminaryDiagnosis: { type: String, required: true },
    differentialDiagnosis: { type: String},
    prescriptions: [
      {
        medicationName: { type: String, required: true },
        dosage: {
          type: {
            amount: { type: Number, required: true },
            unit: { type: String, required: true },
          },
          required: true,
        },
        frequency: { type: String, required: true },
        startDate: { type: Date, required: true },
        endDate: { type: Date, required: true },
        _id: false,
      },
    ],
  },
  { timestamps: true },
);

encounterSchema.index({ appointmentId: 1 }, { unique: true });

encounterSchema.index({ patientId: 1 });

export default model('Encounter', encounterSchema);
