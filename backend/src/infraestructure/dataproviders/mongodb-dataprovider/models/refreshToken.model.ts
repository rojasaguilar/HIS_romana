import { Schema, model, Types } from 'mongoose';

const refreshTokenSchema = new Schema({
  accountId: {
    type: Types.ObjectId,
    ref: 'SystemAccount',
    required: true,
    index: true,
  },

  jti: { type: String, required: true, unique: true, index: true },

  isRevoked: { type: Boolean, default: false },

  replacedByJti: { type: String },

  expiresAt: {
    type: Date,
    required: true,
    index: { expires: 0 },
  },

  createdAt: { type: Date, default: Date.now },

  userAgent: String,
  ip: String,
});

refreshTokenSchema.index({ userId: 1, isRevoked: 1 });

export default model('RefreshToken', refreshTokenSchema);
