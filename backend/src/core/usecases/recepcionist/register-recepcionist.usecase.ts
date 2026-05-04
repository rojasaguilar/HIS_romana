import { AuthService } from '../../domain/domain-services/auth.service';
import { CreateReceptionistDTO } from '../../domain/dtos/receptionist.dto';
import { ReceptionistEntity } from '../../domain/entities/receptionist.entity';
import { SystemAccount } from '../../domain/entities/systemAccout.entity';
import { IPasswordService } from '../../domain/interfaces/password.service.interface';
import { IReceptionistRepository } from '../../domain/repositories/receptionist.repository.interface';
import { ISystemAccountRepository } from '../../domain/repositories/systemAccount.repository.interface';

export class RegisterRecepcionistUseCase {
  constructor(
    private readonly recepcionistRepository: IReceptionistRepository,
    private readonly authService: AuthService,
    private readonly systemAccountRepository: ISystemAccountRepository,
    private readonly passwordService: IPasswordService,
  ) {}

  async execute(data: CreateReceptionistDTO): Promise<{
    recepcionist: ReceptionistEntity;
    accessToken: string;
    refreshToken: string;
  }> {
    const newReceptionist = new ReceptionistEntity(
      data.name,
      data.email,
      data.phoneNumber,
      data.languages,
      data.isActive,
      data.profilePictureUrl,
    );

    const registeredRec =
      await this.recepcionistRepository.save(newReceptionist);

    if (!registeredRec) throw new Error(`could not save rec`);

    const hashedPassword = await this.passwordService.hashPassword(
      data.password,
    );

    const newAccount = new SystemAccount(
      registeredRec.id ?? '',
      registeredRec.email,
      ['RECEPTIONIST'],
      hashedPassword,
      'RECEPSIONIST',
      true,
    );

    const savedAccount = await this.systemAccountRepository.save(newAccount);

    if (!savedAccount) throw new Error(`Error saving account`);

    const payload = {
      accountId: savedAccount.getAccountId() ?? '',
      userId: savedAccount.getUserId(),
      roles: savedAccount.roles,
      email: savedAccount.email,
      profileType: savedAccount.getProfileType(),
    };

    const { accessToken, refreshToken } =
      this.authService.generateTokens(payload);

    return {
      recepcionist: registeredRec,
      accessToken,
      refreshToken,
    };
  }
}
