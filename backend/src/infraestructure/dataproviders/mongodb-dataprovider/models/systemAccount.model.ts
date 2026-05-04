import { Schema, model, Types } from 'mongoose';

const systemAccountSchema = new Schema(
  {
    userId: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    roles: [{ type: String, enum: ['ADMIN', 'MEDIC', 'RECEPTIONIST'] }],
    password: { type: String, unique: true, required: true },
    isActive: { type: Boolean, default: true },
    profileType: {
      type: String,
      enum: ['MEDIC', 'RECEPSIONIST'],
      required: [true, 'Receptionist must be either internal or external'],
    },
  },
  { timestamps: true },
);

export default model('SystemAccount', systemAccountSchema);
