import { Request, Response } from 'express';

import { CreatePlanUseCase } from '../../../core/usecases/plan/create-plan.usecase';
import { UpdatePlanUseCase } from '../../../core/usecases/plan/update-plan.usecase';
import { FindPlanByIdUseCase } from '../../../core/usecases/plan/get-planById.usecase';
import { FindAllPlansUseCase } from '../../../core/usecases/plan/getAll-plan.usecase';
import { asyncHandler } from '../middlewares/asyncHandler';

export class PlanController {
  constructor(
    private createPlanUseCase: CreatePlanUseCase,
    private findPlanByIdUseCase: FindPlanByIdUseCase,
    private findAllPlansUseCase: FindAllPlansUseCase,
    private updatePlanUseCase: UpdatePlanUseCase,
  ) {}

  createPlan = asyncHandler(async (req: Request, res: Response) => {
    const plan = await this.createPlanUseCase.execute(req.body);
    res.status(201).json(plan);
  });

  getPlanById = asyncHandler<{ id: string }>(async (req, res) => {
    const { id } = req.params;
    const plan = await this.findPlanByIdUseCase.execute(id);
    res.status(200).json(plan);
  });

  getPlans = asyncHandler(async (_req: Request, res: Response) => {
    const plans = await this.findAllPlansUseCase.execute();
    res.status(200).json(plans);
  });

  updatePlan = asyncHandler<{ id: string }>(async (req, res) => {
    const { id } = req.params;

    const updatedPlan = await this.updatePlanUseCase.execute({
      id,
      ...req.body,
    });

    res.status(200).json(updatedPlan);
  });
}
