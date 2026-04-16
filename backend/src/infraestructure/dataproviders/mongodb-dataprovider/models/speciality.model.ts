import { Schema, model } from 'mongoose';

const specialitySchema = new Schema(
  {
    name: { type: String, required: [true, 'Speciality must have a name'] },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

export default model('Speciality', specialitySchema);
