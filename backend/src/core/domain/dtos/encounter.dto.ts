import { ExploracionFisicaItemProps } from "../value-objects/ExploracionFisicaItem.vo";
import { IntegracionDiagnosticaItemProps } from "../value-objects/IntegracionDiagnosticaItem.vo";
import { InterrogatorioSistemaProps } from "../value-objects/InterrogatorioSistema.vo";
import { SignosVitalesProps } from "../value-objects/signosVitales.vo";
import { TratamientoPrevioProps } from "../value-objects/TratamientoPrevio.vo";


export interface CreateEncounterDTO {
  patientId: string;

  medicId: string;

  appointmentId: string;

  symptoms: string;

  interrogatorioAparatosSistemas: InterrogatorioSistemaProps[];

  signosVitales: SignosVitalesProps;

  integracionDiagnostica: (
    Omit<IntegracionDiagnosticaItemProps, 'fechaDiagnostico'> & {
      fechaDiagnostico: string | Date;
    }
  )[];

  exploracionFisica: ExploracionFisicaItemProps[];

  prescriptions: (
    Omit<
      TratamientoPrevioProps,
      'fechaInicio' | 'fechaFin'
    > & {
      fechaInicio?: string | Date;
      fechaFin?: string | Date;
    }
  )[];

  notes?: string;

  id?: string;
}