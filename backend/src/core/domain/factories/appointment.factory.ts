import { AppointmentDTO, CreateAppointmentDTO } from '../dtos/appointmet.dto';
import { AppointmentEntity } from '../entities/appointment.entity';
import { MedicEntity } from '../entities/medic.entity';
import { ServiceEntity } from '../entities/services.entity';
import { InvalidBillingType } from '../errors/billing.error';
import { BillingVO } from '../value-objects/billing.vo';
import { Status } from '../types/appointment-status.type';
import { Cancellation } from '../value-objects/cancellation.vo';
import { Billing } from '../types/billing.type';

export class AppointmentFactory {
  static schedule(
    dto: AppointmentDTO,
    service: ServiceEntity,
    medic: MedicEntity,
  ): AppointmentEntity {
    const billing = this.createBilling(dto.billing);

    const patientCharge = billing.source === 'DIRECT' ? service.cost : 0;

    const estiamtedEndTime = new Date(
      dto.startDate.getTime() + service.duration * 60 * 1000,
    );

    return AppointmentEntity.create({
      startDate: dto.startDate,
      endTime: estiamtedEndTime, //calcularlo
      patientId: dto.patientId,
      medicId: dto.medicId,
      serviceId: dto.serviceId,
      status: 'PROGRAMADA',
      type: dto.type,
      patientCharge,
      medicEarning: service.cost * (medic.consultationFee / 100),
      billing: billing,
      preNotes: dto.preNotes,
    });
  }

  static createExistingAppointment(
    appointmentData: CreateAppointmentDTO,
  ): AppointmentEntity {
    const billing = this.createBilling(appointmentData.billing);

    const cancelation = appointmentData.cancellation
      ? Cancellation.createCancellation(appointmentData.cancellation)
      : undefined;

    const completedAt = appointmentData.completedAt
      ? new Date(appointmentData.completedAt)
      : undefined;

    return AppointmentEntity.create({
      startDate: new Date(appointmentData.startDate),
      endTime: new Date(appointmentData.endTime),
      patientId: appointmentData.patientId,
      medicId: appointmentData.medicId,
      serviceId: appointmentData.serviceId,
      status: appointmentData.status as Status,
      type: appointmentData.type,
      patientCharge: appointmentData.patientCharge,
      medicEarning: appointmentData.medicEarning,
      billing,
      cancellation: cancelation,
      preNotes: appointmentData.preNotes,
      postNotes: appointmentData.postNotes,
      completedAt,
      id: appointmentData.id,
    });
  }

  private static createBilling(billing: Billing): BillingVO {
    switch (billing.source) {
      case 'DIRECT':
        return BillingVO.createFromDirect();
      case 'PROMOTION':
        return BillingVO.createFromPromotion(billing.promotionId);
      case 'SUBSCRIPTION':
        return BillingVO.createFromSubscription(billing.subscriptionId);
      default:
        throw new InvalidBillingType(`Invalid billing type`);
    }
  }
} //factory
