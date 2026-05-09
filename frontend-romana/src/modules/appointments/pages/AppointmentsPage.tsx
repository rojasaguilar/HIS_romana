import { Link } from "react-router-dom";

import { useAppointments } from "../hooks/useAppointments";

import { usePatients } from "@/modules/patients/hooks/usePatients";

import { useMedics } from "@/modules/medics/hooks/useMedics";

import { useServices } from "@/modules/services/hooks/useServices";

export const AppointmentsPage = () => {
  const { data: appointments, isLoading } = useAppointments();

  const { data: patients } = usePatients();

  const { data: medics } = useMedics();

  const { data: services } = useServices();

  const getPatientName = (patientId: string) => {
    return (
      patients?.find((patient) => patient.id === patientId)?.name ?? "Unknown"
    );
  };

  const getMedicName = (medicId: string) => {
    return medics?.find((medic) => medic.id === medicId)?.name ?? "Unknown";
  };

  const getServiceName = (serviceId: string) => {
    return (
      services?.find((service) => service.id === serviceId)?.name ?? "Unknown"
    );
  };

  if (isLoading) {
    return <p>Loading appointments...</p>;
  }

  return (
    <div
      style={{
        padding: "2rem",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "2rem",
        }}
      >
        <h1>Appointments</h1>

        <Link to="/appointments/schedule">
          <button>Schedule Appointment</button>
        </Link>
      </div>

      <table width="100%">
        <thead>
          <tr>
            <th>Patient</th>

            <th>Medic</th>

            <th>Service</th>

            <th>Date</th>

            <th>Status</th>

            <th>Type</th>
          </tr>
        </thead>

        <tbody>
          {appointments?.map((appointment) => (
            <tr key={appointment.id}>
              <td>{getPatientName(appointment.patientId)}</td>

              <td>{getMedicName(appointment.medicId)}</td>

              <td>{getServiceName(appointment.serviceId)}</td>

              <td>{new Date(appointment.startDate).toLocaleString()}</td>

              <td>{appointment.status}</td>

              <td>{appointment.type}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
