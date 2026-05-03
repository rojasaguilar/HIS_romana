import { AuthResponseDto } from '../../domain/dtos/systemAccount.dto';
import { CredentialsDoesNotMatchError } from '../../domain/errors/account.error';
import { IPasswordService } from '../../domain/interfaces/password.service';
import { ISystemAccountRepository } from '../../domain/repositories/systemAccount.repository.interface';

export class LoginUseCase {
  constructor(
    private readonly passwordService: IPasswordService,
    private readonly systemAccountRepository: ISystemAccountRepository,
  ) {}

  async execute(email: string, password: string): Promise<AuthResponseDto> {
    const account = await this.systemAccountRepository.findByEmail(email);

    if (!account)
      throw new CredentialsDoesNotMatchError(`Could not find any account`);

    await this.passwordService.isPasswordCorrect(
      password,
      account.getPassword(),
    );

    return {
      accessToken: '',
      refreshToken: '',
      user: {
        id: account.id,
        email: account.email,
        roles: account.roles,
        profileType: account.getProfileType(),
      },
    };
  }
}
