import {
  EncounterProps,
  EncounterEntity,
} from '../../domain/entities/encounter.entity';
import { MedicNotFoundError } from '../../domain/errors/medic.error';
import { PatientNotFoundError } from '../../domain/errors/patient.errors';
import { IAppointmentRepository } from '../../domain/repositories/appointment.repository.interface';
import { IEncounterRepository } from '../../domain/repositories/encounter.repository.interface';
import { IMedicRepository } from '../../domain/repositories/medic.repository.interface';
import { IPatientRepository } from '../../domain/repositories/patient.repository.interface';

export class CreateEncounterUseCase {
  constructor(
    private readonly encounterRepository: IEncounterRepository,
    private readonly appointmentRepository: IAppointmentRepository,
    private readonly patientRepository: IPatientRepository,
    private readonly medicRepository: IMedicRepository,
  ) {}

  public async execute(data: EncounterProps): Promise<EncounterEntity> {
    const encounter = EncounterEntity.create(data);

    //VALIDAR QUE EXISTAN LOS DATOS
    // const { medicId, patientId, appointmentId } = data;

    // const patientExists = await this.patientRepository.findById(patientId);

    // if (!patientExists)
    //   throw new PatientNotFoundError(
    //     `Paciente con id: ${patientId} no encontrado`,
    //   );

    // const medicExists = await this.medicRepository.findById(medicId);

    // if (!medicExists)
    //   throw new MedicNotFoundError(`Medico con id: ${medicId} no encontrado`);

    // const appointmentExists =
    //   await this.appointmentRepository.findById(appointmentId);

    // if (!appointmentExists)
    //   throw new PatientNotFoundError(
    //     `Cita con id: ${appointmentId} no encontrada`,
    //   );

    // //CONFIRMAR QUE EL MEDICO ES EL ASIGNADO PARA ESA CITA


    return await this.encounterRepository.create(encounter);
  }
}
