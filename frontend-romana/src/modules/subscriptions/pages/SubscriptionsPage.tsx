import { Link } from "react-router-dom";

import { useSubscriptions } from "../hooks/useSubscriptions";

import { usePatients } from "@/modules/patients/hooks/usePatients";

import { usePlans } from "@/modules/plans/hooks/usePlans";

export const SubscriptionsPage = () => {
  const { data, isLoading } = useSubscriptions();

  const { data: patients } = usePatients();

  const { data: plans } = usePlans();

  const getPatientName = (patientId: string) => {
    return patients?.find((p) => p.id === patientId)?.name;
  };

  const getPlanName = (planId: string) => {
    return plans?.find((p) => p.id === planId)?.name;
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("es-MX", {
      year: "numeric",

      month: "short",

      day: "numeric",
    });
  };

  if (isLoading) {
    return <p>Loading...</p>;
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
        <h1>Subscriptions</h1>

        <Link to="/subscriptions/create">
          <button>Subscribir paciente</button>
        </Link>
      </div>

      <table width="100%">
        <thead>
          <tr>
            <th>Patient</th>

            <th>Plan</th>

            <th>Version</th>

            <th>Status</th>

            <th>Start</th>

            <th>End</th>
          </tr>
        </thead>

        <tbody>
          {data?.map((subscription) => (
            <tr key={subscription.id}>
              <td>{getPatientName(subscription._patientId)}</td>

              <td>{getPlanName(subscription._planId)}</td>

              <td>{subscription._durationInMonths} meses</td>

              <td>{subscription._status}</td>

              <td>{formatDate(subscription._startDate)}</td>

              <td>{formatDate(subscription._endDate)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
