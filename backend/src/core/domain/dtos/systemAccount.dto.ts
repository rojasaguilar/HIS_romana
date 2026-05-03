import { Role } from '../types/role.type';

export type AuthResponseDto = {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    email: string;
    roles: Role[];
    profileType: 'MEDIC' | 'RECEPSIONIST';
  };
};
