import { ExploracionFisicaSistema } from "../types/ExploracionFisicaSistema.type";

export interface ExploracionFisicaItemProps {
  sistema: ExploracionFisicaSistema;

  normal: boolean;

  hallazgos: string;

  descripcion: string;

  observaciones?: string;
}

export class ExploracionFisicaItemVO {
  private constructor(
    private readonly props: ExploracionFisicaItemProps,
  ) {}

  static create(
    props: ExploracionFisicaItemProps,
  ): ExploracionFisicaItemVO {

    // ===============================
    // SISTEMA
    // ===============================
    if (!props.sistema) {
      throw new Error('El sistema de exploración física es requerido');
    } 

    // ===============================
    // DESCRIPCIÓN
    // ===============================
    if (!props.descripcion?.trim()) {
      throw new Error('La descripción de la exploración física es requerida');
    }

    // ===============================
    // HALLAZGOS
    // ===============================

    const hallazgos = props.hallazgos?.trim();

    // si es string vacío normalizado
    const sinHallazgos = !hallazgos || hallazgos.length === 0;

    // ===============================
    // VALIDACIÓN CUANDO NO ES NORMAL
    // ===============================
    if (!props.normal && sinHallazgos) {
      throw new Error(
        'Debe especificar al menos un hallazgo cuando no es normal',
      );
    }

    return new ExploracionFisicaItemVO({
      ...props,
      hallazgos: hallazgos ?? '',
    });
  }

  toValue(): ExploracionFisicaItemProps {
    return this.props;
  }
}