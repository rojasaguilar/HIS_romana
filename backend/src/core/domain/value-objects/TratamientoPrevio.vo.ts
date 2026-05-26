import { RouteAdministration } from '../types/routeAdministration.type';

export interface TratamientoPrevioProps {
  nombre: string;

  tipo:
    | 'medicamento'
    | 'quirurgico'
    | 'terapia'
    | 'rehabilitacion'
    | 'alternativo'
    | 'otro';

  dosis?: string;

  frecuencia?: string;

  routeAdministration?: RouteAdministration;

  fechaInicio?: Date;

  fechaFin?: Date;

  duracion?: string;

  indicacion?: string;

  respuestaTratamiento?:
    | 'mejoria'
    | 'sinCambios'
    | 'empeoramiento'
    | 'desconocida';

  efectosAdversos?: string[];

  suspendido: boolean;

  motivoSuspension?: string;

  observaciones?: string;
}

export class TratamientoPrevioVO {
  private constructor(private readonly props: TratamientoPrevioProps) {}

  static create(props: TratamientoPrevioProps): TratamientoPrevioVO {
    // ===============================
    // NOMBRE
    // ===============================

    if (!props.nombre.trim()) {
      throw new Error('El nombre del tratamiento es requerido');
    }

    // ===============================
    // FECHAS
    // ===============================

    if (
      props.fechaInicio &&
      props.fechaFin &&
      props.fechaFin < props.fechaInicio
    ) {
      throw new Error('La fecha fin no puede ser menor a la fecha inicio');
    }

    // ===============================
    // MEDICAMENTOS
    // ===============================

    if (props.tipo === 'medicamento') {
      if (!props.dosis?.trim()) {
        throw new Error(
          'La dosis es requerida para tratamientos medicamentosos',
        );
      }

      if (!props.frecuencia?.trim()) {
        throw new Error(
          'La frecuencia es requerida para tratamientos medicamentosos',
        );
      }

      if (!props.routeAdministration) {
        throw new Error('La vía de administración es requerida');
      }
    }

    // ===============================
    // SUSPENSIÓN
    // ===============================

    if (props.suspendido && !props.motivoSuspension?.trim()) {
      throw new Error('Debe especificar el motivo de suspensión');
    }

    // ===============================
    // EFECTOS ADVERSOS
    // ===============================

    if (props.efectosAdversos) {
      const invalidEffect = props.efectosAdversos.some(
        (effect) => !effect.trim(),
      );

      if (invalidEffect) {
        throw new Error('Los efectos adversos no pueden estar vacíos');
      }
    }

    return new TratamientoPrevioVO(props);
  }

  toValue(): TratamientoPrevioProps {
    return this.props;
  }
}
