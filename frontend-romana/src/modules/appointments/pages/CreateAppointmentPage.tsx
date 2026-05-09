import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { useCreateAppointment } from "../hooks/useCreateAppointment";

import { usePatients } from "@/modules/patients/hooks/usePatients";

import { useMedics } from "@/modules/medics/hooks/useMedics";

import { useServices } from "@/modules/services/hooks/useServices";

import type {
  AppointmentType,
  BillingSource,
} from "../types/appointment.types";

export const CreateAppointmentPage = () => {
  const navigate = useNavigate();

  const createAppointment = useCreateAppointment();

  const [billingSource, setBillingSource] = useState<BillingSource>("DIRECT");

  const { data: patients } = usePatients();

  const { data: medics } = useMedics();

  const { data: services } = useServices();

  const [patientId, setPatientId] = useState("");

  const [medicId, setMedicId] = useState("");

  const [serviceId, setServiceId] = useState("");

  const [startDate, setStartDate] = useState("");

  const [endTime, setEndTime] = useState("");

  const [type, setType] = useState<AppointmentType>("IN_PERSON");

  const [preNotes, setPreNotes] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    createAppointment.mutate(
      {
        patientId,

        medicId,

        serviceId,

        startDate,

        endTime,

        type,

        preNotes,

        status: "PROGRAMADA",

        patientCharge: 0,

        medicEarning: 0,

        billing: {
          source: billingSource,
        },
      },

      {
        onSuccess: () => {
          navigate("/appointments");
        },
      },
    );
  };

  return (
    <div
      style={{
        padding: "2rem",
      }}
    >
      <h1>Create Appointment</h1>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <select
          value={patientId}
          onChange={(e) => setPatientId(e.target.value)}
        >
          <option value="">Select patient</option>

          {patients?.map((patient) => (
            <option key={patient.id} value={patient.id}>
              {patient.name}
            </option>
          ))}
        </select>

        <div>
          <h3>Select Medic</h3>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
              gap: "1rem",
            }}
          >
            {medics?.map((medic) => (
              <div
                key={medic.id}
                onClick={() => setMedicId(medic.id)}
                style={{
                  border:
                    medicId === medic.id ? "3px solid blue" : "1px solid gray",

                  padding: "1rem",

                  cursor: "pointer",

                  borderRadius: "10px",
                }}
              >
                <h4>{medic.name}</h4>

                <p>{medic.email}</p>

                <p>{medic.medicalSchool}</p>
              </div>
            ))}
          </div>
        </div>

        <select
          value={serviceId}
          onChange={(e) => setServiceId(e.target.value)}
        >
          <option value="">Select service</option>

          {services?.map((service) => (
            <option key={service.id} value={service.id}>
              {service.name}
            </option>
          ))}
        </select>

        <input
          type="datetime-local"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />

        <input
          type="datetime-local"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
        />

        <textarea
          placeholder="Pre notes"
          value={preNotes}
          onChange={(e) => setPreNotes(e.target.value)}
        />

        <select
          value={type}
          onChange={(e) => setType(e.target.value as AppointmentType)}
        >
          <option value="IN_PERSON">IN PERSON</option>

          <option value="ONLINE">ONLINE</option>
        </select>

        <select
          value={billingSource}
          onChange={(e) => setBillingSource(e.target.value as BillingSource)}
        >
          <option value="DIRECT">DIRECT</option>

          <option value="PROMOTION">PROMOTION</option>

          <option value="SUBSCRIPTION">SUBSCRIPTION</option>
        </select>

        <button type="submit">Save Appointment</button>
      </form>
    </div>
  );
};
