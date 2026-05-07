export interface LoginDTO {
  email: string;
  password: string;
}

export interface JwtPayload {
  accountId: string;

  userId: string;

  email: string;

  roles: string[];

  profileType:
    | "ADMIN"
    | "DOCTOR"
    | "RECEPTIONIST";

  iat: number;

  exp: number;
}

export interface AuthUser {
  accountId: string;

  userId: string;

  email: string;

  roles: string[];

  profileType:
    | "ADMIN"
    | "DOCTOR"
    | "RECEPTIONIST";
}

export interface LoginResponse {
  accessToken: string;
}

export interface MeResponse {
  accessToken: string;
  user: AuthUser;
}