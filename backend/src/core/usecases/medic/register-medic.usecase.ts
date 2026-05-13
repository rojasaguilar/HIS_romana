import { MedicEntity } from '../../domain/entities/medic.entity';

import { SystemAccount } from '../../domain/entities/systemAccout.entity';

import { SpecialityNotFoundError } from '../../domain/errors/speciality.error';

import { IMedicRepository } from '../../domain/repositories/medic.repository.interface';

import { ISpecialityRepository } from '../../domain/repositories/speciality.repository.interface';

import { ISystemAccountRepository } from '../../domain/repositories/systemAccount.repository.interface';

import { MedicType } from '../../domain/types/medic.type';

import { AuthService } from '../../domain/domain-services/auth.service';

import { IPasswordService } from '../../domain/interfaces/password.service.interface';

import { ITransactionManager } from '../../domain/interfaces/transaction-manager.interface';
import { RegisterMedicDTO } from '../../domain/dtos/medic.dto';

export class RegisterMedicUseCase {
  constructor(
    private readonly medicRepository: IMedicRepository,

    private readonly specialityRepository: ISpecialityRepository,

    private readonly systemAccountRepository: ISystemAccountRepository,

    private readonly passwordService: IPasswordService,

    // private readonly authService: AuthService,

    private readonly transactionManager: ITransactionManager,
  ) {}

  async execute(data: RegisterMedicDTO): Promise<MedicEntity> {
    // accessToken?: string;

    // refreshToken?: string;
    return this.transactionManager.runInTransaction(async (session) => {
      // VALIDAR SPECIALITIES
      for (const specialityId of data.specialityIds) {
        const spec = await this.specialityRepository.findById(specialityId);

        if (!spec) {
          throw new SpecialityNotFoundError(
            `Speciality with id: ${specialityId} not found`,
          );
        }
      }

      // VALIDAR PASSWORD SI ES INTERNAL
      if (data.type === 'INTERNAL' && !data.password) {
        throw new Error('Internal medic requires password');
      }

      // CREAR MEDICO
      const newMedic = new MedicEntity(
        data.name,
        data.email,
        data.phoneNumber,
        data.healthLicenseNumber,
        data.professionalLicenceNumber,
        data.languages,
        data.specialityIds,
        data.medicalSchool,
        data.startPracticeDate,
        data.bio,
        data.consultationFee,
        data.profilePictureUrl,
        data.isActive,
        data.type,
        // data.organizationId,
      );

      const savedMedic = await this.medicRepository.save(newMedic, session);

      // SI ES EXTERNAL TERMINA AQUI
      if (data.type === 'EXTERNAL') {
        return savedMedic;
        // return {
        //   medic: savedMedic,
        // };
      }

      // HASH PASSWORD
      const hashedPassword = await this.passwordService.hashPassword(
        data.password!,
      );

      // CREAR ACCOUNT
      const newAccount = new SystemAccount(
        savedMedic.id ?? '',
        savedMedic.email,
        ['MEDIC'],
        hashedPassword,
        'MEDIC',
        true,
      );

      const savedAccount = await this.systemAccountRepository.save(
        newAccount,
        session,
      );

      // // TOKENS
      // const payload = {
      //   accountId: savedAccount.getAccountId() ?? '',

      //   userId: savedAccount.getUserId(),

      //   roles: savedAccount.roles,

      //   email: savedAccount.email,

      //   profileType: savedAccount.getProfileType(),
      // };

      // const { accessToken, refreshToken } =
      //   this.authService.generateTokens(payload);

      return savedMedic;
      // return {
      //   medic: savedMedic,

      //   accessToken,

      //   refreshToken,
      // };
    });
  }
}
