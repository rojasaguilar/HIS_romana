import { SubscriptionEntity } from "../../../../core/domain/entities/subscription.entity";
import { SubscriptionDocument } from "../models/subscription.model";

export class SubscriptionMapper {
  static toDomain(doc: SubscriptionDocument): SubscriptionEntity {
    return new SubscriptionEntity(
      doc.patientId.toString(),
      doc.planId.toString(),
      doc.durationInMonths,
      doc.price,
      new Date(doc.startDate),
      new Date(doc.endDate),
      doc.monthlyVisitsIncluded.map((v) => ({
        serviceId: v.serviceId.toString(),
        visits: v.visits,
      })),
      doc.visitsUsed.map((v) => ({
        serviceId: v.serviceId.toString(),
        used: v.used,
        month: v.month,
        year: v.year,
      })),
      doc.status,
    );
  }

  static toPersistence(entity: SubscriptionEntity) {
    return {
      patientId: entity.patientId,
      planId: entity.planId,
      durationInMonths: entity.durationInMonths,
      price: entity.price,
      startDate: entity.startDate,
      endDate: entity.endDate,
      monthlyVisitsIncluded: entity.monthlyVisitsIncluded.map((v) => ({
        serviceId: v.serviceId,
        visits: v.visits,
      })),
      visitsUsed: entity.visitsUsed.map((v) => ({
        serviceId: v.serviceId,
        used: v.used,
        month: v.month,
        year: v.year,
      })),
      status: entity.status,
    };
  }
}
