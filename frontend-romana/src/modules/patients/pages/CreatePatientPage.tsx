import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { useCreatePatient } from "../hooks/useCreatePatient";

import type {
  BloodType,
} from "../types/patient.types";

export const CreatePatientPage =
  () => {
    const navigate =
      useNavigate();

    const createPatient =
      useCreatePatient();

    const [name, setName] =
      useState("");

    const [email, setEmail] =
      useState("");

    const [phoneNumber,
      setPhoneNumber] =
      useState("");

    const [birthDate,
      setBirthDate] =
      useState("");

    const [bloodType,
      setBloodType] =
      useState<BloodType>("O+");

    const [allergies,
      setAllergies] =
      useState("");

    const [street,
      setStreet] =
      useState("");

    const [city, setCity] =
      useState("");

    const [state, setState] =
      useState("");

    const [zipCode,
      setZipCode] =
      useState("");

    const [
      emergencyName,
      setEmergencyName,
    ] = useState("");

    const [
      emergencyPhone,
      setEmergencyPhone,
    ] = useState("");

    const [
      relationship,
      setRelationship,
    ] = useState("");

    const handleSubmit =
      async (
        e: React.FormEvent
      ) => {
        e.preventDefault();

        createPatient.mutate(
          {
            name,

            email,

            phoneNumber,

            birthDate,

            bloodType,

            allergies:
              allergies.length > 0
                ? allergies.split(
                    ","
                  )
                : [],

            address: {
              street,

              city,

              state,

              zipCode,
            },

            emergencyContact:
              emergencyName &&
              emergencyPhone &&
              relationship
                ? {
                    name:
                      emergencyName,

                    phoneNumber:
                      emergencyPhone,

                    relationship,
                  }
                : undefined,
          },

          {
            onSuccess: () => {
              navigate(
                "/patients"
              );
            },
          }
        );
      };

    return (
      <div>
        <h1>
          Create Patient
        </h1>

        <form
          onSubmit={
            handleSubmit
          }
          style={{
            display: "flex",
            flexDirection:
              "column",
            gap: "1rem",
            maxWidth:
              "500px",
          }}
        >
          <input
            placeholder="Name"
            value={name}
            onChange={(e) =>
              setName(
                e.target.value
              )
            }
          />

          <input
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }
          />

          <input
            placeholder="Phone Number"
            value={
              phoneNumber
            }
            onChange={(e) =>
              setPhoneNumber(
                e.target.value
              )
            }
          />

          <input
            type="date"
            value={birthDate}
            onChange={(e) =>
              setBirthDate(
                e.target.value
              )
            }
          />

          <select
            value={bloodType}
            onChange={(e) =>
              setBloodType(
                e.target
                  .value as BloodType
              )
            }
          >
            <option value="O+">
              O+
            </option>

            <option value="O-">
              O-
            </option>

            <option value="A+">
              A+
            </option>

            <option value="A-">
              A-
            </option>

            <option value="B+">
              B+
            </option>

            <option value="B-">
              B-
            </option>

            <option value="AB+">
              AB+
            </option>

            <option value="AB-">
              AB-
            </option>
          </select>

          <input
            placeholder="Allergies separated by commas"
            value={allergies}
            onChange={(e) =>
              setAllergies(
                e.target.value
              )
            }
          />

          <h3>Address</h3>

          <input
            placeholder="Street"
            value={street}
            onChange={(e) =>
              setStreet(
                e.target.value
              )
            }
          />

          <input
            placeholder="City"
            value={city}
            onChange={(e) =>
              setCity(
                e.target.value
              )
            }
          />

          <input
            placeholder="State"
            value={state}
            onChange={(e) =>
              setState(
                e.target.value
              )
            }
          />

          <input
            placeholder="Zip Code"
            value={zipCode}
            onChange={(e) =>
              setZipCode(
                e.target.value
              )
            }
          />

          <h3>
            Emergency Contact
          </h3>

          <input
            placeholder="Contact Name"
            value={
              emergencyName
            }
            onChange={(e) =>
              setEmergencyName(
                e.target.value
              )
            }
          />

          <input
            placeholder="Contact Phone"
            value={
              emergencyPhone
            }
            onChange={(e) =>
              setEmergencyPhone(
                e.target.value
              )
            }
          />

          <input
            placeholder="Relationship"
            value={
              relationship
            }
            onChange={(e) =>
              setRelationship(
                e.target.value
              )
            }
          />

          <button
            type="submit"
            disabled={
              createPatient.isPending
            }
          >
            {createPatient.isPending
              ? "Saving..."
              : "Save Patient"}
          </button>
        </form>
      </div>
    );
  };