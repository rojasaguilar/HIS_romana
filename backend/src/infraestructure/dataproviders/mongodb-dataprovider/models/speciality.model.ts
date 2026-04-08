import { Schema, model } from 'mongoose';

const specialitySchema = new Schema(
  {
    name: { type: String, required: [true, 'Speciality must have a name'] },
  },
  { timestamps: true },
);

export default model('Speciality', specialitySchema);
