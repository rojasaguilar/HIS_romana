import { Link } from "react-router-dom";

import { useServices } from "../hooks/useServices";
import { useSpecialities } from "@/modules/specialities/hooks/useSpecialities";

export const ServicesPage = () => {
  const { data, isLoading, isError } = useServices();

  const { data: specialities } = useSpecialities();

  const getSpecialityName = (specialityId: string) => {
    return (
      specialities?.find((speciality) => speciality.id === specialityId)
        ?.name ?? "Unknown"
    );
  };

  if (isLoading) {
    return <p>Loading services...</p>;
  }

  if (isError) {
    return <p>Error loading services</p>;
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
        <h1>Services</h1>

        <Link to="/services/create">
          <button>Create Service</button>
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
            <th>Name</th>

            <th>Duration</th>

            <th>Cost</th>

            <th>Modalities</th>

            <th>Speciality</th>
          </tr>
        </thead>

        <tbody>
          {data?.map((service) => (
            <tr key={service.id}>
              <td>{service.name}</td>

              <td>{service.duration} min</td>

              <td>${service.cost}</td>

              <td>{service.modalities.join(", ")}</td>

              <td>{getSpecialityName(service.specialityId)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
