export interface AntecedentesGinecoObstetricosProps {
  menarca: {
    edad: number;
    observaciones: string;
  };

  fum: {
    fecha: string;
    ciclosRegulares: boolean;
    duracionCicloDias: number;
    observaciones: string;
  };

  inicioVidaSexualActiva: {
    edad: number;
    observaciones: string;
  };

  gestas: {
    embarazos: number;
    partos: number;
    cesareas: number;
    abortos: number;
    hijosVivos: number;
    observaciones: string;
  };

  metodoPlanificacionFamiliar: {
    usaMetodo: boolean;
    metodo: string;
    tiempoUso: string;
    observaciones: string;
  };
}

export class AntecedentesGinecoObstetricosVO {
  private constructor(
    private readonly props: AntecedentesGinecoObstetricosProps,
  ) {}

  static create(
    props: AntecedentesGinecoObstetricosProps,
  ): AntecedentesGinecoObstetricosVO {
    // Menarca
    if (props.menarca.edad < 0) {
      throw new Error('La edad de menarca no puede ser negativa');
    }

    // IVSA
    if (props.inicioVidaSexualActiva.edad < 0) {
      throw new Error(
        'La edad de inicio de vida sexual activa no puede ser negativa',
      );
    }

    // FUM
    if (props.fum.duracionCicloDias < 0) {
      throw new Error('La duración del ciclo no puede ser negativa');
    }

    // Gestas
    const { embarazos, partos, cesareas, abortos, hijosVivos } = props.gestas;

    if (
      embarazos < 0 ||
      partos < 0 ||
      cesareas < 0 ||
      abortos < 0 ||
      hijosVivos < 0
    ) {
      throw new Error('Los valores gineco-obstétricos no pueden ser negativos');
    }

    if (partos + cesareas + abortos > embarazos) {
      throw new Error(
        'La suma de partos, cesáreas y abortos no puede exceder el número de embarazos',
      );
    }

    // Planificación familiar
    if (
      props.metodoPlanificacionFamiliar.usaMetodo &&
      !props.metodoPlanificacionFamiliar.metodo.trim()
    ) {
      throw new Error('Debe especificarse el método de planificación familiar');
    }

    return new AntecedentesGinecoObstetricosVO(props);
  }

  toValue(): AntecedentesGinecoObstetricosProps {
    return this.props;
  }
}
