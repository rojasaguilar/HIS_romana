import { UserPayloadDTO } from '../dtos/systemAccount.dto';
import { ITokenService } from '../interfaces/token.service.interface';
import { randomUUID } from 'crypto';

export class AuthService {
  constructor(private readonly tokenService: ITokenService) {}

  generateTokens(account: UserPayloadDTO) {
    const jti = randomUUID();

    const payload = {
      accountId: account.accountId,
      userId: account.userId,
      email: account.email,
      roles: account.roles,
      profileType: account.profileType,
    };

    return {
      accessToken: this.tokenService.signAccessToken(payload),
      refreshToken: this.tokenService.signRefreshToken({
        accountId: payload.accountId,
        userId: payload.userId,
        jti,
      }),
    };
  }
}
