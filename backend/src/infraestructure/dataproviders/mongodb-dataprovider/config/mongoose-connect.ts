import mongoose from 'mongoose';
import { env } from '../../../config/environment';

const DB = env.DATABASE_URL.replace('<PASSWORD>', env.DATABASE_PASSWORD);

export const connectDB = async () => {
  await mongoose.connect(DB);
  console.log('mongo connected');
};
