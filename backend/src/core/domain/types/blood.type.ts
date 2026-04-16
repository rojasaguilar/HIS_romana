import { InvalidBloodTypeError } from '../errors/blood_type.error';

export const BLOOD_TYPE = {
  A_POSITIVO: 'A+',
  A_NEGATIVO: 'A-',
  B_POSITIVO: 'B+',
  B_NEGATIVO: 'B-',
  AB_POSITIVO: 'AB+',
  AB_NEGATIVO: 'AB-',
  O_POSITIVO: 'O+',
  O_NEGATIVO: 'O-',
} as const;

export type BloodType = (typeof BLOOD_TYPE)[keyof typeof BLOOD_TYPE];

export const parseBloodType = (bloodType: string): BloodType => {
  const values = Object.values(BLOOD_TYPE);

  if (!values.includes(bloodType as BloodType))
    throw new InvalidBloodTypeError(``);

  return bloodType as BloodType;
};
