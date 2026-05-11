// src/modules/patients/pages/PatientDetailsPage.tsx

import { useParams, Link } from "react-router-dom";

import { usePatient } from "../hooks/usePatient";

import { useSubscriptions } from "@/modules/subscriptions/hooks/useSubscriptions";

import { usePlans } from "@/modules/plans/hooks/usePlans";

import { useAppointments } from "@/modules/appointments/hooks/useAppointments";

export const PatientDetailsPage = () => {
  const { id } = useParams();

  const { data: patient, isLoading } = usePatient(id!);

  const { data: subscriptions } = useSubscriptions();

  const { data: plans } = usePlans();

  const { data: appointments } = useAppointments();

  if (isLoading || !patient) {
    return <p>Loading patient...</p>;
  }

  const patientSubscription = subscriptions?.find(
    (subscription) =>
      subscription._patientId === patient.id &&
      subscription._status === "active",
  );

  const plan = plans?.find((plan) => plan.id === patientSubscription?._planId);

  const patientAppointments =
    appointments?.filter(
      (appointment) => appointment.patientId === patient.id,
    ) || [];

  const completedAppointments = patientAppointments.filter(
    (appointment) => appointment.status === "COMPLETADA",
  );

  const attendance =
    patientAppointments.length > 0
      ? Math.round(
          (completedAppointments.length / patientAppointments.length) * 100,
        )
      : 0;

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("es-MX", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div
      style={{
        padding: "2rem",

        background: "#f8fafc",

        minHeight: "100vh",
      }}
    >
      {/* HEADER */}
      {/* <div
        style={{
          marginBottom: "2rem",
        }}
      >
        <h1
          style={{
            fontSize: "2rem",

            fontWeight: 700,

            marginBottom: ".3rem",
          }}
        >
          {patient.name}
        </h1>

        <p
          style={{
            color: "#64748b",
          }}
        >
          Información del cliente
        </p>
      </div> */}
      {/* BACK */}
      <Link
        to="/patients"
        style={{
          textDecoration: "none",

          color: "#64748b",

          display: "inline-block",

          marginBottom: "1.5rem",
        }}
      >
        ← Volver a Pacientes
      </Link>

      {/* PROFILE CARD */}

      <div
        style={{
          background: "white",

          borderRadius: "1rem",

          padding: "2rem",

          display: "flex",

          justifyContent: "space-between",

          alignItems: "center",

          border: "1px solid #e2e8f0",

          marginBottom: "1.5rem",
        }}
      >
        <div
          style={{
            display: "flex",

            gap: "1.5rem",

            alignItems: "center",
          }}
        >
          <div
            style={{
              width: "80px",

              height: "80px",

              borderRadius: "999px",

              background: "#ede9fe",

              display: "flex",

              alignItems: "center",

              justifyContent: "center",

              fontSize: "2rem",

              color: "#7c3aed",

              fontWeight: 700,
            }}
          >
            {patient.name.charAt(0)}
          </div>

          <div>
            <h2
              style={{
                fontSize: "1.8rem",

                marginBottom: ".5rem",
              }}
            >
              {patient.name}
            </h2>

            <div
              style={{
                display: "flex",

                flexDirection: "column",

                gap: ".4rem",

                color: "#64748b",
              }}
            >
              <span>{patient.email}</span>

              <span>{patient.phoneNumber}</span>

              <span>
                {patient.address.street}, {patient.address.city}
              </span>
            </div>
          </div>
        </div>

        <div>
          <span
            style={{
              background: patient.isActive ? "#dcfce7" : "#fee2e2",

              color: patient.isActive ? "#166534" : "#991b1b",

              padding: ".5rem 1rem",

              borderRadius: "999px",

              fontWeight: 600,
            }}
          >
            {patient.isActive ? "activo" : "inactivo"}
          </span>
        </div>
      </div>

      {/* STATS */}
      <div
        style={{
          display: "grid",

          gridTemplateColumns: "repeat(3, 1fr)",

          gap: "1rem",

          marginBottom: "1.5rem",
        }}
      >
        {/* PLAN */}
        <div
          style={{
            background: "white",

            borderRadius: "1rem",

            padding: "1.5rem",

            border: "1px solid #e2e8f0",
          }}
        >
          <p
            style={{
              color: "#64748b",

              marginBottom: ".5rem",
            }}
          >
            Suscripción
          </p>

          <h3>{plan?.name || "Sin plan"}</h3>

          {patientSubscription && (
            <p
              style={{
                color: "#64748b",

                marginTop: ".5rem",
              }}
            >
              Vence: {formatDate(patientSubscription._endDate)}
            </p>
          )}
        </div>

        {/* APPOINTMENTS */}
        <div
          style={{
            background: "white",

            borderRadius: "1rem",

            padding: "1.5rem",

            border: "1px solid #e2e8f0",
          }}
        >
          <p
            style={{
              color: "#64748b",

              marginBottom: ".5rem",
            }}
          >
            Total Citas
          </p>

          <h3>{patientAppointments.length}</h3>
        </div>

        {/* COMPLETED */}
        <div
          style={{
            background: "white",

            borderRadius: "1rem",

            padding: "1.5rem",

            border: "1px solid #e2e8f0",
          }}
        >
          <p
            style={{
              color: "#64748b",

              marginBottom: ".5rem",
            }}
          >
            Citas Completadas
          </p>

          <h3>{completedAppointments.length}</h3>

          <p
            style={{
              marginTop: ".5rem",

              color: "#64748b",
            }}
          >
            Asistencia: {attendance}%
          </p>
        </div>
      </div>

      {/* CONTENT */}
      <div
        style={{
          background: "white",

          borderRadius: "1rem",

          padding: "2rem",

          border: "1px solid #e2e8f0",
        }}
      >
        <h2
          style={{
            marginBottom: "2rem",
          }}
        >
          Información General
        </h2>

        {/* PERSONAL INFO */}
        <div
          style={{
            marginBottom: "2rem",
          }}
        >
          <h3
            style={{
              marginBottom: "1rem",
            }}
          >
            Datos Personales
          </h3>

          <div
            style={{
              display: "grid",

              gridTemplateColumns: "repeat(2, 1fr)",

              gap: "1rem",
            }}
          >
            <div>
              <p
                style={{
                  color: "#64748b",
                }}
              >
                Fecha de Nacimiento
              </p>

              <strong>{formatDate(patient.birthDate)}</strong>
            </div>

            <div>
              <p
                style={{
                  color: "#64748b",
                }}
              >
                Tipo de Sangre
              </p>

              <strong>{patient.bloodType}</strong>
            </div>

            <div>
              <p
                style={{
                  color: "#64748b",
                }}
              >
                Alergias
              </p>

              <strong>{patient.allergies.join(", ") || "Sin alergias"}</strong>
            </div>

            <div>
              <p
                style={{
                  color: "#64748b",
                }}
              >
                Contacto de Emergencia
              </p>

              <strong>
                {patient.emergencyContact?.name} -{" "}
                {patient.emergencyContact?.phoneNumber}
              </strong>
            </div>
          </div>
        </div>

        {/* SUBSCRIPTION */}
        {patientSubscription && (
          <div>
            <h3
              style={{
                marginBottom: "1rem",
              }}
            >
              Información de Suscripción
            </h3>

            <div
              style={{
                borderTop: "1px solid #e2e8f0",

                paddingTop: "1rem",
              }}
            >
              <h4>{plan?.name}</h4>

              <p
                style={{
                  color: "#22c55e",

                  margin: ".5rem 0",
                }}
              >
                Estado: activa
              </p>

              <p
                style={{
                  color: "#64748b",
                }}
              >
                Periodo: {formatDate(patientSubscription._startDate)} -{" "}
                {formatDate(patientSubscription._endDate)}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
