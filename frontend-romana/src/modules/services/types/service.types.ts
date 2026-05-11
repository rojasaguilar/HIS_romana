export type ServiceModality = 'IN_PERSON' | 'ONLINE';

export interface Service {
  id: string;

  name: string;

  duration: number;

  cost: number;

  modalities: ServiceModality[];

  specialityId: string;
}
