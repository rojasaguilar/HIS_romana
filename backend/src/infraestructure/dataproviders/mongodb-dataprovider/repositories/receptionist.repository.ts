import { ClientSession } from 'mongoose';
import { ReceptionistEntity } from '../../../../core/domain/entities/receptionist.entity';
import { IReceptionistRepository } from '../../../../core/domain/repositories/receptionist.repository.interface';
import receptionistModel from '../models/receptionist.model';

export class ReceptionistRepository implements IReceptionistRepository {
  async save(
    receptionist: ReceptionistEntity,
    session?: ClientSession,
  ): Promise<ReceptionistEntity> {
    const newReceptionist = await receptionistModel.create(
      [
        {
          name: receptionist.name,
          email: receptionist.email,
          phoneNumber: receptionist.phoneNumber,
          languages: receptionist.languages,
          isActive: true,
          profilePictureUrl: receptionist.profilePictureUrl,
        },
      ],
      { session },
    );

    if (!newReceptionist) throw new Error(``);

    return new ReceptionistEntity(
      newReceptionist[0].name,
      newReceptionist[0].email,
      newReceptionist[0].phoneNumber,
      newReceptionist[0].languages,
      true,
      newReceptionist[0].profilePictureUrl ?? '',
      newReceptionist[0]._id.toString(),
    );
  }
  async findById(id: string): Promise<ReceptionistEntity | null> {
    const recepDoc = await receptionistModel.findById(id);

    if (!recepDoc) return null;

    return new ReceptionistEntity(
      recepDoc.name,
      recepDoc.email,
      recepDoc.phoneNumber,
      recepDoc.languages,
      true,
      recepDoc.profilePictureUrl ?? '',
      recepDoc._id.toString(),
    );
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
