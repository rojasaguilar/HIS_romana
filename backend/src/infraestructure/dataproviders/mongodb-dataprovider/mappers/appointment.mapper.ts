import { AppointmentEntity } from '../../../../core/domain/entities/appointment.entity';
import { AppointmentFactory } from '../../../../core/domain/factories/appointment.factory';

export class AppointmentMapper {
  static toDomain(doc: any) {
    // return AppointmentFactory.schedule(doc);
  }

  static toPersistance(appointment: AppointmentEntity) {
    return {
      startDate: appointment.startDate,
      endTime: appointment.endTime,
      patientId: appointment.patientId,
      medicId: appointment.medicId,
      serviceId: appointment.serviceId,
      status: appointment.status,
      type: appointment.type,
      patientCharge: appointment.patientCharge,
      medicEarning: appointment.medicEarning,
      billing: {
        source: appointment.billing.source,
        promotionId: appointment.billing.getPromotionId(),
        subscriptionId: appointment.billing.getSubscriptionId(),
      },
    };
  }
}
