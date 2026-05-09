import type {
  ServiceModality,
} from "../types/service.types";

export interface UpdateServiceDTO {
  name?: string;

  duration?: number;

  cost?: number;

  modalities?: ServiceModality[];

  specialityId?: string;
}