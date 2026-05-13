import { Role } from '../types/role.type';

export type AuthResponseDto = {
  accessToken: string;
  refreshToken: string;
  // user: UserPayloadDTO;
};

export interface UserPayloadDTO {
  accountId: string;
  userId: string;
  email: string;
  roles: Role[];
  // name: string;
  // roles: Role[];/
  profileType: 'MEDIC' | 'RECEPTIONIST';
}

export interface CreateSystemAccountDTO {
  user: UserPayloadDTO;
}
