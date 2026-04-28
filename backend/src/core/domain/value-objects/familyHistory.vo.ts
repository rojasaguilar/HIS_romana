import { Relationship } from './relationship.vo';

export class FamilyHistory {
  constructor(
    public relationship: Relationship,
    public diseaseId: string,
  ) {}
}
