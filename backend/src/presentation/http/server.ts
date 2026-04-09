import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { createPatientModule } from '../../modules/patient/patient.module';
import { createServiceModule } from '../../modules/services/service.module';
import { createSpecialityModule } from '../../modules/speciality.module';
import { createMedicModule } from '../../modules/medic.module';

const app = express();
const patientModule = createPatientModule();
const serviceModule = createServiceModule();
const specialityModule = createSpecialityModule();
const medicModule = createMedicModule();

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

export default app;
