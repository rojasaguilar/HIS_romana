import { Link } from "react-router-dom";

import { usePatients } from "../hooks/usePatients";

export const PatientsPage = () => {
  const { data, isLoading } =
    usePatients();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent:
            "space-between",
          alignItems: "center",
          marginBottom: "1rem",
        }}
      >
        <h1>Patients</h1>

        <Link to="/patients/create">
          <button>
            Create Patient
          </button>
        </Link>
      </div>

      {data?.map((patient) => (
        <div
          key={patient.id}
          style={{
            border:
              "1px solid gray",
            padding: "1rem",
            marginBottom:
              "1rem",
          }}
        >
          <p>
            {patient.name}
          </p>

          <p>
            {patient.email}
          </p>

          <p>
            {patient.phoneNumber}
          </p>
        </div>
      ))}
    </div>
  );
};