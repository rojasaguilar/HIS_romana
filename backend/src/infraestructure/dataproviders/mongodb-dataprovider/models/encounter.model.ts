import { Schema, model, Types } from 'mongoose';

const encounterSchema = new Schema(
  {
    patientId: { type: Types.ObjectId, ref: 'Patient', required: true },
    medicId: { type: Types.ObjectId, ref: 'Medic', required: true },
    appointmentId: { type: Types.ObjectId, ref: 'Medic', required: true },
    symptoms: { type: String, required: true },
    notes: { type: String, default: null },
    differentialDiagnosis: { type: String, required: true },
    prescriptions: [
      {
        medicationName: { type: String, required: true },
        dosage: { type: String, required: true },
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
