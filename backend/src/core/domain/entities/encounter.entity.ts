import { CreateEncounterDTO } from '../dtos/encounter.dto';
import { ExploracionFisicaItemVO } from '../value-objects/ExploracionFisicaItem.vo';
import { IntegracionDiagnosticaItemVO } from '../value-objects/IntegracionDiagnosticaItem.vo';
import { InterrogatorioSistemaVO } from '../value-objects/InterrogatorioSistema.vo';
import { SignosVitalesVO } from '../value-objects/signosVitales.vo';
import { TratamientoPrevioVO } from '../value-objects/TratamientoPrevio.vo';

export class EncounterEntity {
  private constructor(
    public readonly patientId: string,

    public readonly medicId: string,

    public readonly appointmentId: string,

    public symptoms: string,

    public interrogatorioAparatosSistemas: InterrogatorioSistemaVO[],

    public signosVitales: SignosVitalesVO,

    public integracionDiagnostica: IntegracionDiagnosticaItemVO[],

    public exploracionFisica: ExploracionFisicaItemVO[],

    public prescriptions: TratamientoPrevioVO[],

    public notes?: string,

    public id?: string,
  ) {
    // ===============================
    // IDS
    // ===============================

    if (!patientId.trim()) {
      throw new Error('PatientId is required');
    }

    if (!medicId.trim()) {
      throw new Error('MedicId is required');
    }

    if (!appointmentId.trim()) {
      throw new Error('AppointmentId is required');
    }

    // ===============================
    // SYMPTOMS
    // ===============================

    // const invalidSymptom = symptoms.some((symptom) => !symptom.trim());

    // if (invalidSymptom) {
    //   throw new Error('Symptoms cannot contain empty values');
    // }

    // ===============================
    // DIAGNOSTICOS PRINCIPALES
    // ===============================

    const principales = integracionDiagnostica.filter(
      (d) => d.toValue().principal,
    );

    if (principales.length > 1) {
      throw new Error('Only one principal diagnosis is allowed');
    }
  }

  public static create(data: CreateEncounterDTO): EncounterEntity {
    const interrogatorioAparatosSistemas =
      data.interrogatorioAparatosSistemas.map((item) =>
        InterrogatorioSistemaVO.create(item),
      );

    const signosVitales = SignosVitalesVO.create(data.signosVitales);

    const integracionDiagnostica = data.integracionDiagnostica.map((item) =>
      IntegracionDiagnosticaItemVO.create({
        ...item,
        fechaDiagnostico: new Date(item.fechaDiagnostico),
      }),
    );

    const exploracionFisica = data.exploracionFisica.map((item) =>
      ExploracionFisicaItemVO.create(item),
    );

    const prescriptions = data.prescriptions.map((prescription) =>
      TratamientoPrevioVO.create({
        ...prescription,
        fechaInicio: prescription.fechaInicio
          ? new Date(prescription.fechaInicio)
          : undefined,

        fechaFin: prescription.fechaFin
          ? new Date(prescription.fechaFin)
          : undefined,
      }),
    );

    return new EncounterEntity(
      data.patientId,

      data.medicId,

      data.appointmentId,

      data.symptoms,

      interrogatorioAparatosSistemas,

      signosVitales,

      integracionDiagnostica,

      exploracionFisica,

      prescriptions,

      data.notes,

      data.id,
    );
  }
}
