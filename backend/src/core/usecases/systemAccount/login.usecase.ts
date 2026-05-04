import RefreshTokenRepository from '../../../infraestructure/dataproviders/mongodb-dataprovider/repositories/refreshToken.repository';
import { AuthService } from '../../domain/domain-services/auth.service';
import { AuthResponseDto } from '../../domain/dtos/systemAccount.dto';
import { CredentialsDoesNotMatchError } from '../../domain/errors/account.error';
import { IPasswordService } from '../../domain/interfaces/password.service';
import { ISystemAccountRepository } from '../../domain/repositories/systemAccount.repository.interface';

export class LoginUseCase {
  constructor(
    private readonly passwordService: IPasswordService,
    private readonly systemAccountRepository: ISystemAccountRepository,
    private readonly authService: AuthService,
    private readonly refreshTokenRepository: RefreshTokenRepository,
  ) {}

  async execute(email: string, password: string): Promise<AuthResponseDto> {
    const account = await this.systemAccountRepository.findByEmail(email);

    if (!account)
      throw new CredentialsDoesNotMatchError(`Could not find any account`);

    const isPassCorrect = await this.passwordService.isPasswordCorrect(
      password,
      account.getPassword(),
    );

    if (!isPassCorrect)
      throw new CredentialsDoesNotMatchError(`Credentials does not match`);

    const payload = {
      accountId: account.getAccountId() ?? '',
      userId: account.getUserId(),
      roles: account.roles,
      email: account.email,
      profileType: account.getProfileType(),
    };

    const { accessToken, refreshToken } =
      this.authService.generateTokens(payload);

    // this.refreshTokenRepository.save({});

    return {
      accessToken,
      refreshToken,
      // user: {
      //   id: account.id,
      //   email: account.email,
      //   roles: account.roles,
      //   profileType: account.getProfileType(),
      // },
    };
  }
}
