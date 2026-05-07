import type {
  Patient,
} from "../types/patient.types";

interface Props {
  patients: Patient[];
}

export const PatientsTable = ({
  patients,
}: Props) => {
  return (
    <table width="100%">
      <thead>
        <tr>
          <th>Name</th>

          <th>Email</th>

          <th>Phone</th>

          <th>Blood Type</th>

          <th>Status</th>
        </tr>
      </thead>

      <tbody>
        {patients.map(
          (patient) => (
            <tr key={patient.id}>
              <td>
                {patient.name}
              </td>

              <td>
                {patient.email}
              </td>

              <td>
                {
                  patient.phoneNumber
                }
              </td>

              <td>
                {
                  patient.bloodType
                }
              </td>

              <td>
                {patient.isActive
                  ? "Active"
                  : "Inactive"}
              </td>
            </tr>
          )
        )}
      </tbody>
    </table>
  );
};