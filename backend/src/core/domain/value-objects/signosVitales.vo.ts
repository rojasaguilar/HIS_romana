export interface SignosVitalesProps {
  tensionArterial: {
    sistolica: number;
    diastolica: number;
    unidad?: 'mmHg';
  };

  temperatura: {
    valor: number;
    unidad?: '°C';
  };

  frecuenciaCardiaca: {
    valor: number;
    unidad?: 'lpm';
  };

  frecuenciaRespiratoria: {
    valor: number;
    unidad?: 'rpm';
  };

  peso: {
    valor: number;
    unidad?: 'kg' | 'lb';
  };

  talla: {
    valor: number;
    unidad?: 'cm';
  };

  imc: {
    valor: number;
    clasificacion: string;
  };

  icc: {
    valor: number;
    clasificacion: string;
  };
}

export class SignosVitalesVO {
  private constructor(private readonly props: SignosVitalesProps) {}

  static create(props: SignosVitalesProps): SignosVitalesVO {
    // ===============================
    // TENSIÓN ARTERIAL
    // ===============================

    if (props.tensionArterial.sistolica <= 0) {
      throw new Error('La tensión arterial sistólica debe ser mayor a 0');
    }

    if (props.tensionArterial.diastolica <= 0) {
      throw new Error('La tensión arterial diastólica debe ser mayor a 0');
    }

    if (props.tensionArterial.sistolica < props.tensionArterial.diastolica) {
      throw new Error(
        'La presión sistólica no puede ser menor que la diastólica',
      );
    }

    // ===============================
    // TEMPERATURA
    // ===============================

    if (props.temperatura.valor <= 0) {
      throw new Error('La temperatura debe ser mayor a 0');
    }

    // ===============================
    // FRECUENCIA CARDIACA
    // ===============================

    if (props.frecuenciaCardiaca.valor <= 0) {
      throw new Error('La frecuencia cardiaca debe ser mayor a 0');
    }

    // ===============================
    // FRECUENCIA RESPIRATORIA
    // ===============================

    if (props.frecuenciaRespiratoria.valor <= 0) {
      throw new Error('La frecuencia respiratoria debe ser mayor a 0');
    }

    // ===============================
    // PESO
    // ===============================

    if (props.peso.valor <= 0) {
      throw new Error('El peso debe ser mayor a 0');
    }

    // ===============================
    // TALLA
    // ===============================

    if (props.talla.valor <= 0) {
      throw new Error('La talla debe ser mayor a 0');
    }

    // ===============================
    // IMC
    // ===============================

    if (props.imc.valor <= 0) {
      throw new Error('El IMC debe ser mayor a 0');
    }

    if (!props.imc.clasificacion.trim()) {
      throw new Error('La clasificación del IMC es requerida');
    }

    // ===============================
    // ICC
    // ===============================

    if (props.icc.valor <= 0) {
      throw new Error('El ICC debe ser mayor a 0');
    }

    if (!props.icc.clasificacion.trim()) {
      throw new Error('La clasificación del ICC es requerida');
    }

    return new SignosVitalesVO(props);
  }

  toValue(): SignosVitalesProps {
    return this.props;
  }
}
