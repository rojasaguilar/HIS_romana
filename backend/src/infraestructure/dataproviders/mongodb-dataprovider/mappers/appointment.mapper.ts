import { AppointmentDocument } from './../models/appointment.model';
import { AppointmentEntity } from '../../../../core/domain/entities/appointment.entity';
import { AppointmentFactory } from '../../../../core/domain/factories/appointment.factory';
import { Billing } from '../../../../core/domain/types/billing.type';
import { parseStatus } from '../../../../core/domain/types/appointment-status.type';

export class AppointmentMapper {
  static toDomain(doc: AppointmentDocument) {
    return AppointmentFactory.createExistingAppointment({
      startDate: doc.startDate,
      endTime: doc.endTime,
      patientId: doc.patientId.toString(),
      medicId: doc.medicId.toString(),
      serviceId: doc.serviceId.toString(),
      status: parseStatus(doc.status),
      type: doc.type,
      patientCharge: doc.patientCharge,
      medicEarning: doc.medicEarning,
      billing: this.mapBilling(doc.billing),
      cancellation: doc.cancellation,
      preNotes: doc.preNotes ?? undefined,
      postNotes: doc.postNotes ?? undefined,
      completedAt: doc.completedAt,
      id: doc._id.toString(),
    });
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
      cancellation: appointment.cancellation,
      preNotes: appointment.preNotes,
      postNotes: appointment.postNotes,
      completedAt: appointment.completedAt,
    };
  }

  private static mapBilling(billing: AppointmentDocument['billing']): Billing {
    switch (billing.source) {
      case 'DIRECT':
        return { source: 'DIRECT' };

      case 'PROMOTION':
        if (!billing.promotionId) {
          throw new Error('Promotion billing requires promotionId');
        }
        return {
          source: 'PROMOTION',
          promotionId: billing.promotionId.toString(),
        };

      case 'SUBSCRIPTION':
        if (!billing.subscriptionId) {
          throw new Error('Subscription billing requires subscriptionId');
        }
        return {
          source: 'SUBSCRIPTION',
          subscriptionId: billing.subscriptionId.toString(),
        };

      default:
        throw new Error('Invalid billing source');
    }
  }
}
