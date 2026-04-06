import dotenv from 'dotenv';

dotenv.config();

export const env = {
  DATABASE_URL: process.env.DATABASE_URL || 'undefined',
  DATABASE_PASSWORD: process.env.DATABASE_PASSWORD || 'undefined',
  PORT: process.env.PORT || 3100,
};
