import { AppointmentEntity } from "../../../../core/domain/entities/appointment.entity";
import { IAppointmentRepository } from "../../../../core/domain/repositories/appointment.repository.interface";
import 

export class AppointmentRepository implements IAppointmentRepository{
    save(appointment: AppointmentEntity): Promise<AppointmentEntity> {
        throw new Error("Method not implemented.");
    }
    findById(id: string): Promise<AppointmentEntity | null> {
        throw new Error("Method not implemented.");
    }
    getAll(): Promise<AppointmentEntity[]> {
        throw new Error("Method not implemented.");
    }
    overlaps(medicId: string, startDate: Date, duration: number): Promise<boolean> {
        const result = await 
    }
    
}