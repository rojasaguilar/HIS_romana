import { EncounterEntity } from '../../../../core/domain/entities/encounter.entity';
import { IEncounterRepository } from '../../../../core/domain/repositories/encounter.repository.interface';
import EncounterModel from '../models/encounter.model'; // Tu modelo de Mongoose

export class EncounterRepository implements IEncounterRepository {
  public async create(encounter: EncounterEntity): Promise<EncounterEntity> {
    // 1. Mapear de Entidad a objeto para Mongoose
    const encounterData = {
      patientId: encounter.patientId,
      medicId: encounter.medicId,
      appointmentId: encounter.appointmentId,
      symptoms: encounter.symptoms,
      notes: encounter.notes,
      differentialDiagnosis: encounter.differentialDiagnosis,
      prescriptions: encounter.prescriptions,
    };

    // 2. Guardar en la BD
    const createdEncounter = await EncounterModel.create(encounterData);

    // 3. Devolver la Entidad reconstruida desde el documento guardado
    return EncounterEntity.create({
      id: createdEncounter.id,
      patientId: createdEncounter.patientId.toString(),
      medicId: createdEncounter.medicId.toString(),
      appointmentId: createdEncounter.appointmentId.toString(),
      symptoms: createdEncounter.symptoms,
      notes: createdEncounter.notes || undefined,
      differentialDiagnosis: createdEncounter.differentialDiagnosis,
      prescriptions: createdEncounter.prescriptions,
    });
  }

  public async findById(id: string): Promise<EncounterEntity | null> {
    const encounterDoc = await EncounterModel.findById(id);

    if (!encounterDoc) return null;

    return EncounterEntity.create({
      id: encounterDoc.id,
      patientId: encounterDoc.patientId.toString(),
      medicId: encounterDoc.medicId.toString(),
      appointmentId: encounterDoc.appointmentId.toString(),
      symptoms: encounterDoc.symptoms,
      notes: encounterDoc.notes || undefined,
      differentialDiagnosis: encounterDoc.differentialDiagnosis,
      prescriptions: encounterDoc.prescriptions,
    });
  }

  public async findByAppointmentId(
    appointmentId: string,
  ): Promise<EncounterEntity | null> {
    const encounterDoc = await EncounterModel.findOne({ appointmentId });

    if (!encounterDoc) return null;

    return EncounterEntity.create({
      id: encounterDoc.id,
      patientId: encounterDoc.patientId.toString(),
      medicId: encounterDoc.medicId.toString(),
      appointmentId: encounterDoc.appointmentId.toString(),
      symptoms: encounterDoc.symptoms,
      notes: encounterDoc.notes || undefined,
      differentialDiagnosis: encounterDoc.differentialDiagnosis,
      prescriptions: encounterDoc.prescriptions,
    });
  }

  public async findByPatientId(patientId: string): Promise<EncounterEntity[]> {
    const encountersDocs = await EncounterModel.find({ patientId }).sort({
      createdAt: -1,
    }); // Los más recientes primero

    return encountersDocs.map((doc) =>
      EncounterEntity.create({
        id: doc.id,
        patientId: doc.patientId.toString(),
        medicId: doc.medicId.toString(),
        appointmentId: doc.appointmentId.toString(),
        symptoms: doc.symptoms,
        notes: doc.notes || undefined,
        differentialDiagnosis: doc.differentialDiagnosis,
        prescriptions: doc.prescriptions,
      }),
    );
  }
}
