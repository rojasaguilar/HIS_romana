import { env } from './../config/environment';
import jwt from 'jsonwebtoken';
import { ITokenService } from '../../core/domain/interfaces/token.service.interface';
import { UserPayloadDTO } from '../../core/domain/dtos/systemAccount.dto';

export class JWTTokenService implements ITokenService {
  signAccessToken(payload: UserPayloadDTO): string {
    console.log(env.JWT_EXPIRES_IN);
    const accessToken = jwt.sign(payload, env.JWT_ACCESS_SECRET, {
      expiresIn: env.JWT_EXPIRES_IN as jwt.SignOptions['expiresIn'],
    });

    return accessToken;
  }
  signRefreshToken(payload: {
    accountId: string;
    userId: string;
    jti: string;
  }): string {
    const refreshToken = jwt.sign(payload, env.JWT_ACCESS_SECRET, {
      expiresIn: env.REFRESH_EXPIRES as jwt.SignOptions['expiresIn'],
    });

    return refreshToken;
  }
  decodeAccessToken(token: string): Promise<UserPayloadDTO> {
    throw new Error('Method not implemented.');
  }
}
