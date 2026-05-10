import { usePlans } from "../hooks/usePlans";

import { PlanCard } from "../components/PlanCard";

export const PlansPage = () => {
  const { data: plans, isLoading } = usePlans();

  console.log(plans);

  if (isLoading) {
    return <p>Loading plans...</p>;
  }

  return (
    <div
      style={{
        padding: "2rem",
      }}
    >
      <h1>Available Plans</h1>

      <div
        style={{
          display: "grid",

          gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",

          gap: "2rem",

          marginTop: "2rem",
        }}
      >
        {plans?.map((plan) => (
          <PlanCard key={plan.id} plan={plan} />
        ))}
      </div>
    </div>
  );
};
