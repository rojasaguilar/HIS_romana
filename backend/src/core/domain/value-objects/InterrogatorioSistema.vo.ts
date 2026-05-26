export interface InterrogatorioSistemaProps {
  system: string;
  normal: boolean;
  sintomas: string;
  notas?: string;
}

export class InterrogatorioSistemaVO {
  private constructor(
    private readonly props: InterrogatorioSistemaProps,
  ) {}

  static create(
    props: InterrogatorioSistemaProps,
  ): InterrogatorioSistemaVO {
    // ===============================
    // SYSTEM
    // ===============================

    if (!props.system.trim()) {
      throw new Error(
        "El nombre del sistema/aparato es requerido",
      );
    }

    // ===============================
    // VALIDACIONES CUANDO NO ES NORMAL
    // ===============================

    if (!props.normal && !props.sintomas.trim()) {
      throw new Error(
        "Debe especificar síntomas cuando el sistema no es normal",
      );
    }

    return new InterrogatorioSistemaVO(props);
  }

  toValue(): InterrogatorioSistemaProps {
    return this.props;
  }
}