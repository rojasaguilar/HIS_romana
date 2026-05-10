import { Link } from "react-router-dom";

import { usePlans } from "../hooks/usePlans";

export const AdminPlansPage =
  () => {
    const {
      data,
      isLoading,
    } = usePlans();

    if (isLoading) {
      return (
        <p>
          Loading plans...
        </p>
      );
    }

    return (
      <div
        style={{
          padding: "2rem",
        }}
      >
        <div
          style={{
            display: "flex",

            justifyContent:
              "space-between",

            marginBottom:
              "2rem",
          }}
        >
          <h1>
            Plans Admin
          </h1>

          <Link to="/plans/create">
            <button>
              Create Plan
            </button>
          </Link>
        </div>

        <table
          width="100%"
        >
          <thead>
            <tr>
              <th>
                Name
              </th>

              <th>
                Description
              </th>

              <th>
                Variants
              </th>

              <th>
                Active
              </th>
            </tr>
          </thead>

          <tbody>
            {data?.map(
              (plan) => (
                <tr
                  key={plan.id}
                >
                  <td>
                    {plan.name}
                  </td>

                  <td>
                    {
                      plan.description
                    }
                  </td>

                  <td>
                    {
                      plan.variants
                        .length
                    }
                  </td>

                  <td>
                    {plan.isActive
                      ? "YES"
                      : "NO"}
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    );
  };