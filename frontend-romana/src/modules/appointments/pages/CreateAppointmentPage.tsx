import { useState, type SetStateAction } from "react";

import { useNavigate } from "react-router-dom";

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import { useCreateAppointment } from "../hooks/useCreateAppointment";

import { usePatients } from "@/modules/patients/hooks/usePatients";

import { useMedics } from "@/modules/medics/hooks/useMedics";

import { useServices } from "@/modules/services/hooks/useServices";

import type {
  AppointmentType,
  BillingSource,
} from "../types/appointment.types";
import { useSpecialities } from "@/modules/specialities/hooks/useSpecialities";

export const CreateAppointmentPage = () => {
  const navigate = useNavigate();

  const createAppointment = useCreateAppointment();

  const { data: patients } = usePatients();

  const { data: medics } = useMedics();

  const { data: services } = useServices();

  const { data: specialities } = useSpecialities();

  const getSpecialityName = (specialityId: string) =>
    specialities?.find((spec) => spec.id === specialityId)?.name ?? "GENERAL";

  const [patientId, setPatientId] = useState("");

  const [medicId, setMedicId] = useState("");

  const [serviceId, setServiceId] = useState("");

  const [startDate, setStartDate] = useState<Date | null>(null);

  const [type, setType] = useState<AppointmentType>("IN_PERSON");

  const [billingSource, setBillingSource] = useState<BillingSource>("DIRECT");

  const [preNotes, setPreNotes] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!startDate) return;

    createAppointment.mutate(
      {
        patientId,

        medicId,

        serviceId,

        startDate: startDate.toISOString(),

        type,

        preNotes,

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
          gap: "1.5rem",
          maxWidth: "800px",
        }}
      >
        <div>
          <h3>Patient</h3>

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
        </div>

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

                  borderRadius: "10px",

                  padding: "1rem",

                  cursor: "pointer",
                }}
              >
                <h4>{medic.name}</h4>

                <p>{medic.email}</p>

                <p>{medic.medicalSchool}</p>

                <p>
                  {medic.specialityIds
                    ?.map((spec) => getSpecialityName(spec))
                    .join(", ")}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3>Service</h3>

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
        </div>

        <div>
          <h3>Appointment Date</h3>

          <DatePicker
            selected={startDate}
            onChange={(date: SetStateAction<Date | null>) => setStartDate(date)}
            showTimeSelect
            timeIntervals={30}
            dateFormat="MMMM d, yyyy h:mm aa"
            minDate={new Date()}
            placeholderText="Select appointment date"
            inline
          />
        </div>

        <div>
          <h3>Appointment Type</h3>

          <select
            value={type}
            onChange={(e) => setType(e.target.value as AppointmentType)}
          >
            <option value="IN_PERSON">IN PERSON</option>

            <option value="ONLINE">ONLINE</option>
          </select>
        </div>

        <div>
          <h3>Billing Source</h3>

          <select
            value={billingSource}
            onChange={(e) => setBillingSource(e.target.value as BillingSource)}
          >
            <option value="DIRECT">DIRECT</option>

            <option value="PROMOTION">PROMOTION</option>

            <option value="SUBSCRIPTION">SUBSCRIPTION</option>
          </select>
        </div>

        <div>
          <h3>Pre Notes</h3>

          <textarea
            placeholder="Appointment notes..."
            value={preNotes}
            onChange={(e) => setPreNotes(e.target.value)}
          />
        </div>

        <button
          type="submit"
          disabled={createAppointment.isPending}
          style={{
            padding: "1rem",
            cursor: "pointer",
          }}
        >
          {createAppointment.isPending ? "Saving..." : "Save Appointment"}
        </button>
      </form>
    </div>
  );
};
