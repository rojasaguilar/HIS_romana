import { AppointmentInconsistentStateError } from '../errors/appointment.error';

export const STATUS_VALUES = {
  PROGRAMADA: 'PROGRAMADA',
  CANCELADA: 'CANCELADA',
  COMPLETADA: 'COMPLETADA',
  NO_ASISTIO: 'NO_ASISTIO',
} as const;

export type Status = (typeof STATUS_VALUES)[keyof typeof STATUS_VALUES];

export const parseStatus = (status: string) => {
  const values = Object.values(STATUS_VALUES);

  if (!values.includes(status as Status))
    throw new AppointmentInconsistentStateError(`Status: ${status} not valid`);

  return status as Status;
};
