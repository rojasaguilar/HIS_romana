import { Schema, model, Types } from 'mongoose';

const serviceModel = new Schema(
  {
    name: {
      type: String,
      unique: true,
      required: [true, 'Service must have a name'],
    },
    duration: {
      type: Number,
      required: [true, 'Service must have a duration'],
      min: [1, 'Duration must be at least 1 minute'],
    },
    cost: {
      type: Number,
      required: [true, 'Service must have a price'],
      min: [0, 'Price can not be negative'],
    },
    specialityId: {
      type: Types.ObjectId,
      ref: 'Specialities',
      required: true,
    },
  },
  { timestamps: true },
);

export default model('Services', serviceModel);
