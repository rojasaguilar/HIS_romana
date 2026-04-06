import { Schema, model } from 'mongoose';
import { RegisterPatientProps } from './../../../../core/domain/factories/patient.factory';

const patientSchema = new Schema<RegisterPatientProps>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    address: { type: Object, required: true },
    birthDate: { type: String, required: true },
    allergies: { type: [String], required: true },
    bloodType: { type: String, required: true },
    emergencyContact: { type: Object },
  },
  { timestamps: true },
);

export default model('Patient', patientSchema);
