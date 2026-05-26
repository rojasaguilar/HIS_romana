import { EncounterEntity } from '../../../../core/domain/entities/encounter.entity';
import { ExploracionFisicaItemVO } from '../../../../core/domain/value-objects/ExploracionFisicaItem.vo';
import { IntegracionDiagnosticaItemVO } from '../../../../core/domain/value-objects/IntegracionDiagnosticaItem.vo';
import { InterrogatorioSistemaVO } from '../../../../core/domain/value-objects/InterrogatorioSistema.vo';
import { SignosVitalesVO } from '../../../../core/domain/value-objects/signosVitales.vo';
import { TratamientoPrevioVO } from '../../../../core/domain/value-objects/TratamientoPrevio.vo';
import { encounterDocument } from '../models/encounter.model';

export class EncounterMapper {
  static toDomain(doc: encounterDocument): EncounterEntity {
    return EncounterEntity.create({
      patientId: doc.patientId.toString(),
      medicId: doc.medicId.toString(),
      appointmentId: doc.appointmentId.toString(),

      // nullable-safe string
      symptoms: doc.symptoms ?? '',

      // arrays safe
      interrogatorioAparatosSistemas: (
        doc.interrogatorioAparatosSistemas ?? []
      ).map((item) =>
        InterrogatorioSistemaVO.create({
          system: item.system,
          normal: item.normal,
          sintomas: item.sintomas,
          notas: item.notas ?? '',
        }).toValue(),
      ),

      // REQUIRED object but still guarded defensively
      signosVitales: SignosVitalesVO.create({
        tensionArterial: {
          sistolica: doc.signosVitales?.tensionArterial?.sistolica ?? 0,
          diastolica: doc.signosVitales?.tensionArterial?.diastolica ?? 0,
          unidad: doc.signosVitales?.tensionArterial?.unidad,
        },

        temperatura: {
          valor: doc.signosVitales?.temperatura?.valor ?? 0,
          unidad: doc.signosVitales?.temperatura?.unidad,
        },

        frecuenciaCardiaca: {
          valor: doc.signosVitales?.frecuenciaCardiaca?.valor ?? 0,
          unidad: doc.signosVitales?.frecuenciaCardiaca?.unidad,
        },

        frecuenciaRespiratoria: {
          valor: doc.signosVitales?.frecuenciaRespiratoria?.valor ?? 0,
          unidad: doc.signosVitales?.frecuenciaRespiratoria?.unidad,
        },

        peso: {
          valor: doc.signosVitales?.peso?.valor ?? 0,
          unidad: doc.signosVitales?.peso?.unidad,
        },

        talla: {
          valor: doc.signosVitales?.talla?.valor ?? 0,
          unidad: doc.signosVitales?.talla?.unidad,
        },

        imc: {
          valor: doc.signosVitales?.imc?.valor ?? 0,
          clasificacion: doc.signosVitales?.imc?.clasificacion ?? '',
        },

        icc: {
          valor: doc.signosVitales?.icc?.valor ?? 0,
          clasificacion: doc.signosVitales?.icc?.clasificacion ?? '',
        },
      }).toValue(),

      integracionDiagnostica: (doc.integracionDiagnostica ?? []).map((item) =>
        IntegracionDiagnosticaItemVO.create({
          conditionId: item.conditionId?.toString(),

          diagnostico: item.diagnostico,
          cie10: item.cie10,

          tipo: item.tipo,
          estado: item.estado,

          principal: item.principal ?? false,
          fechaDiagnostico: item.fechaDiagnostico ?? new Date(),

          observaciones: item.observaciones,
        }).toValue(),
      ),

      exploracionFisica: (doc.exploracionFisica ?? []).map((item) =>
        ExploracionFisicaItemVO.create({
          sistema: item.sistema,
          normal: item.normal,
          hallazgos: item.hallazgos,
          descripcion: item.descripcion ?? null,
          observaciones: item.observaciones ?? null,
        }).toValue(),
      ),

      prescriptions: (doc.prescriptions ?? []).map((item) =>
        TratamientoPrevioVO.create({
          nombre: item.nombre,
          tipo: item.tipo,

          dosis: item.dosis,
          frecuencia: item.frecuencia,

          routeAdministration: item.routeAdministration,

          fechaInicio: item.fechaInicio,
          fechaFin: item.fechaFin,

          duracion: item.duracion ?? null,
          indicacion: item.indicacion ?? null,

          respuestaTratamiento: item.respuestaTratamiento ?? null,
          efectosAdversos: item.efectosAdversos ?? [],

          suspendido: item.suspendido ?? false,
          motivoSuspension: item.motivoSuspension,

          observaciones: item.observaciones ?? null,
        }).toValue(),
      ),

      notes: doc.notes ?? '',

      id: doc._id.toString(),
    });
  }

  static toPersistence(encounter: EncounterEntity) {
    return {
      patientId: encounter.patientId,
      medicId: encounter.medicId,
      appointmentId: encounter.appointmentId,

      symptoms: encounter.symptoms ?? '',

      interrogatorioAparatosSistemas:
        encounter.interrogatorioAparatosSistemas?.map((item) =>
          item.toValue(),
        ) ?? [],

      signosVitales: encounter.signosVitales?.toValue(),

      integracionDiagnostica:
        encounter.integracionDiagnostica?.map((item) => item.toValue()) ?? [],

      exploracionFisica:
        encounter.exploracionFisica?.map((item) => item.toValue()) ?? [],

      prescriptions:
        encounter.prescriptions?.map((item) => item.toValue()) ?? [],

      notes: encounter.notes ?? null,
    };
  }
}
