import { MedicEntity } from '../../domain/entities/medic.entity';
import { SpecialityNotFoundError } from '../../domain/errors/speciality.error';
import { IMedicRepository } from '../../domain/repositories/medic.repository.interface';
import { ISpecialityRepository } from '../../domain/repositories/speciality.repository.interface';
import { MedicType } from '../../domain/types/medic.type';

export interface RegisterMedicDTO {
  name: string;
  email: string;
  phoneNumber: string;
  healthLicenseNumber: string; //noRegistroSalubridad,
  professionalLicenceNumber: string;
  languages: string[];
  specialityIds: string[];
  medicalSchool: string;
  startPracticeDate: Date;
  bio: string;
  consultationFee: number;
  profilePictureUrl: string;
  isActive: boolean;
  type: MedicType;
  organizationId?: string;
  id?: string;
}

export class RegisterMedicUseCase {
  constructor(
    private readonly medicRepository: IMedicRepository,
    private readonly specialityRepository: ISpecialityRepository,
  ) {}

  async execute(data: RegisterMedicDTO): Promise<MedicEntity> {
    for (const specialityId of data.specialityIds) {
      const spec = await this.specialityRepository.findById(specialityId);

      if (!spec)
        throw new SpecialityNotFoundError(
          `Speciality with id: ${specialityId} not found`,
        );
    }

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
      true,
      data.type,
      data.organizationId,
    );

    return await this.medicRepository.save(newMedic);
  }
}
