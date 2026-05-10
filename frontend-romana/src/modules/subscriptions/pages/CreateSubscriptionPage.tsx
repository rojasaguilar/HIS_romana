import { useState } from "react";

import { useNavigate } from "react-router-dom";

import DatePicker from "react-datepicker";

import { usePatients } from "@/modules/patients/hooks/usePatients";

import { useServices } from "@/modules/services/hooks/useServices";

import { useCreateSubscription } from "../hooks/useCreateSubscription";

export const CreateSubscriptionPage =
  () => {
    const navigate =
      useNavigate();

    const createSubscription =
      useCreateSubscription();

    const {
      data: patients,
    } = usePatients();

    const {
      data: services,
    } = useServices();

    const [
      patientId,
      setPatientId,
    ] = useState("");

    const [planId,
      setPlanId] =
      useState("");

    const [
      durationInMonths,
      setDurationInMonths,
    ] = useState(1);

    const [price,
      setPrice] =
      useState(0);

    const [startDate,
      setStartDate] =
      useState<Date | null>(
        new Date()
      );

    const [
      monthlyVisitsIncluded,
      setMonthlyVisitsIncluded,
    ] = useState<
      {
        serviceId: string;

        visits: number;
      }[]
    >([]);

    const handleVisitsChange =
      (
        serviceId: string,
        visits: number
      ) => {
        setMonthlyVisitsIncluded(
          (prev) => {
            const existing =
              prev.find(
                (
                  service
                ) =>
                  service.serviceId ===
                  serviceId
              );

            if (
              existing
            ) {
              return prev.map(
                (
                  service
                ) =>
                  service.serviceId ===
                  serviceId
                    ? {
                        ...service,
                        visits,
                      }
                    : service
              );
            }

            return [
              ...prev,
              {
                serviceId,
                visits,
              },
            ];
          }
        );
      };

    const handleSubmit =
      async (
        e: React.FormEvent
      ) => {
        e.preventDefault();

        createSubscription.mutate(
          {
            patientId,

            planId,

            durationInMonths,

            price,

            startDate:
              startDate?.toISOString() ??
              "",

            monthlyVisitsIncluded,
          },

          {
            onSuccess: () => {
              navigate(
                "/subscriptions"
              );
            },
          }
        );
      };

    return (
      <div
        style={{
          padding: "2rem",
        }}
      >
        <h1>
          Create Subscription
        </h1>

        <form
          onSubmit={
            handleSubmit
          }
          style={{
            display: "flex",
            flexDirection:
              "column",
            gap: "1.5rem",
            maxWidth:
              "900px",
          }}
        >
          <div>
            <h3>
              Patient
            </h3>

            <select
              value={
                patientId
              }
              onChange={(e) =>
                setPatientId(
                  e.target.value
                )
              }
            >
              <option value="">
                Select patient
              </option>

              {patients?.map(
                (
                  patient
                ) => (
                  <option
                    key={
                      patient.id
                    }
                    value={
                      patient.id
                    }
                  >
                    {
                      patient.name
                    }
                  </option>
                )
              )}
            </select>
          </div>

          <input
            placeholder="Plan ID"
            value={planId}
            onChange={(e) =>
              setPlanId(
                e.target.value
              )
            }
          />

          <input
            type="number"
            placeholder="Duration in months"
            value={
              durationInMonths
            }
            onChange={(e) =>
              setDurationInMonths(
                Number(
                  e.target.value
                )
              )
            }
          />

          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) =>
              setPrice(
                Number(
                  e.target.value
                )
              )
            }
          />

          <div>
            <h3>
              Start Date
            </h3>

            <DatePicker
              selected={
                startDate
              }
              onChange={(
                date
              ) =>
                setStartDate(
                  date
                )
              }
            />
          </div>

          <div>
            <h3>
              Included Services
            </h3>

            <div
              style={{
                display: "grid",
                gap: "1rem",
              }}
            >
              {services?.map(
                (
                  service
                ) => (
                  <div
                    key={
                      service.id
                    }
                    style={{
                      border:
                        "1px solid gray",
                      padding:
                        "1rem",
                      borderRadius:
                        "10px",
                    }}
                  >
                    <h4>
                      {
                        service.name
                      }
                    </h4>

                    <p>
                      Duration:{" "}
                      {
                        service.duration
                      }{" "}
                      min
                    </p>

                    <p>
                      Cost: $
                      {
                        service.cost
                      }
                    </p>

                    <label>
                      Monthly visits:
                    </label>

                    <input
                      type="number"
                      min={0}
                      onChange={(
                        e
                      ) =>
                        handleVisitsChange(
                          service.id,
                          Number(
                            e
                              .target
                              .value
                          )
                        )
                      }
                    />
                  </div>
                )
              )}
            </div>
          </div>

          <button
            type="submit"
          >
            Save Subscription
          </button>
        </form>
      </div>
    );
  };