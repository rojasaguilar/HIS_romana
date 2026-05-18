import { ClientSession } from 'mongoose';
import { LabTestEntity } from '../../../../core/domain/entities/lab-test.entity';
import { ILabTestRepository } from '../../../../core/domain/repositories/lab-test.respository.interface';
import LabTestModel from '../models/lab-test.model';

export class LabTestRepository implements ILabTestRepository {
  private mapToDomain(doc: any): LabTestEntity {
    return LabTestEntity.create({
      id: doc._id.toString(),
      patientId: doc.patientId.toString(),
      orderedBy: doc.orderedBy.toString(),
      category: doc.category,
      testName: doc.testName,
      status: doc.status,
      encounterId: doc.encounterId ? doc.encounterId.toString() : null,
      instructions: doc.instructions || null,
      notes: doc.notes || null,
      files: doc.files ?? [],
      completedAt: doc.completedAt || null,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    });
  }

  public async create(
    labTest: LabTestEntity,
    session?: ClientSession,
  ): Promise<LabTestEntity> {
    const labTestData = {
      patientId: labTest.patientId,
      orderedBy: labTest.orderedBy,
      category: labTest.category,
      testName: labTest.testName,
      status: labTest.status,
      encounterId: labTest.encounterId,
      instructions: labTest.instructions,
      notes: labTest.notes,
      files: labTest.files,
      completedAt: labTest.completedAt,
    };

    const createdLabTest = await LabTestModel.create([labTestData], {
      session,
    });
    return this.mapToDomain(createdLabTest[0].toObject());
  }

 public async createMany(
  labTests: LabTestEntity[],
  session?: ClientSession,
): Promise<LabTestEntity[]> {
  const labTestsData = labTests.map((labTest) => ({
    patientId: labTest.patientId,

    orderedBy: labTest.orderedBy,

    category: labTest.category,

    testName: labTest.testName,

    status: labTest.status,

    encounterId: labTest.encounterId,

    instructions: labTest.instructions,

    notes: labTest.notes,

    files: labTest.files,

    completedAt: labTest.completedAt,
  }));

  const createdDocs = await LabTestModel.create(
    labTestsData,
    {
      session,
      ordered: true,
    },
  );

  return createdDocs.map((doc) =>
    this.mapToDomain(doc.toObject()),
  );
}

  public async update(labTest: LabTestEntity): Promise<LabTestEntity> {
    const updatedDoc = await LabTestModel.findByIdAndUpdate(
      labTest.id,
      {
        $set: {
          status: labTest.status,
          notes: labTest.notes,
          files: labTest.files,
          completedAt: labTest.completedAt,
          updatedAt: labTest.updatedAt,
        },
      },
      { new: true }, // Para que devuelva el documento ya actualizado
    ).lean();

    if (!updatedDoc) {
      throw new Error(
        `LabTest con id ${labTest.id} no encontrado para actualizar.`,
      );
    }

    return this.mapToDomain(updatedDoc);
  }

  public async findById(id: string): Promise<LabTestEntity | null> {
    const doc = await LabTestModel.findById(id).lean();
    if (!doc) return null;
    return this.mapToDomain(doc);
  }

  public async findByPatientId(patientId: string): Promise<LabTestEntity[]> {
    const docs = await LabTestModel.find({ patientId })
      .sort({ createdAt: -1 }) // Los más recientes primero
      .lean();

    return docs.map((doc) => this.mapToDomain(doc));
  }

  public async findByEncounterId(
    encounterId: string,
  ): Promise<LabTestEntity[]> {
    const docs = await LabTestModel.find({ encounterId }).lean();
    return docs.map((doc) => this.mapToDomain(doc));
  }

  public async findPendingByPatientId(
    patientId: string,
  ): Promise<LabTestEntity[]> {
    const docs = await LabTestModel.find({
      patientId,
      status: { $in: ['PENDING', 'IN_PROGRESS'] },
    })
      .sort({ createdAt: -1 })
      .lean();

    return docs.map((doc) => this.mapToDomain(doc));
  }
}
