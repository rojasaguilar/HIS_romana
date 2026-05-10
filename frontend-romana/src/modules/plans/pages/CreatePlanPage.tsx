import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { useServices } from "@/modules/services/hooks/useServices";

import { useCreatePlan } from "../hooks/useCreatePlan";

interface VariantService {
  serviceId: string;

  visits: number;
}

interface Variant {
  durationInMonths: number;

  price: number;

  monthlyVisitsIncluded: VariantService[];
}

export const CreatePlanPage = () => {
  const navigate = useNavigate();

  const createPlan = useCreatePlan();

  const { data: services } = useServices();

  const [name, setName] = useState("");

  const [description, setDescription] = useState("");

  const [isActive, setIsActive] = useState(true);

  const [variants, setVariants] = useState<Variant[]>([
    {
      durationInMonths: 1,

      price: 0,

      monthlyVisitsIncluded: [],
    },
  ]);

  const updateVariant = (
    index: number,
    field: keyof Variant,
    value: any,
  ) => {
    const updated = [...variants];

    updated[index] = {
      ...updated[index],

      [field]: value,
    };

    setVariants(updated);
  };

  const addVariant = () => {
    setVariants([
      ...variants,

      {
        durationInMonths: 3,

        price: 0,

        monthlyVisitsIncluded: [],
      },
    ]);
  };

  const toggleService = (
    variantIndex: number,
    serviceId: string,
  ) => {
    const updated = [...variants];

    const exists =
      updated[
        variantIndex
      ].monthlyVisitsIncluded.find(
        (service) =>
          service.serviceId ===
          serviceId,
      );

    if (exists) {
      updated[
        variantIndex
      ].monthlyVisitsIncluded =
        updated[
          variantIndex
        ].monthlyVisitsIncluded.filter(
          (service) =>
            service.serviceId !==
            serviceId,
        );
    } else {
      updated[
        variantIndex
      ].monthlyVisitsIncluded.push(
        {
          serviceId,

          visits: 1,
        },
      );
    }

    setVariants(updated);
  };

  const updateVisits = (
    variantIndex: number,
    serviceId: string,
    visits: number,
  ) => {
    const updated = [...variants];

    updated[
      variantIndex
    ].monthlyVisitsIncluded =
      updated[
        variantIndex
      ].monthlyVisitsIncluded.map(
        (service) =>
          service.serviceId ===
          serviceId
            ? {
                ...service,

                visits,
              }
            : service,
      );

    setVariants(updated);
  };

  const handleSubmit = async (
    e: React.FormEvent,
  ) => {
    e.preventDefault();

    createPlan.mutate(
      {
        name,

        description,

        isActive,

        variants,
      },

      {
        onSuccess: () => {
          navigate("/plans/admin");
        },
      },
    );
  };

  return (
    <div
      style={{
        padding: "2rem",

        maxWidth: "1200px",

        margin: "0 auto",
      }}
    >
      <h1>Create Plan</h1>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",

          flexDirection: "column",

          gap: "2rem",
        }}
      >
        <div>
          <h3>Plan Name</h3>

          <input
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            placeholder="Premium Plus"
            style={{
              width: "100%",

              padding: "1rem",
            }}
          />
        </div>

        <div>
          <h3>Description</h3>

          <textarea
            value={description}
            onChange={(e) =>
              setDescription(
                e.target.value,
              )
            }
            placeholder="Plan description..."
            style={{
              width: "100%",

              minHeight: "120px",

              padding: "1rem",
            }}
          />
        </div>

        <label
          style={{
            display: "flex",

            gap: ".5rem",

            alignItems: "center",
          }}
        >
          <input
            type="checkbox"
            checked={isActive}
            onChange={(e) =>
              setIsActive(
                e.target.checked,
              )
            }
          />

          Active Plan
        </label>

        <div
          style={{
            display: "flex",

            flexDirection: "column",

            gap: "2rem",
          }}
        >
          {variants.map(
            (variant, variantIndex) => (
              <div
                key={variantIndex}
                style={{
                  border:
                    "1px solid #ddd",

                  borderRadius: "16px",

                  padding: "2rem",

                  display: "flex",

                  flexDirection:
                    "column",

                  gap: "1.5rem",

                  background:
                    "#fafafa",
                }}
              >
                <div
                  style={{
                    display: "flex",

                    justifyContent:
                      "space-between",

                    alignItems:
                      "center",
                  }}
                >
                  <h2>
                    Variant #
                    {variantIndex + 1}
                  </h2>
                </div>

                <div
                  style={{
                    display: "grid",

                    gridTemplateColumns:
                      "1fr 1fr",

                    gap: "1rem",
                  }}
                >
                  <div>
                    <h4>
                      Duration
                      (months)
                    </h4>

                    <input
                      type="number"
                      value={
                        variant.durationInMonths
                      }
                      onChange={(e) =>
                        updateVariant(
                          variantIndex,

                          "durationInMonths",

                          Number(
                            e.target
                              .value,
                          ),
                        )
                      }
                      style={{
                        width:
                          "100%",

                        padding:
                          ".8rem",
                      }}
                    />
                  </div>

                  <div>
                    <h4>Price</h4>

                    <input
                      type="number"
                      value={
                        variant.price
                      }
                      onChange={(e) =>
                        updateVariant(
                          variantIndex,

                          "price",

                          Number(
                            e.target
                              .value,
                          ),
                        )
                      }
                      style={{
                        width:
                          "100%",

                        padding:
                          ".8rem",
                      }}
                    />
                  </div>
                </div>

                <div>
                  <h3>
                    Included Services
                  </h3>

                  <div
                    style={{
                      display:
                        "grid",

                      gridTemplateColumns:
                        "repeat(auto-fill,minmax(260px,1fr))",

                      gap: "1rem",

                      marginTop:
                        "1rem",
                    }}
                  >
                    {services?.map(
                      (service) => {
                        const selected =
                          variant.monthlyVisitsIncluded.some(
                            (
                              selectedService,
                            ) =>
                              selectedService.serviceId ===
                              service.id,
                          );

                        const currentService =
                          variant.monthlyVisitsIncluded.find(
                            (
                              selectedService,
                            ) =>
                              selectedService.serviceId ===
                              service.id,
                          );

                        return (
                          <div
                            key={
                              service.id
                            }
                            style={{
                              border:
                                selected
                                  ? "2px solid #2563eb"
                                  : "1px solid #ccc",

                              borderRadius:
                                "14px",

                              padding:
                                "1rem",

                              cursor:
                                "pointer",

                              background:
                                selected
                                  ? "#eff6ff"
                                  : "white",
                            }}
                            onClick={() =>
                              toggleService(
                                variantIndex,

                                service.id,
                              )
                            }
                          >
                            <h4>
                              {
                                service.name
                              }
                            </h4>

                            <p>
                              {
                                service.duration
                              }{" "}
                              min
                            </p>

                            <p>
                              $
                              {
                                service.cost
                              }
                            </p>

                            {selected && (
                              <div
                                style={{
                                  marginTop:
                                    "1rem",
                                }}
                                onClick={(
                                  e,
                                ) =>
                                  e.stopPropagation()
                                }
                              >
                                <label>
                                  Visits
                                  per month
                                </label>

                                <input
                                  type="number"
                                  min={1}
                                  value={
                                    currentService?.visits ??
                                    1
                                  }
                                  onChange={(
                                    e,
                                  ) =>
                                    updateVisits(
                                      variantIndex,

                                      service.id,

                                      Number(
                                        e
                                          .target
                                          .value,
                                      ),
                                    )
                                  }
                                  style={{
                                    width:
                                      "100%",

                                    padding:
                                      ".7rem",

                                    marginTop:
                                      ".5rem",
                                  }}
                                />
                              </div>
                            )}
                          </div>
                        );
                      },
                    )}
                  </div>
                </div>
              </div>
            ),
          )}
        </div>

        <button
          type="button"
          onClick={addVariant}
          style={{
            padding: "1rem",

            cursor: "pointer",
          }}
        >
          + Add Variant
        </button>

        <button
          type="submit"
          disabled={
            createPlan.isPending
          }
          style={{
            padding: "1rem",

            cursor: "pointer",
          }}
        >
          {createPlan.isPending
            ? "Saving..."
            : "Create Plan"}
        </button>
      </form>
    </div>
  );
};