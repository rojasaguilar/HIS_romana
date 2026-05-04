import { ReceptionistEntity } from '../../../../core/domain/entities/receptionist.entity';
import { IReceptionistRepository } from '../../../../core/domain/repositories/receptionist.repository.interface';
import receptionistModel from '../models/receptionist.model';

export class ReceptionistRepository implements IReceptionistRepository {
  async save(receptionist: ReceptionistEntity): Promise<ReceptionistEntity> {
    const newReceptionist = await receptionistModel.create({
      name: receptionist.name,
      email: receptionist.email,
      phoneNumber: receptionist.phoneNumber,
      languages: receptionist.languages,
      isActive: true,
      profilePictureUrl: receptionist.profilePictureUrl,
    });

    if (!newReceptionist) throw new Error(``);

    return new ReceptionistEntity(
      newReceptionist.name,
      newReceptionist.email,
      newReceptionist.phoneNumber,
      newReceptionist.languages,
      true,
      newReceptionist.profilePictureUrl ?? '',
      newReceptionist._id.toString(),
    );
  }
  findById(id: string): Promise<ReceptionistEntity | null> {
    throw new Error('Method not implemented.');
  }

  async getAll(): Promise<ReceptionistEntity[]> {
    const receptionistsDocs = await receptionistModel.find();

    return receptionistsDocs.map(
      (doc) =>
        new ReceptionistEntity(
          doc.name,
          doc.email,
          doc.phoneNumber,
          doc.languages,
          true,
          doc.profilePictureUrl ?? '',
          doc._id.toString(),
        ),
    );
  }
}
