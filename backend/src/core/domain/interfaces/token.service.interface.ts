import { UserPayloadDTO } from '../dtos/systemAccount.dto';

export interface ITokenService {
  signAccessToken(payload: UserPayloadDTO): string;

  signRefreshToken(payload: {
    accountId: string;
    userId: string;
    jti: string;
  }): string;

  decodeAccessToken(token: string): Promise<UserPayloadDTO>;
}
