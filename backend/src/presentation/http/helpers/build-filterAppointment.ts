import { FilterAppointmentDTO } from "../../../core/domain/dtos/appointmet.dto";

export function buildAppointmentFilter(query: any): Partial<FilterAppointmentDTO> {
  const filter: Partial<FilterAppointmentDTO> = {};

  // helper para fechas
  const parseDate = (value: any) => {
    const d = new Date(value);
    return isNaN(d.getTime()) ? undefined : d;
  };

  // helper para números
  const parseNumber = (value: any) => {
    const n = Number(value);
    return isNaN(n) ? undefined : n;
  };

  // campos simples
  if (query.startDate) filter.startDate = parseDate(query.startDate);
  if (query.endTime) filter.endTime = parseDate(query.endTime);

  if (query.patientId) filter.patientId = String(query.patientId);
  if (query.medicId) filter.medicId = String(query.medicId);
  if (query.serviceId) filter.serviceId = String(query.serviceId);

  if (query.status) filter.status = query.status;
  if (query.type) filter.type = query.type;

  if (query.patientCharge) {
    const val = parseNumber(query.patientCharge);
    if (val !== undefined) filter.patientCharge = val;
  }

  if (query.medicEarning) {
    const val = parseNumber(query.medicEarning);
    if (val !== undefined) filter.medicEarning = val;
  }

  if (query.completedAt) {
    const val = parseDate(query.completedAt);
    if (val) filter.completedAt = val;
  }

  if (query.preNotes) filter.preNotes = String(query.preNotes);
  if (query.postNotes) filter.postNotes = String(query.postNotes);

  if (query.id) filter.id = String(query.id);

  // billing (objeto anidado dinámico)
  if (query.billingSource) {
    filter.billing = {
      source: query.billingSource,
      ...(query.promotionId && { promotionId: query.promotionId }),
      ...(query.subscriptionId && { subscriptionId: query.subscriptionId }),
    };
  }

  // cancellation (si lo mandas como JSON string)
  if (query.cancellation) {
    try {
      filter.cancellation = JSON.parse(query.cancellation);
    } catch {
      // ignorar si viene mal formado
    }
  }

  return filter;
}