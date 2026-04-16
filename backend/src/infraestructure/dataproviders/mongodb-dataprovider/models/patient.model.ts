import { Schema, model } from 'mongoose';

const patientSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    address: { type: Object, required: true },
    birthDate: { type: String, required: true },
    allergies: [{ type: String, required: true }],
    bloodType: { type: String, required: true },
    isActive: { type: Boolean, default: true },
    emergencyContact: { type: Object },
  },
  { timestamps: true },
);

export default model('Patient', patientSchema);
