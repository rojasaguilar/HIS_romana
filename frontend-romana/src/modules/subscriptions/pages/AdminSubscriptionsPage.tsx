import { Link } from "react-router-dom";

import { useSubscriptions } from "../hooks/useSubscriptions";

export const AdminSubscriptionsPage =
  () => {
    const {
      data,
      isLoading,
    } = useSubscriptions();

    if (isLoading) {
      return (
        <p>
          Loading subscriptions...
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
            Subscription Admin
          </h1>

          <Link to="/subscriptions/create">
            <button>
              Create Subscription
            </button>
          </Link>
        </div>

        <table
          width="100%"
        >
          <thead>
            <tr>
              <th>
                Plan
              </th>

              <th>
                Price
              </th>

              <th>
                Duration
              </th>

              <th>
                Status
              </th>

              <th>
                Start Date
              </th>
            </tr>
          </thead>

          <tbody>
            {data?.map(
              (
                subscription
              ) => (
                <tr
                  key={
                    subscription.id
                  }
                >
                  <td>
                    {
                      subscription.planId
                    }
                  </td>

                  <td>
                    $
                    {
                      subscription.price
                    }
                  </td>

                  <td>
                    {
                      subscription.durationInMonths
                    }{" "}
                    months
                  </td>

                  <td>
                    {
                      subscription.status
                    }
                  </td>

                  <td>
                    {new Date(
                      subscription.startDate
                    ).toLocaleDateString()}
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    );
  };