import { Schema, model, Types } from 'mongoose';
import { CATEGORIAS_ESTUDIOS_LAB } from '../../../../core/domain/types/lab-test.categories.type';

const fileSchema = new Schema(
  {
    url: { type: String, required: true },
    name: { type: String, required: true },
    uploadedAt: { type: Date, default: Date.now },
  },
  { _id: false } 
);

const labTestSchema = new Schema(
  {
    patientId: { type: Types.ObjectId, ref: 'Patient', required: true },
    orderedBy: { type: Types.ObjectId, ref: 'Medic', required: true },
    encounterId: { type: Types.ObjectId, ref: 'Encounter', default: null },
    
    category: { 
      type: String, 
      enum: Object.values(CATEGORIAS_ESTUDIOS_LAB), 
      required: true 
    },
    testName: { type: String, required: true },
    instructions: { type: String, default: null },
    notes: { type: String, default: null },
    
    status: { 
      type: String, 
      enum: ['PENDING', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED'], 
      default: 'PENDING' 
    },
    
    files: { type: [fileSchema], default: [] },
    
    completedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

// Índices para búsquedas rápidas
labTestSchema.index({ patientId: 1, status: 1 });
labTestSchema.index({ encounterId: 1 });

export default model('LabTest', labTestSchema);