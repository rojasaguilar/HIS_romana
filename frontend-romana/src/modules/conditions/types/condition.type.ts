// src/modules/conditions/types/condition.types.ts

export interface Condition {
  id: string;

  code: string;

  name: string;

  category: string;

  description?: string;

  isChronic: boolean;

  isActive: boolean;

  createdAt: string;

  updatedAt: string;
}