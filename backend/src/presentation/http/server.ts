import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { createPatientModule } from '../../modules/patient/patient.module';

const app = express();
const patientModule = createPatientModule();

app.use(
  cors({
    credentials: true,
  }),
);

app.use(cookieParser());
app.use(express.json());

app.use('/patients', patientModule.router);

export default app;
