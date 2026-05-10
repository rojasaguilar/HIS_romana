import { createBrowserRouter } from "react-router-dom";

import { LoginPage } from "@/modules/auth/pages/LoginPage";

import { DashboardPage } from "@/modules/dashboard/pages/DashboardPage";

import { PatientsPage } from "@/modules/patients/pages/PatientsPage";

import { CreatePatientPage } from "@/modules/patients/pages/CreatePatientPage";

import { MedicsPage } from "@/modules/medics/pages/MedicsPage";

import { CreateMedicPage } from "@/modules/medics/pages/CreateMedicPage";

import { ServicesPage } from "@/modules/services/pages/ServicesPage";

import { CreateServicePage } from "@/modules/services/pages/CreateServicePage";

import { AppointmentsPage } from "@/modules/appointments/pages/AppointmentsPage";

import { CreateAppointmentPage } from "@/modules/appointments/pages/CreateAppointmentPage";

import { AvailableSubscriptionsPage } from "@/modules/subscriptions/pages/AvailableSubscriptionsPage";

import { AdminSubscriptionsPage } from "@/modules/subscriptions/pages/AdminSubscriptionsPage";

import { CreateSubscriptionPage } from "@/modules/subscriptions/pages/CreateSubscriptionPage";

import { UnauthorizedPage } from "@/shared/pages/UnauthorizedPage";

import { ProtectedRoute } from "./protected.routes";

import { RoleGuard } from "./guards/RoleGuard";

import { DashboardLayout } from "@/modules/dashboard/layouts/DashboardLayout";

export const router = createBrowserRouter([
  {
    path: "/login",

    element: <LoginPage />,
  },

  {
    path: "/unauthorized",

    element: <UnauthorizedPage />,
  },

  {
    element: <ProtectedRoute />,

    children: [
      {
        element: <DashboardLayout />,

        children: [
          {
            path: "/",

            element: <DashboardPage />,
          },

          {
            path: "/patients",

            element: <PatientsPage />,
          },

          {
            path: "/patients/create",

            element: <CreatePatientPage />,
          },

          {
            path: "/medics",

            element: <MedicsPage />,
          },

          {
            path: "/medics/create",

            element: <CreateMedicPage />,
          },

          {
            path: "/services",

            element: <ServicesPage />,
          },

          {
            path: "/appointments",

            element: <AppointmentsPage />,
          },

          {
            path: "/appointments/schedule",

            element: <CreateAppointmentPage />,
          },

          {
            path: "/subscriptions",

            element: <AvailableSubscriptionsPage />,
          },

          {
            element: <RoleGuard allowedRoles={["ADMIN"]} />,

            children: [
              {
                path: "/services/create",

                element: <CreateServicePage />,
              },

              {
                path: "/subscriptions/admin",

                element: <AdminSubscriptionsPage />,
              },

              {
                path: "/subscriptions/create",

                element: <CreateSubscriptionPage />,
              },
            ],
          },
        ],
      },
    ],
  },
]);
