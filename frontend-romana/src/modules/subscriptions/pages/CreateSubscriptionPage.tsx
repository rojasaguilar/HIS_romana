import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { usePatients } from "@/modules/patients/hooks/usePatients";

import { usePlans } from "@/modules/plans/hooks/usePlans";

import { useCreateSubscription } from "../hooks/useCreateSubscription";

export const CreateSubscriptionPage = () => {
  const navigate = useNavigate();

  const createSubscription = useCreateSubscription();

  const { data: patients } = usePatients();

  const { data: plans } = usePlans();

  const [patientId, setPatientId] = useState("");

  const [planId, setPlanId] = useState("");

  const [variantId, setVariantId] = useState("");

  const [startDate, setStartDate] = useState("");

  const selectedPlan = plans?.find((plan) => plan.id === planId);

  console.log({ patientId, planId, variantId, startDate });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    createSubscription.mutate(
      {
        patientId,

        planId,

        variantId,

        startDate,
      },

      {
        onSuccess: () => {
          navigate("/subscriptions");
        },
      },
    );
  };

  return (
    <div
      style={{
        padding: "2rem",

        maxWidth: "1000px",

        margin: "0 auto",
      }}
    >
      <h1>Create Subscription</h1>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",

          flexDirection: "column",

          gap: "2rem",
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

        <section>
          <h3>Plan</h3>

          <section
            style={{
              display: "grid",

              gridTemplateColumns: "repeat(auto-fill,minmax(250px,1fr))",

              gap: "1rem",
            }}
          >
            {plans?.map((plan) => (
              <div
                key={plan.id}
                onClick={() => setPlanId(plan.id)}
                style={{
                  border:
                    planId === plan.id ? "2px solid blue" : "1px solid #ccc",

                  borderRadius: "16px",

                  padding: "1rem",

                  cursor: "pointer",
                }}
              >
                <h3>{plan.name}</h3>

                <p>{plan.description}</p>
              </div>
            ))}
          </section>
        </section>

        {selectedPlan && (
          <div>
            <h3>Select Variant</h3>

            <div
              style={{
                display: "grid",

                gridTemplateColumns: "repeat(auto-fill,minmax(250px,1fr))",

                gap: "1rem",
              }}
            >
              {selectedPlan.variants.map((variant) => (
                <div
                  key={variant.id}
                  onClick={() => setVariantId(variant.id)}
                  style={{
                    border:
                      variantId === variant.id
                        ? "2px solid green"
                        : "1px solid #ccc",

                    borderRadius: "16px",

                    padding: "1rem",

                    cursor: "pointer",
                  }}
                >
                  <h3>{variant.durationInMonths} months</h3>

                  <h2>${variant.price}</h2>

                  <div>
                    {variant.monthlyVisitsIncluded.map((service) => (
                      <p>
                        {" "}
                        {service.serviceId}• {service.visits} visits
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div>
          <h3>Start Date</h3>

          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>

        <button type="submit">Create Subscription</button>
      </form>
    </div>
  );
};
