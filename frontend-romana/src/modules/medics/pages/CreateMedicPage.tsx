import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { useCreateMedic } from "../hooks/useCreateMedic";

import type { MedicType } from "../types/medic.types";

import { useSpecialities } from "@/modules/specialities/hooks/useSpecialities";

export const CreateMedicPage = () => {
  const navigate = useNavigate();

  const createMedic = useCreateMedic();

  const { data: specialities } = useSpecialities();

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [phoneNumber, setPhoneNumber] = useState("");

  const [healthLicenseNumber, setHealthLicenseNumber] = useState("");

  const [professionalLicenceNumber, setProfessionalLicenceNumber] =
    useState("");

  const [languages, setLanguages] = useState("");

  const [specialityIds, setSpecialityIds] = useState<string[]>([]);

  const [medicalSchool, setMedicalSchool] = useState("");

  const [startPracticeDate, setStartPracticeDate] = useState("");

  const [bio, setBio] = useState("");

  const [consultationFee, setConsultationFee] = useState(0);

  const [profilePictureUrl, setProfilePictureUrl] = useState("");

  const [type, setType] = useState<MedicType>("INTERNAL");

  const handleSpecialityChange = (specialityId: string) => {
    setSpecialityIds((prev) => {
      if (prev.includes(specialityId)) {
        return prev.filter((id) => id !== specialityId);
      }

      return [...prev, specialityId];
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    createMedic.mutate(
      {
        name,

        email,

        phoneNumber,

        healthLicenseNumber,

        professionalLicenceNumber,

        languages:
          languages.length > 0
            ? languages.split(",").map((language) => language.trim())
            : [],

        specialityIds,

        medicalSchool,

        startPracticeDate,

        bio,

        consultationFee,

        profilePictureUrl,

        type,
      },

      {
        onSuccess: () => {
          navigate("/medics");
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
      <h1>Create Medic</h1>

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
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          placeholder="Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />

        <input
          placeholder="Health License Number"
          value={healthLicenseNumber}
          onChange={(e) => setHealthLicenseNumber(e.target.value)}
        />

        <input
          placeholder="Professional Licence Number"
          value={professionalLicenceNumber}
          onChange={(e) => setProfessionalLicenceNumber(e.target.value)}
        />

        <input
          placeholder="Languages separated by commas"
          value={languages}
          onChange={(e) => setLanguages(e.target.value)}
        />

        <div>
          <h3>Specialities</h3>

          {specialities?.map((speciality) => (
            <label
              key={speciality.id}
              style={{
                display: "block",
                marginBottom: "0.5rem",
              }}
            >
              <input
                type="checkbox"
                checked={specialityIds.includes(speciality.id)}
                onChange={() => handleSpecialityChange(speciality.id)}
              />

              {speciality.name}
            </label>
          ))}
        </div>

        <input
          placeholder="Medical School"
          value={medicalSchool}
          onChange={(e) => setMedicalSchool(e.target.value)}
        />

        <input
          type="date"
          value={startPracticeDate}
          onChange={(e) => setStartPracticeDate(e.target.value)}
        />

        <textarea
          placeholder="Bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />

        <input
          type="number"
          placeholder="Consultation Fee"
          value={consultationFee}
          onChange={(e) => setConsultationFee(Number(e.target.value))}
        />

        <input
          placeholder="Profile Picture URL"
          value={profilePictureUrl}
          onChange={(e) => setProfilePictureUrl(e.target.value)}
        />

        <select
          value={type}
          onChange={(e) => setType(e.target.value as MedicType)}
        >
          <option value="GENERAL">GENERAL</option>

          <option value="SPECIALIST">SPECIALIST</option>
        </select>

        <button type="submit" disabled={createMedic.isPending}>
          {createMedic.isPending ? "Saving..." : "Save Medic"}
        </button>
      </form>
    </div>
  );
};
