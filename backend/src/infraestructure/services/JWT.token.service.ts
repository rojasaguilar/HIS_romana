import { env } from './../config/environment';
import jwt from 'jsonwebtoken';
import { ITokenService } from '../../core/domain/interfaces/token.service.interface';
import { UserPayloadDTO } from '../../core/domain/dtos/systemAccount.dto';

export class JWTTokenService implements ITokenService {
  signAccessToken(payload: UserPayloadDTO): string {
    const accessToken = jwt.sign(payload, env.JWT_SECRET, {
      expiresIn: Number(env.JWT_EXPIRES_IN),
    });

    return accessToken;
  }
  signRefreshToken(payload: {
    accountId: string;
    userId: string;
    jti: string;
  }): string {
    const refreshTokenExpiration = Number(
      env.REFRESH_EXPIRES?.replace('d', ''),
    );

    const refreshToken = jwt.sign(payload, env.JWT_SECRET, {
      expiresIn: refreshTokenExpiration,
    });

    return refreshToken;
  }
  decodeAccessToken(token: string): Promise<UserPayloadDTO> {
    throw new Error('Method not implemented.');
  }
}
