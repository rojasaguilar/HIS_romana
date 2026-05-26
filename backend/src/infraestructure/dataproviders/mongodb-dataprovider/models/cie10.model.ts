import mongoose, { Schema, Document } from "mongoose";

// 1. Definimos la interfaz para TypeScript
export interface ICie10 extends Document {
  level: number;
  code: string;
  description: string;
}

// 2. Creamos el esquema de Mongoose
const Cie10Schema: Schema = new Schema(
  {
    level: {
      type: Number,
      required: true,
    },
    code: {
      type: String,
      required: true,
      trim: true,
    //   uppercase: true, // Asegura que "j00" se guarde como "J00"
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: false, // No son necesarios createdAt/updatedAt para un catálogo estático
    versionKey: false, // Quita el __v
  }
);

// ==========================================
// ÍNDICES PARA OPTIMIZAR BÚSQUEDAS
// ==========================================

// Índice 1: Para búsquedas exactas o alfanuméricas por código (Ej. El médico teclea "J00")
// Lo ideal es que sea unique, pero si tu catálogo trae repetidos por alguna razón jerárquica, quita el `unique: true`
Cie10Schema.index({ code: 1 }, { unique: true });

// Índice 2: Índice de Texto (Text Index) para la descripción.
// Esto permite a MongoDB usar algoritmos de búsqueda de texto completo, ignorando mayúsculas, minúsculas y acentos de manera más eficiente que un Regex.
Cie10Schema.index({ description: "text" }, { default_language: "spanish" });

// 3. Exportamos el modelo
export const Cie10Catalog = mongoose.model<ICie10>("cie10", Cie10Schema);