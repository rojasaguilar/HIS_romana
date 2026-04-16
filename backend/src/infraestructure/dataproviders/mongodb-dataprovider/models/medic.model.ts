import { Schema, model, Types } from 'mongoose';

const medicSchema = new Schema(
  {
    name: { type: String, required: [true, 'Medic must have a name'] },
    email: { type: String, unique: true },
    phoneNumber: { type: String, unique: true },
    healthLicenseNumber: {
      type: String,
      required: [true, 'Medic must have a licence number'],
      unique: true,
    },
    professionalLicenceNumber: {
      type: String,
      required: [true, 'Medic must have a professional licence'],
      unique: true,
    },
    languages: [{ type: String, default: 'español' }],
    specialityIds: [{ type: String }],
    medicalSchool: { type: String, required: [true, ''] },
    startPracticeDate: { type: Date },
    bio: { type: String },
    consultationFee: {
      type: Number,
      required: [true, 'There must be a specific fee for a Medic '],
    },
    profilePictureUrl: { type: String },
    isActive: { type: Boolean, default: true },
    type: {
      type: String,
      required: [true, 'Medic must be either internal or external'],
    },
    organizationId: { type: Types.ObjectId, ref: 'Organization' },
  },
  { timestamps: true },
);

export default model('Medic', medicSchema);
