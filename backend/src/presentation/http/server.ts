import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { createPatientModule } from '../../modules/patient/patient.module';
import { createServiceModule } from '../../modules/services/service.module';
import { createSpecialityModule } from '../../modules/speciality.module';
import { createMedicModule } from '../../modules/medic.module';
import { createAppointmentModule } from '../../modules/appointment.module';
import { createMedicalRecordModule } from '../../modules/medicalRecord.module';
import { createreceptionistModule } from '../../modules/receptionist.module';
import { createAuthModule } from '../../modules/auth.module';
import { createPlanModule } from '../../modules/plan.module';
import { createSubscriptionModule } from '../../modules/subscription.module';

const app = express();
const patientModule = createPatientModule();
const serviceModule = createServiceModule();
const specialityModule = createSpecialityModule();
const medicModule = createMedicModule();
const appointmentModule = createAppointmentModule();
const medicalRecordModule = createMedicalRecordModule();
const receptionistModule = createreceptionistModule();
const authModule = createAuthModule();
const planModule = createPlanModule();
const subscriptionModule = createSubscriptionModule();

app.use(
  cors({
    credentials: true,
  }),
);

app.use(cookieParser());
app.use(express.json());

app.use('/patients', patientModule.router);
app.use('/services', serviceModule.router);
app.use('/specialities', specialityModule.router);
app.use('/medics', medicModule.router);
app.use('/appointments', appointmentModule.router);
app.use('/medicalRecords', medicalRecordModule.router);
app.use('/receptionists', receptionistModule.router);
app.use('/auth', authModule.router);
app.use('/plans', planModule.router);
app.use('/subscriptions', subscriptionModule.router);

//cambiar de lugar y hacer mejor
app.use((err, req, res, next) => {
  console.error(err);

  res.status(500).json({
    message: err.message || 'Internal Server Error',
  });
});

export default app;
