import EventEmitter from 'node:events';
import PatientEntity from '../../core/domain/entities/patient.entity';

export class PatientRegistration extends EventEmitter {
  register(patient: PatientEntity) {
    this.emit('', patient);
  }
}
