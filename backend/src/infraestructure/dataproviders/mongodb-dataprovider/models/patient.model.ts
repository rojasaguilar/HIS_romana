import { Schema, model } from 'mongoose';
import { ESTADO_CIVIL } from '../../../../core/domain/types/martialStatus.type';

const patientSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    address: { type: Object, required: true },
    birthDate: { type: String, required: true },
    sex: { type: String, enum: ['F', 'M'], required: true },
    maritalStatus: {
      type: String,
      enum: Object.values(ESTADO_CIVIL),
      required: true,
    },
    allergies: [{ type: String, required: true }],
    bloodType: { type: String, required: true },
    isActive: { type: Boolean, default: true },
    emergencyContact: { type: Object },
  },
  { timestamps: true },
);

patientSchema.index({ email: 1 }, { unique: true });

export default model('Patient', patientSchema);
