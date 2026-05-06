import { SubscriptionEntity } from '../../domain/entities/subscription.entity';

export interface ISubscriptionRepository {
  /**
   * Crear una nueva suscripción
   */
  create(subscription: SubscriptionEntity): Promise<SubscriptionEntity>;

  /**
   * Obtener suscripción por ID
   */
  findById(id: string): Promise<SubscriptionEntity | null>;

  /**
   * Obtener suscripciones por paciente
   */
  findByPatientId(patientId: string): Promise<SubscriptionEntity[]>;

  /**
   * Obtener suscripción activa de un paciente
   * (regla común: solo una activa por paciente)
   */
  findActiveByPatientId(patientId: string): Promise<SubscriptionEntity | null>;

  /**
   * Obtener todas las suscripciones
   */
  findAll(): Promise<SubscriptionEntity[]>;

  /**
   * Actualizar suscripción completa
   */
  update(
    id: string,
    subscription: SubscriptionEntity,
  ): Promise<SubscriptionEntity | null>;

  /**
   * Cambiar estado a cancelada
   */
  cancel(id: string): Promise<void>;

  /**
   * Marcar como expirada
   */
  expire(id: string): Promise<void>;

  /**
   * Eliminar suscripción
   */
  delete(id: string): Promise<void>;
}
