import { jwtDecode } from "jwt-decode";

import type {
  JwtPayload,
  AuthUser,
} from "../types/auth.types";

export const decodeAccessToken = (
  token: string
): AuthUser => {
  const decoded =
    jwtDecode<JwtPayload>(token);

  return {
    accountId:
      decoded.accountId,

    userId:
      decoded.userId,

    email:
      decoded.email,

    roles:
      decoded.roles,

    profileType:
      decoded.profileType,
  };
};