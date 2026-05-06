import { PlanEntity } from '../../../../core/domain/entities/plan.entity';
import { PlanDescription } from '../../../../core/domain/value-objects/planDescription.vo';
import { PlanDocument } from '../models/plan.model';

export class PlanMapper {
  static toDomain(doc: PlanDocument): PlanEntity {
    return new PlanEntity(
      doc.name,
      doc.variants.map(
        (v) =>
          new PlanDescription(
            v.durationInMonths,
            v.price,
            v.monthlyVisitsIncluded.map((m) => ({
              serviceId: m.serviceId.toString(),
              visits: m.visits,
            })),
          ),
      ),
      doc.description,
      doc.isActive,
      doc._id.toString(),
    );
  }

  static toPersistence(plan: PlanEntity) {
    return {
      name: plan.name,
      description: plan.description,
      isActive: plan.isActive,
      variants: plan.variants.map((v) => ({
        durationInMonths: v.durationInMonths,
        price: v.price,
        monthlyVisitsIncluded: v.monthlyVisitsIncluded.map((m) => ({
          serviceId: m.serviceId, 
          visits: m.visits,
        })),
      })),
    };
  }
}