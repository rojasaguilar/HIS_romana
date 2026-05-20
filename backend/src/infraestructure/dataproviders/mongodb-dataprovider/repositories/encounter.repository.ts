import { EncounterEntity, EncounterProps } from '../../../../core/domain/entities/encounter.entity';
import { IEncounterRepository } from '../../../../core/domain/repositories/encounter.repository.interface';
import EncounterModel from '../models/encounter.model';
import { ClientSession } from 'mongoose';

export class EncounterRepository implements IEncounterRepository {
  
  public async update(
    id: string, 
    data: Partial<EncounterProps>, 
    session?: ClientSession
  ): Promise<EncounterEntity | null> {
    // Usamos { new: true } para que devuelva el documento después de aplicar los cambios
    const updatedDoc = await EncounterModel.findByIdAndUpdate(
      id,
      { $set: data },
      { new: true, session }
    ).lean();

    if (!updatedDoc) return null;

    return EncounterEntity.create({
      id: updatedDoc._id.toString(),
      patientId: updatedDoc.patientId.toString(),
      medicId: updatedDoc.medicId.toString(),
      appointmentId: updatedDoc.appointmentId.toString(),
      symptoms: updatedDoc.symptoms,
      notes: updatedDoc.notes || undefined,
      preliminaryDiagnosis: updatedDoc.preliminaryDiagnosis,
      differentialDiagnosis: updatedDoc.differentialDiagnosis ?? '',
      prescriptions: updatedDoc.prescriptions ?? [],
    });
  }

  public async create(
    encounter: EncounterEntity,
    session?: ClientSession,
  ): Promise<EncounterEntity> {
    const encounterData = {
      patientId: encounter.patientId,
      medicId: encounter.medicId,
      appointmentId: encounter.appointmentId,
      symptoms: encounter.symptoms,
      notes: encounter.notes,
      preliminaryDiagnosis: encounter.preliminaryDiagnosis,
      differentialDiagnosis: encounter.differentialDiagnosis,
      prescriptions: encounter.prescriptions,
    };

    const createdEncounter = await EncounterModel.create([encounterData], {
      session,
    });

    const plain = createdEncounter[0].toObject();

    return EncounterEntity.create({
      id: plain._id.toString(),
      patientId: plain.patientId.toString(),
      medicId: plain.medicId.toString(),
      appointmentId: plain.appointmentId.toString(),
      symptoms: plain.symptoms,
      notes: plain.notes || undefined,
      preliminaryDiagnosis: plain.preliminaryDiagnosis,
      differentialDiagnosis: plain.differentialDiagnosis ?? '',
      prescriptions: plain.prescriptions ?? [],
    });
  }

  public async findById(id: string): Promise<EncounterEntity | null> {
    const encounterDoc = await EncounterModel.findById(id).lean();

    if (!encounterDoc) return null;

    return EncounterEntity.create({
      id: encounterDoc._id.toString(),
      patientId: encounterDoc.patientId.toString(),
      medicId: encounterDoc.medicId.toString(),
      appointmentId: encounterDoc.appointmentId.toString(),
      symptoms: encounterDoc.symptoms,
      notes: encounterDoc.notes || undefined,
      preliminaryDiagnosis: encounterDoc.preliminaryDiagnosis,
      differentialDiagnosis: encounterDoc.differentialDiagnosis ?? '',
      prescriptions: encounterDoc.prescriptions ?? [],
    });
  }

  public async findByAppointmentId(
    appointmentId: string,
  ): Promise<EncounterEntity | null> {
    const encounterDoc = await EncounterModel.findOne({
      appointmentId,
    }).lean();

    if (!encounterDoc) return null;

    return EncounterEntity.create({
      id: encounterDoc._id.toString(),
      patientId: encounterDoc.patientId.toString(),
      medicId: encounterDoc.medicId.toString(),
      appointmentId: encounterDoc.appointmentId.toString(),
      symptoms: encounterDoc.symptoms,
      notes: encounterDoc.notes || undefined,
      preliminaryDiagnosis: encounterDoc.preliminaryDiagnosis,
      differentialDiagnosis: encounterDoc.differentialDiagnosis ?? '',
      prescriptions: encounterDoc.prescriptions ?? [],
    });
  }

  public async findByPatientId(patientId: string): Promise<EncounterEntity[]> {
    const encountersDocs = await EncounterModel.find({ patientId })
      .sort({
        createdAt: -1,
      })
      .lean();

    return encountersDocs.map((doc) =>
      EncounterEntity.create({
        id: doc._id.toString(),
        patientId: doc.patientId.toString(),
        medicId: doc.medicId.toString(),
        appointmentId: doc.appointmentId.toString(),
        symptoms: doc.symptoms,
        notes: doc.notes || undefined,
        preliminaryDiagnosis: doc.preliminaryDiagnosis,
        differentialDiagnosis: doc.differentialDiagnosis ?? '',
        prescriptions: doc.prescriptions ?? [],
      }),
    );
  }
}