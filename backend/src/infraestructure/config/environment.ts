import dotenv from 'dotenv';

dotenv.config();

function getEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Environment variable ${name} is required`);
  }
  return value;
}

export const env = {
  DATABASE_URL: getEnv('DATABASE_URL'),
  DATABASE_PASSWORD: getEnv('DATABASE_PASSWORD'),
  PORT: Number(process.env.PORT) || 3100,

  JWT_ACCESS_SECRET: getEnv('JWT_ACCESS_SECRET'),

  JWT_EXPIRES_IN: getEnv('JWT_EXPIRES_IN'), // "15m"
  REFRESH_EXPIRES: getEnv('REFRESH_EXPIRES'), // "7d"
};