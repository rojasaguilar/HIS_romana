import { Relationship } from './relationship.vo';

export class FamilyHistory {
  constructor(
    public relation: Relationship,
    public diseaseId: string,
  ) {}
}
