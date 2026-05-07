import { usePatients } from "../hooks/usePatients";

import { PatientsTable } from "../components/PatientsTable";

export const PatientsPage = () => {
  const {
    data,
    isLoading,
    isError,
  } = usePatients();

  if (isLoading) {
    return (
      <p>
        Loading patients...
      </p>
    );
  }

  if (isError) {
    return (
      <p>
        Error loading patients
      </p>
    );
  }

  return (
    <div>
      <h1>Patients</h1>

      <PatientsTable
        patients={data ?? []}
      />
    </div>
  );
};