import { AppointmentNotFoundError } from "../../domain/errors/appointment.error";

import { IAppointmentRepository } from "../../domain/repositories/appointment.repository.interface";

export class CompleteAppointmentUseCase {
  constructor(
    private readonly appointmentRepository: IAppointmentRepository,
  ) {}

  async execute(appointmentId: string) {
    /**
     * 1. FIND APPOINTMENT
     */
    const appointment =
      await this.appointmentRepository.findById(appointmentId);

    if (!appointment) {
      throw new AppointmentNotFoundError(
        `Appointment with id ${appointmentId} not found`,
      );
    }

    /**
     * 2. COMPLETE
     */
    appointment.complete();

    /**
     * 3. SAVE
     */
    return await this.appointmentRepository.update(
      appointmentId,
      appointment,
    );
  }
}