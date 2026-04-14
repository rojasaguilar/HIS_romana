import { AppointmentDTO } from '../dtos/appointmet.dto';
import { AppointmentEntity } from '../entities/appointment.entity';
import { InvalidBillingType } from '../errors/billing.error';
import { BillingVO } from '../value-objects/billing.vo';

export class AppointmentFactory {
  static createNewAppointmet(appointment: AppointmentDTO): AppointmentEntity {
    const billing = this.createBilling(appointment.billing);

    return AppointmentEntity.create({
      startDate: appointment.startDate,
      endTime: appointment.endTime,
      patientId: appointment.patientId,
      medicId: appointment.medicId,
      serviceId: appointment.serviceId,
      status: appointment.status,
      type: appointment.type,
      patientCharge: 0,
      medicEarning: appointment.medicEarning,
      billing: billing,
      cancellation: undefined, //cancellation
      preNotes: appointment.preNotes,
      postNotes: appointment.postNotes,
      completedAt: undefined, //completed at
      id: undefined, //id
    });
  }

  private static createBilling(billing: AppointmentDTO['billing']): BillingVO {
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
