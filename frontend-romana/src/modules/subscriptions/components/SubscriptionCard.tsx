import type {
  Subscription,
} from "../types/subscription.types";

import { useServices } from "@/modules/services/hooks/useServices";

interface Props {
  subscription: Subscription;
}

export const SubscriptionCard =
  ({
    subscription,
  }: Props) => {
    const {
      data: services,
    } = useServices();

    const getServiceName =
      (
        serviceId: string
      ) => {
        return (
          services?.find(
            (service) =>
              service.id ===
              serviceId
          )?.name ??
          "Unknown"
        );
      };

    return (
      <div
        style={{
          border:
            "1px solid #ccc",

          borderRadius:
            "12px",

          padding: "1.5rem",

          display: "flex",

          flexDirection:
            "column",

          gap: "1rem",

          boxShadow:
            "0 2px 8px rgba(0,0,0,0.1)",
        }}
      >
        <div>
          <h2>
            Plan #
            {
              subscription.planId
            }
          </h2>

          <p>
            Duration:{" "}
            {
              subscription.durationInMonths
            }{" "}
            months
          </p>

          <p>
            Price: $
            {
              subscription.price
            }
          </p>

          <p>
            Status:{" "}
            {
              subscription.status
            }
          </p>
        </div>

        <div>
          <h3>
            Included Services
          </h3>

          <ul>
            {subscription.monthlyVisitsIncluded.map(
              (
                service
              ) => (
                <li
                  key={
                    service.serviceId
                  }
                >
                  {getServiceName(
                    service.serviceId
                  )}{" "}
                  —{" "}
                  {
                    service.visits
                  }{" "}
                  visits/month
                </li>
              )
            )}
          </ul>
        </div>
      </div>
    );
  };