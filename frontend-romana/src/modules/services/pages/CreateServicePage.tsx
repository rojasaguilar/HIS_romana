import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { useCreateService } from "../hooks/useCreateService";

import type { ServiceModality } from "../types/service.types";

import { useSpecialities } from "@/modules/specialities/hooks/useSpecialities";

export const CreateServicePage = () => {
  const navigate = useNavigate();

  const createService = useCreateService();

  const { data: specialities } = useSpecialities();

  const [name, setName] = useState("");

  const [duration, setDuration] = useState(30);

  const [cost, setCost] = useState(0);

  const [specialityId, setSpecialityId] = useState("");

  const [modalities, setModalities] = useState<ServiceModality[]>([]);

  const handleModalityChange = (modality: ServiceModality) => {
    setModalities((prev) => {
      if (prev.includes(modality)) {
        return prev.filter((m) => m !== modality);
      }

      return [...prev, modality];
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    createService.mutate(
      {
        name,

        duration,

        cost,

        specialityId,

        modalities,
      },

      {
        onSuccess: () => {
          navigate("/services");
        },
      },
    );
  };

  return (
    <div
      style={{
        padding: "2rem",
      }}
    >
      <h1>Create Service</h1>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          maxWidth: "600px",
        }}
      >
        <input
          placeholder="Service Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="number"
          placeholder="Duration"
          value={duration}
          onChange={(e) => setDuration(Number(e.target.value))}
        />

        <input
          type="number"
          placeholder="Cost"
          value={cost}
          onChange={(e) => setCost(Number(e.target.value))}
        />

        <select
          value={specialityId}
          onChange={(e) => setSpecialityId(e.target.value)}
        >
          <option value="">Select speciality</option>

          {specialities?.map((speciality) => (
            <option key={speciality.id} value={speciality.id}>
              {speciality.name}
            </option>
          ))}
        </select>

        <div>
          <h3>Modalities</h3>

          {["ONLINE", "IN_PERSON"].map((modality) => (
            <label
              key={modality}
              style={{
                display: "block",
              }}
            >
              <input
                type="checkbox"
                checked={modalities.includes(modality as ServiceModality)}
                onChange={() =>
                  handleModalityChange(modality as ServiceModality)
                }
              />

              {modality}
            </label>
          ))}
        </div>

        <button type="submit" disabled={createService.isPending}>
          {createService.isPending ? "Saving..." : "Save Service"}
        </button>
      </form>
    </div>
  );
};
