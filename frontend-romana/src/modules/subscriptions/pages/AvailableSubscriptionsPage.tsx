import { useSubscriptions } from "../hooks/useSubscriptions";

import { SubscriptionCard } from "../components/SubscriptionCard";

export const AvailableSubscriptionsPage =
  () => {
    const {
      data: subscriptions,
      isLoading,
    } = useSubscriptions();

    if (isLoading) {
      return (
        <p>
          Loading subscriptions...
        </p>
      );
    }

    return (
      <div
        style={{
          padding: "2rem",
        }}
      >
        <h1>
          Available Subscriptions
        </h1>

        <div
          style={{
            display: "grid",

            gridTemplateColumns:
              "repeat(auto-fill, minmax(320px, 1fr))",

            gap: "1.5rem",

            marginTop:
              "2rem",
          }}
        >
          {subscriptions?.map(
            (
              subscription
            ) => (
              <SubscriptionCard
                key={
                  subscription.id
                }
                subscription={
                  subscription
                }
              />
            )
          )}
        </div>
      </div>
    );
  };