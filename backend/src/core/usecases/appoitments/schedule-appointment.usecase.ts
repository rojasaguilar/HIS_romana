import { AppointmentDTO } from '../../domain/dtos/appointmet.dto';

import { IAppointmentRepository } from '../../domain/repositories/appointment.repository.interface';

import { IServicesRepository } from '../../domain/repositories/services.repository.interface';

import { IPatientRepository } from '../../domain/repositories/patient.repository.interface';

import { IMedicRepository } from '../../domain/repositories/medic.repository.interface';

import { ISubscriptionRepository } from '../../domain/repositories/subscription.repository.interface';

import { MedicNotFoundError } from '../../domain/errors/medic.error';

import { PatientNotFoundError } from '../../domain/errors/patient.errors';

import {
  ServiceCanNotBePerformedByMedicError,
  ServiceModalityError,
  ServiceNotFoundError,
} from '../../domain/errors/service.error';

import { AppointmentDateError } from '../../domain/errors/appointment.error';

import { AppointmentEntity } from '../../domain/entities/appointment.entity';

import { BillingVO } from '../../domain/value-objects/billing.vo';

import { ITransactionManager } from '../../domain/interfaces/transaction-manager.interface';

export class ScheduleAppointmentUseCase {
  constructor(
    private readonly appointmentRepository: IAppointmentRepository,

    private readonly serviceRepository: IServicesRepository,

    private readonly patientRepository: IPatientRepository,

    private readonly medicRepository: IMedicRepository,

    private readonly subscriptionRepository: ISubscriptionRepository,

    private readonly transactionManager: ITransactionManager,
  ) {}

  async execute(dto: AppointmentDTO) {
    return this.transactionManager.runInTransaction(async (session) => {
      /**
       * 1. PATIENT
       */
      const patient = await this.patientRepository.findById(
        dto.patientId,
      );

      if (!patient) {
        throw new PatientNotFoundError(
          `Patient with id: ${dto.patientId} not found`,
        );
      }

      /**
       * 2. SERVICE
       */
      const service = await this.serviceRepository.findById(
        dto.serviceId,
      );

      if (!service) {
        throw new ServiceNotFoundError(
          `Service with id: ${dto.serviceId} not found`,
        );
      }

      if (!service.containsModality(dto.type)) {
        throw new ServiceModalityError(
          `Service is not eligible for modality ${dto.type}`,
        );
      }

      /**
       * 3. MEDIC
       */
      const medic = await this.medicRepository.findById(
        dto.medicId,
      );

      if (!medic) {
        throw new MedicNotFoundError(
          `Medic with id: ${dto.medicId} not found`,
        );
      }

      /**
       * 4. VALIDATE MEDIC CAN PERFORM SERVICE
       */
      if (!service.canBePerformedByMedic(medic)) {
        throw new ServiceCanNotBePerformedByMedicError(
          `Service: ${dto.serviceId} can not be performed`,
        );
      }

      /**
       * 5. DATE VALIDATION
       */
      const startDate = new Date(dto.startDate);

      if (isNaN(startDate.getTime())) {
        throw new AppointmentDateError(
          'Invalid appointment date',
        );
      }

      const estimatedEndTime = new Date(
        startDate.getTime() + service.duration * 60 * 1000,
      );

      const overlaps =
        await this.appointmentRepository.overlaps(
          dto.patientId,
          dto.medicId,
          startDate,
          estimatedEndTime,
          session,
        );

      if (overlaps) {
        throw new AppointmentDateError(
          `Medic already has an appointment in this time slot`,
        );
      }

      /**
       * 6. SUBSCRIPTION LOGIC
       */
      const subscription =
        await this.subscriptionRepository.findActiveByPatientId(
          dto.patientId,
        );

      let patientCharge = service.cost;

      let billing = BillingVO.createFromDirect();

      if (
        subscription &&
        subscription.canUseVisit(
          dto.serviceId,
          startDate,
        )
      ) {
        if (!subscription.id) {
          throw new Error(
            'Subscription without id',
          );
        }

        subscription.useVisit(
          dto.serviceId,
          startDate,
        );

        await this.subscriptionRepository.update(
          subscription.id,
          subscription,
          session,
        );

        patientCharge = 0;

        billing =
          BillingVO.createFromSubscription(
            subscription.id,
          );
      }

      /**
       * 7. MEDIC EARNING
       */
      const medicEarning =
        (service.cost * medic.consultationFee) / 100;

      /**
       * 8. CREATE APPOINTMENT
       */
      const appointment = AppointmentEntity.create({
        startDate,

        endTime: estimatedEndTime,

        patientId: dto.patientId,

        medicId: dto.medicId,

        serviceId: dto.serviceId,

        status: 'PROGRAMADA',

        type: dto.type,

        patientCharge,

        medicEarning,

        billing,

        preNotes: dto.preNotes,
      });

      return await this.appointmentRepository.save(
        appointment,
        session,
      );
    });
  }
}