import { DiagnosticoTipo } from "../types/diagnosticoTipo.type";

export interface IntegracionDiagnosticaItemProps {
  conditionId?: string;

  diagnostico: string;

  cie10?: string;

  tipo: DiagnosticoTipo;

  estado:
    | 'activo'
    | 'resuelto'
    | 'cronico'
    | 'enSeguimiento';

  principal: boolean;

  fechaDiagnostico: Date;

  observaciones?: string;
}

export class IntegracionDiagnosticaItemVO {
  private constructor(
    private readonly props: IntegracionDiagnosticaItemProps,
  ) {}

  static create(
    props: IntegracionDiagnosticaItemProps,
  ): IntegracionDiagnosticaItemVO {
    // ===============================
    // DIAGNÓSTICO
    // ===============================

    if (!props.diagnostico.trim()) {
      throw new Error(
        'El diagnóstico es requerido',
      );
    }

    // ===============================
    // CONDITION ID
    // ===============================

    if (
      props.conditionId &&
      !props.conditionId.trim()
    ) {
      throw new Error(
        'El conditionId no puede estar vacío',
      );
    }

    // ===============================
    // CIE10
    // ===============================

    if (props.cie10 && !props.cie10.trim()) {
      throw new Error(
        'El código CIE10 no puede estar vacío',
      );
    }

    // ===============================
    // FECHA DIAGNÓSTICO
    // ===============================

    if (
      !(props.fechaDiagnostico instanceof Date) ||
      isNaN(props.fechaDiagnostico.getTime())
    ) {
      throw new Error(
        'La fecha de diagnóstico no es válida',
      );
    }

    // ===============================
    // ESTADO
    // ===============================

    const estadosValidos = [
      'activo',
      'resuelto',
      'cronico',
      'enSeguimiento',
    ];

    if (!estadosValidos.includes(props.estado)) {
      throw new Error(
        `Estado diagnóstico inválido: ${props.estado}`,
      );
    }

    return new IntegracionDiagnosticaItemVO(props);
  }

  toValue(): IntegracionDiagnosticaItemProps {
    return this.props;
  }
}