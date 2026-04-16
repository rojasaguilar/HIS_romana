import { AppointmentDTO } from '../dtos/appointmet.dto';
import { AppointmentEntity } from '../entities/appointment.entity';
import { MedicEntity } from '../entities/medic.entity';
import { ServiceEntity } from '../entities/services.entity';
import { InvalidBillingType } from '../errors/billing.error';
import { BillingVO } from '../value-objects/billing.vo';

export class AppointmentFactory {
  static schedule(
    dto: AppointmentDTO,
    service: ServiceEntity,
    medic: MedicEntity,
  ): AppointmentEntity {
    const billing = this.createBilling(dto.billing);

    return AppointmentEntity.create({
      startDate: dto.startDate,
      endTime: dto.endTime,
      patientId: dto.patientId,
      medicId: dto.medicId,
      serviceId: dto.serviceId,
      status: dto.status,
      type: dto.type,
      patientCharge: 0,
      medicEarning: dto.medicEarning,
      billing: billing,
      cancellation: undefined, //cancellation
      preNotes: dto.preNotes,
      postNotes: dto.postNotes,
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
