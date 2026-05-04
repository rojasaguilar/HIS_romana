import { RefreshTokenEntity } from '../../../../core/domain/entities/refreshToken.entity';
import refreshTokenModel from '../models/refreshToken.model';

//persist the data

export class RefreshTokenRepository {
  async save(token: RefreshTokenEntity): Promise<RefreshTokenEntity> {
    // const data = PatientMapper.toPersistance(patient);
    const savedToken = await refreshTokenModel.create({
      accountId: token.getAccountId(),
      jti: token.getJti(),
    });

    return new RefreshTokenEntity(
      savedToken.jti,
      savedToken.accountId.toString(),
      savedToken.isRevoked,
      savedToken.expiresAt,
      savedToken.createdAt,
      //   savedToken.userAgent ? savedToken.userAgent : undefined,
      //   savedToken.replacedByJti,
    );
    // return PatientMapper.toDomain(savedPatient);
  }

  //   async findById(jti: string): Promise<RefreshTokenEntity | null> {
  //     const refreshToken = await refreshTokenModel.findOne({ jti });

  //     if (!refreshToken) {
  //       return null;
  //     }

  //     // return PatientMapper.toDomain(patient);
  //   }

  //   async getAll(): Promise<RefreshTokenEntity[]> {
  //     const patients = await refreshTokenModel.find();

  //     if (patients.length === 0) return [];

  //     return patients.map((patient) => PatientMapper.toDomain(patient));
  //   }

  // Other CRUD methods (find, update, delete) can be implemented similarly
}

export default RefreshTokenRepository;
