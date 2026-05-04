import { model, Schema } from 'mongoose';

const receptionistSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  languages: [String],
  isActive: Boolean,
  profilePictureUrl: String,
});

export default model('Receptionist', receptionistSchema);
