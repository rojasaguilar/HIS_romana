import { ScheduleAppointmentUseCase } from '../core/usecases/appoitments/schedule-appointment.usecase';
import { AppointmentController } from '../presentation/http/controllers/appointment.controller';
import { AppointmentRouter } from '../presentation/http/routes/appointment.routes';
import { AppointmentRepository } from '../infraestructure/dataproviders/mongodb-dataprovider/repositories/appointment.repository';
import { ServiceRepository } from '../infraestructure/dataproviders/mongodb-dataprovider/repositories/services.repository';
import { MedicRepository } from '../infraestructure/dataproviders/mongodb-dataprovider/repositories/medic.repository';
import PatientRepository from '../infraestructure/dataproviders/mongodb-dataprovider/repositories/patient.repository';
import { RescheduleAppointmentUseCase } from '../core/usecases/appoitments/reschedule-appointment.usecase';
import { GetAllAppointmentsUseCase } from '../core/usecases/appoitments/getAll-appointment.usecase';
import { FilterAppoinmentsUseCase } from '../core/usecases/appoitments/filter-appointments.usecase';
import { GetAppointmentByIdUseCase } from '../core/usecases/appoitments/get-appointment.usecase';
import { MongooseTransactionManager } from '../infraestructure/dataproviders/mongodb-dataprovider/mongoose-transaction.manager';
import { SubscriptionRepository } from '../infraestructure/dataproviders/mongodb-dataprovider/repositories/subscription.repository';
import { CompleteAppointmentUseCase } from '../core/usecases/appoitments/complete-appointment.use-case';

export const createAppointmentModule = () => {
  const appointmentRepository = new AppointmentRepository();
  const serviceRepository = new ServiceRepository();
  const patientRepository = new PatientRepository();
  const medicRepository = new MedicRepository();
  const subscriptionRepository = new SubscriptionRepository();
  const transactionManager = new MongooseTransactionManager();

  //USE CASES
  const scheduleAppointmentUseCase = new ScheduleAppointmentUseCase(
    appointmentRepository,
    serviceRepository,
    patientRepository,
    medicRepository,
    subscriptionRepository,
    transactionManager,
  );

  const rescheduleAppointmentUseCase = new RescheduleAppointmentUseCase(
    appointmentRepository,
    serviceRepository,
  );

  const getAllAppointmentsUseCase = new GetAllAppointmentsUseCase(
    appointmentRepository,
  );

  const filterAppointmentsUseCase = new FilterAppoinmentsUseCase(
    appointmentRepository,
  );

  const getAppointmentUseCase = new GetAppointmentByIdUseCase(
    appointmentRepository,
  );

  const completeAppointmentUseCase = new CompleteAppointmentUseCase(
    appointmentRepository,
  );

  const appointmentController = new AppointmentController(
    scheduleAppointmentUseCase,
    rescheduleAppointmentUseCase,
    getAllAppointmentsUseCase,
    filterAppointmentsUseCase,
    getAppointmentUseCase,
    completeAppointmentUseCase,
  );

  const appointmentRouter = new AppointmentRouter(appointmentController);

  return {
    router: appointmentRouter.router,
  };
};
