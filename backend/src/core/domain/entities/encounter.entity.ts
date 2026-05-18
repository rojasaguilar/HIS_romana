import { CategoriaEstudiosLab } from '../types/lab-test.categories.type';
import { Dosage } from '../value-objects/dosage.vo';

export interface PrescriptionProps {
  medicationName: string;
  dosage: Dosage;
  frequency: string;
  startDate: Date;
  endDate: Date;
  //indicaciones
}

export interface EncounterLabTestProps {
  category: CategoriaEstudiosLab;

  testName: string;

  instructions?: string;
}

export interface EncounterProps {
  patientId: string;
  medicId: string;
  appointmentId: string;
  symptoms: string;
  notes?: string;
  preliminaryDiagnosis: string;
  differentialDiagnosis: string;
  prescriptions: PrescriptionProps[];
  id?: string;
  labTests?: EncounterLabTestProps[];
}

export class EncounterEntity {
  public readonly id?: string;
  public readonly patientId: string;
  public readonly medicId: string;
  public readonly appointmentId: string;
  public readonly symptoms: string;
  public readonly notes?: string;
  public readonly preliminaryDiagnosis: string;
  public readonly prescriptions: PrescriptionProps[];
  public readonly differentialDiagnosis: string;

  private constructor(props: EncounterProps) {
    this.patientId = props.patientId;
    this.medicId = props.medicId;
    this.appointmentId = props.appointmentId;
    this.symptoms = props.symptoms;
    this.notes = props.notes;
    this.preliminaryDiagnosis = props.preliminaryDiagnosis;
    this.differentialDiagnosis = props.differentialDiagnosis;
    this.prescriptions = props.prescriptions;
    this.id = props.id;
  }

  public static create(props: EncounterProps): EncounterEntity {
    // 1. Validaciones de campos obligatorios
    if (!props.patientId) throw new Error('El patientId es obligatorio.');
    if (!props.medicId) throw new Error('El medicId es obligatorio.');
    if (!props.appointmentId)
      throw new Error('El appointmentId es obligatorio.');
    if (!props.symptoms) throw new Error('Los síntomas son obligatorios.');
    if (!props.preliminaryDiagnosis)
      throw new Error('El diagnóstico preeliminar es obligatorio.');

    // 2. Validación de la estructura de las recetas (prescriptions)
    if (props.prescriptions && !Array.isArray(props.prescriptions)) {
      throw new Error('Las recetas deben ser un arreglo (array).');
    }

    if (props.prescriptions && props.prescriptions.length > 0) {
      props.prescriptions.forEach((prescription, index) => {
        if (!prescription.medicationName)
          throw new Error(
            `Receta [${index}]: El nombre del medicamento es obligatorio.`,
          );
        if (!prescription.dosage)
          throw new Error(`Receta [${index}]: La dosis es obligatoria.`);
        if (!prescription.frequency)
          throw new Error(`Receta [${index}]: La frecuencia es obligatoria.`);
        if (!prescription.startDate)
          throw new Error(
            `Receta [${index}]: La fecha de inicio es obligatoria.`,
          );
        if (!prescription.endDate)
          throw new Error(`Receta [${index}]: La fecha de fin es obligatoria.`);

        // Validación de coherencia en fechas
        if (new Date(prescription.startDate) > new Date(prescription.endDate)) {
          throw new Error(
            `Receta [${index}]: La fecha de inicio no puede ser mayor a la fecha de fin.`,
          );
        }
      });
    }

    // Si todo es válido, retornamos la nueva instancia usando el constructor privado
    return new EncounterEntity({
      ...props,
      prescriptions: props.prescriptions || [], // Aseguramos que siempre sea un array
    });
  }
}
