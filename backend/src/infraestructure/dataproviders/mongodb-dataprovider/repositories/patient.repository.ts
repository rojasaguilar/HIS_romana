import PatientModel from "../models/patient.model.ts";
import Patient from "./../../../../core/domain/entities/patient.entity.ts";
//persist the data

export class PatientRepository {
  
    async createPatient(patient: Patient): Promise<Patient> {
    
    const createdPatient = await PatientModel.create(patient);
    
    return createdPatient.toObject() as Patient;
  }

  // Other CRUD methods (find, update, delete) can be implemented similarly
}

export default PatientRepository;
