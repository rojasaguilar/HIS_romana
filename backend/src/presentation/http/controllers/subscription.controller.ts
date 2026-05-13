import { Request, Response } from 'express';

import { CreateSubscriptionUseCase } from '../../../core/usecases/subscription/create-subscription.usecase';
import { FindSubscriptionByIdUseCase } from '../../../core/usecases/subscription/find-subscription-by-id.usecase';
import { FindAllSubscriptionsUseCase } from '../../../core/usecases/subscription/find-all-subscriptions.usecase';
import { UpdateSubscriptionUseCase } from '../../../core/usecases/subscription/update-subscription.usecase';
import { asyncHandler } from '../middlewares/asyncHandler';
import { GetActiveSubscriptionByPatientUseCase } from '../../../core/usecases/appoitments/get-active-subscription-by-patient.usecase';

export class SubscriptionController {
  constructor(
    private createSubscriptionUseCase: CreateSubscriptionUseCase,
    private findSubscriptionByIdUseCase: FindSubscriptionByIdUseCase,
    private findAllSubscriptionsUseCase: FindAllSubscriptionsUseCase,
    private updateSubscriptionUseCase: UpdateSubscriptionUseCase,
    private getActiveSubscriptionByPatientUseCase: GetActiveSubscriptionByPatientUseCase,
  ) {}

  createSubscription = asyncHandler(async (req: Request, res: Response) => {
    const subscription = await this.createSubscriptionUseCase.execute(req.body);
    res.status(201).json(subscription);
  });

  getSubscriptionById = asyncHandler<{ id: string }>(async (req, res) => {
    const { id } = req.params;

    const subscription = await this.findSubscriptionByIdUseCase.execute(id);

    res.status(200).json(subscription);
  });

  getSubscriptions = asyncHandler(async (_req: Request, res: Response) => {
    const subscriptions = await this.findAllSubscriptionsUseCase.execute();

    res.status(200).json(subscriptions);
  });

  updateSubscription = asyncHandler<{ id: string }>(async (req, res) => {
    const { id } = req.params;

    const updated = await this.updateSubscriptionUseCase.execute({
      id,
      ...req.body,
    });

    res.status(200).json(updated);
  });

  getActiveByPatient = async (req: Request<{ patientId: string }>, res: Response) => {
    const { patientId } = req.params;

    const subscription =
      await this.getActiveSubscriptionByPatientUseCase.execute(patientId);

    if (!subscription) {
      return res.status(404).json(null);
    }

    return res.json(subscription);
  };
}
