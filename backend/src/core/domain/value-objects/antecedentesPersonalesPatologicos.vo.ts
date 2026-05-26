export interface AntecedentesPersonalesPatologicosProps {
  tabaquismo: {
    consume: boolean;
    frecuencia: string;
    cantidad: string;
    tiempoConsumo: string;
    fechaUltimoConsumo: string;
    observaciones: string;
  };

  alcoholismo: {
    consume: boolean;
    frecuencia: string;
    cantidad: string;
    tiempoConsumo: string;
    fechaUltimoConsumo: string;
    observaciones: string;
  };

  toxicomanias: {
    consume: boolean;
    sustancias: string[];
    frecuencia: string;
    tiempoConsumo: string;
    fechaUltimoConsumo: string;
    observaciones: string;
  };

  quirurgicos: {
    procedimiento: string;
    fecha: string;
    hospital: string;
    complicaciones: string;
    observaciones: string;
  }[];

  hemotransfusiones: {
    haRecibido: boolean;
    cantidad: number;
    fechaUltima: string;
    motivo: string;
    reaccionesAdversas: boolean;
    observaciones: string;
  };

  fracturas: {
    hueso: string;
    fecha: string;
    causa: string;
    tratamiento: string;
    secuelas: string;
    observaciones: string;
  }[];

  infectocontagiosas: {
    enfermedad: string;
    fechaDiagnostico: string;
    tratamiento: string;
    secuelas: string;
    observaciones: string;
  }[];

  hospitalizacionesPrevias: {
    motivo: string;
    hospital: string;
    fechaIngreso: string;
    fechaEgreso: string;
    tratamiento: string;
    observaciones: string;
  }[];

  cronicoDegenerativo: {
    enfermedad: string;
    fechaDiagnostico: string;
    tratamientoActual: string;
    controlada: boolean;
    observaciones: string;
  }[];
}

export class AntecedentesPersonalesPatologicosVO {
  private constructor(
    private readonly props: AntecedentesPersonalesPatologicosProps,
  ) {}

  static create(
    props: AntecedentesPersonalesPatologicosProps,
  ): AntecedentesPersonalesPatologicosVO {
    // Hemotransfusiones
    if (props.hemotransfusiones.cantidad < 0) {
      throw new Error('La cantidad de hemotransfusiones no puede ser negativa');
    }

    // Validaciones tabaquismo
    if (props.tabaquismo.consume && !props.tabaquismo.frecuencia.trim()) {
      throw new Error('Debe especificarse la frecuencia de tabaquismo');
    }

    // Validaciones alcoholismo
    if (props.alcoholismo.consume && !props.alcoholismo.frecuencia.trim()) {
      throw new Error('Debe especificarse la frecuencia de alcoholismo');
    }

    // Toxicomanías
    if (
      props.toxicomanias.consume &&
      props.toxicomanias.sustancias.length === 0
    ) {
      throw new Error('Debe especificarse al menos una sustancia');
    }

    // Quirúrgicos
    props.quirurgicos.forEach((q, index) => {
      if (!q.procedimiento.trim()) {
        throw new Error(
          `El procedimiento quirúrgico #${index + 1} es requerido`,
        );
      }
    });

    // Fracturas
    props.fracturas.forEach((f, index) => {
      if (!f.hueso.trim()) {
        throw new Error(`El hueso de la fractura #${index + 1} es requerido`);
      }
    });

    // Infectocontagiosas
    props.infectocontagiosas.forEach((i, index) => {
      if (!i.enfermedad.trim()) {
        throw new Error(
          `La enfermedad infectocontagiosa #${index + 1} es requerida`,
        );
      }
    });

    // Hospitalizaciones
    props.hospitalizacionesPrevias.forEach((h, index) => {
      if (!h.motivo.trim()) {
        throw new Error(
          `El motivo de hospitalización #${index + 1} es requerido`,
        );
      }
    });

    // Crónico degenerativas
    props.cronicoDegenerativo.forEach((c, index) => {
      if (!c.enfermedad.trim()) {
        throw new Error(
          `La enfermedad crónico-degenerativa #${index + 1} es requerida`,
        );
      }
    });

    return new AntecedentesPersonalesPatologicosVO(props);
  }

  toValue(): AntecedentesPersonalesPatologicosProps {
    return this.props;
  }
}
