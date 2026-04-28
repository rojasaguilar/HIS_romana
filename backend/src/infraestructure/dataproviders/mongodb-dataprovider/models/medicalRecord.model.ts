import { Schema, Types, model, HydratedDocument } from 'mongoose';
import { CreateMedicalRecordDTO } from '../../../../core/domain/dtos/medicalRecord.dto';

const currentConditionSchema = new Schema({
  diseaseId: {
    type: Types.ObjectId,
    ref: 'Disease',
    required: [true, 'A disease must be specified'],
  },
  since: { type: Date, required: [true, 'Must specified a aprox date'] },
  diagnosedBy: {
    type: Types.ObjectId,
    ref: 'Medic',
  },
});

const dosageSchema = new Schema(
  {
    amount: Number,
    min: [1, 'too low dosage'],
    max: [24, 'too much dosage'],
    unit: String,
  },
  { _id: false },
);

const surgeryRecordSchema = new Schema(
  {
    surgeryName: String,
    surgeryDate: Date,
  },
  { _id: false },
);

const familyHistorySchema = new Schema({
  relationship: {
    type: String,
    enum: ['madre', 'padre', 'abuelo', 'abuela', 'hermano', 'hermana'],
  },
  diseaseId: {
    type: Types.ObjectId,
    ref: 'Disease',
    required: [true, 'A disease must be specified'],
  },
});

const chronicMedicationSchema = new Schema({
  medicationName: {
    type: String,
    required: [true, 'A medication name must be specified'],
  },
  dosage: dosageSchema,
  frequency: {
    timesPerDay: { type: Number, min: [1, 'min 1 times per day'] },
  },
  startedAt: {
    type: Date,
    required: [true, 'Must specified a aprox started date'],
  },
  riskFactors: [String],
  surgicalHistory: [surgeryRecordSchema],
  familyHistory: [familyHistorySchema],
});

const medicalRecordSchema = new Schema({
  patientId: {
    type: Types.ObjectId,
    ref: 'Patient',
    required: [true, 'A medial record must be related to a patient'],
  },
  allergies: [
    {
      type: String,
    },
  ],
  height: {
    type: Number,
    required: [true, 'Height must be specified'],
    min: [15, 'Height too low'],
  },
  weight: {
    type: Number,
    required: [true, 'weight must be specified'],
    min: [1, 'weight too low'],
  },
  currentCondition: [currentConditionSchema],
  chronicMedication: [chronicMedicationSchema],
  riskFactors: [String],
  surgicalHistory: [surgeryRecordSchema],
  familyHistory: [familyHistorySchema],
  summary: String,
});

medicalRecordSchema.index({ patientId: 1 }, { unique: true });

export type medicalRecordDocument = HydratedDocument<CreateMedicalRecordDTO>;

export default model<CreateMedicalRecordDTO>(
  'MedicalRecord',
  medicalRecordSchema,
);
