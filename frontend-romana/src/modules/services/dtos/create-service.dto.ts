import type {
  ServiceModality,
} from "../types/service.types";

export interface CreateServiceDTO {
  name: string;

  duration: number;

  cost: number;

  modalities: ServiceModality[];

  specialityId: string;
}