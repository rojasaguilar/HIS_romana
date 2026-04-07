import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { createPatientModule } from '../../modules/patient/patient.module';
import { createServiceModule } from '../../modules/services/service.module';

const app = express();
const patientModule = createPatientModule();
const serviceModule = createServiceModule();

app.use(
  cors({
    credentials: true,
  }),
);

app.use(cookieParser());
app.use(express.json());

app.use('/patients', patientModule.router);
app.use('/services', serviceModule.router);

export default app;
