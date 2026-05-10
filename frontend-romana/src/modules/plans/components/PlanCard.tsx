import { useServices } from "@/modules/services/hooks/useServices";
import type { Plan } from "../types/plan.types";

interface Props {
  plan: Plan;
}

export const PlanCard = ({ plan }: Props) => {
  const { data: services } = useServices();
  const getServiceName = (serviceId: string) =>
    services?.find((serv) => serv.id === serviceId)?.name ?? "GENERAL";

  return (
    <div
      style={{
        border: "1px solid #ddd",

        borderRadius: "16px",

        padding: "2rem",

        display: "flex",

        flexDirection: "column",

        gap: "1.5rem",

        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
      }}
    >
      <div>
        <h2>{plan.name}</h2>

        <p>{plan.description}</p>
      </div>

      <div
        style={{
          display: "flex",

          flexDirection: "column",

          gap: "1rem",
        }}
      >
        {plan.variants.map((variant, index) => (
          <div
            key={index}
            style={{
              border: "1px solid #ccc",

              borderRadius: "12px",

              padding: "1rem",
            }}
          >
            <h3>{variant.durationInMonths} months</h3>

            <h2>${variant.price}</h2>

            <div>
              <h4>Included Services</h4>

              <ul>
                {variant.monthlyVisitsIncluded.map((visit, index) => (
                  <li key={index}>
                    Service: {getServiceName(visit.serviceId)} — {visit.visits}{" "}
                    visits/month
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
