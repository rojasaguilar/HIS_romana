import dotenv from 'dotenv';

dotenv.config();

export const env = {
  DATABASE_URL: process.env.DATABASE_URL || 'undefined',
  DATABASE_PASSWORD: process.env.DATABASE_PASSWORD || 'undefined',
  PORT: process.env.PORT || 3100,
  JWT_SECRET: process.env.JWT_SECRET || '',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,
  JWT_COOKIE_EXPIRES_IN: process.env.JWT_COOKIE_EXPIRES_IN,
  REFRESH_EXPIRES: process.env.REFRESH_EXPIRES,
};
