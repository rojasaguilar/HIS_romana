import { Link } from "react-router-dom";
import { useMedics } from "../hooks/useMedics";

export const MedicsPage = () => {
  const { data, isLoading, isError } = useMedics();

  if (isLoading) {
    return <p>Loading medics...</p>;
  }

  if (isError) {
    return <p>Error loading medics</p>;
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
          alignItems: "center",
          marginBottom: "2rem",
        }}
      >
        <h1>Medics</h1>

        <Link to="/medics/create">
          <button>Create Medic</button>
        </Link>
      </div>

      <table
        width="100%"
        style={{
          borderCollapse: "collapse",
        }}
      >
        <thead>
          <tr>
            <th
              style={{
                border: "1px solid gray",
                padding: "0.75rem",
              }}
            >
              Name
            </th>

            <th
              style={{
                border: "1px solid gray",
                padding: "0.75rem",
              }}
            >
              Email
            </th>

            <th
              style={{
                border: "1px solid gray",
                padding: "0.75rem",
              }}
            >
              Phone
            </th>

            <th
              style={{
                border: "1px solid gray",
                padding: "0.75rem",
              }}
            >
              Type
            </th>

            <th
              style={{
                border: "1px solid gray",
                padding: "0.75rem",
              }}
            >
              Medical School
            </th>

            <th
              style={{
                border: "1px solid gray",
                padding: "0.75rem",
              }}
            >
              Consultation Fee
            </th>

            <th
              style={{
                border: "1px solid gray",
                padding: "0.75rem",
              }}
            >
              Status
            </th>
          </tr>
        </thead>

        <tbody>
          {data?.map((medic) => (
            <tr key={medic.id}>
              <td
                style={{
                  border: "1px solid gray",
                  padding: "0.75rem",
                }}
              >
                {medic.name}
              </td>

              <td
                style={{
                  border: "1px solid gray",
                  padding: "0.75rem",
                }}
              >
                {medic.email}
              </td>

              <td
                style={{
                  border: "1px solid gray",
                  padding: "0.75rem",
                }}
              >
                {medic.phoneNumber}
              </td>

              <td
                style={{
                  border: "1px solid gray",
                  padding: "0.75rem",
                }}
              >
                {medic.type}
              </td>

              <td
                style={{
                  border: "1px solid gray",
                  padding: "0.75rem",
                }}
              >
                {medic.medicalSchool}
              </td>

              <td
                style={{
                  border: "1px solid gray",
                  padding: "0.75rem",
                }}
              >
                {medic.consultationFee}%
              </td>

              <td
                style={{
                  border: "1px solid gray",
                  padding: "0.75rem",
                }}
              >
                {medic.isActive ? "Active" : "Inactive"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
