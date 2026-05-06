import { Request, Response } from 'express';

import { CreateSubscriptionUseCase } from '../../../core/usecases/subscription/create-subscription.usecase';
import { FindSubscriptionByIdUseCase } from '../../../core/usecases/subscription/find-subscription-by-id.usecase';
import { FindAllSubscriptionsUseCase } from '../../../core/usecases/subscription/find-all-subscriptions.usecase';
import { UpdateSubscriptionUseCase } from '../../../core/usecases/subscription/update-subscription.usecase';
import { asyncHandler } from '../middlewares/asyncHandler';

export class SubscriptionController {
  constructor(
    private createSubscriptionUseCase: CreateSubscriptionUseCase,
    private findSubscriptionByIdUseCase: FindSubscriptionByIdUseCase,
    private findAllSubscriptionsUseCase: FindAllSubscriptionsUseCase,
    private updateSubscriptionUseCase: UpdateSubscriptionUseCase,
  ) {}

  // 🔥 Crear suscripción
  createSubscription = asyncHandler(async (req: Request, res: Response) => {
    const subscription = await this.createSubscriptionUseCase.execute(req.body);
    res.status(201).json(subscription);
  });

  // 🔍 Obtener por ID
  getSubscriptionById = asyncHandler<{ id: string }>(async (req, res) => {
    const { id } = req.params;

    const subscription = await this.findSubscriptionByIdUseCase.execute(id);

    res.status(200).json(subscription);
  });

  // 📄 Obtener todas
  getSubscriptions = asyncHandler(async (_req: Request, res: Response) => {
    const subscriptions = await this.findAllSubscriptionsUseCase.execute();

    res.status(200).json(subscriptions);
  });

  // ✏️ Actualizar
  updateSubscription = asyncHandler<{ id: string }>(async (req, res) => {
    const { id } = req.params;

    const updated = await this.updateSubscriptionUseCase.execute({
      id,
      ...req.body,
    });

    res.status(200).json(updated);
  });
}
