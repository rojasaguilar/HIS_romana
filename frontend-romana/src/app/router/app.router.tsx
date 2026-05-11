import { createBrowserRouter } from "react-router-dom";

import { LoginPage } from "@/modules/auth/pages/LoginPage";

import { DashboardPage } from "@/modules/dashboard/pages/DashboardPage";

import { DashboardLayout } from "@/modules/dashboard/layouts/DashboardLayout";

import { PatientsPage } from "@/modules/patients/pages/PatientsPage";

import { CreatePatientPage } from "@/modules/patients/pages/CreatePatientPage";

import { MedicsPage } from "@/modules/medics/pages/MedicsPage";

import { CreateMedicPage } from "@/modules/medics/pages/CreateMedicPage";

import { ServicesPage } from "@/modules/services/pages/ServicesPage";

import { CreateServicePage } from "@/modules/services/pages/CreateServicePage";

import { AppointmentsPage } from "@/modules/appointments/pages/AppointmentsPage";

import { CreateAppointmentPage } from "@/modules/appointments/pages/CreateAppointmentPage";

import { PlansPage } from "@/modules/plans/pages/PlansPage";

import { AdminPlansPage } from "@/modules/plans/pages/AdminPlansPage";

import { CreatePlanPage } from "@/modules/plans/pages/CreatePlanPage";

import { PlansRedirectPage } from "@/modules/plans/pages/PlansRedirectPage";

import { UnauthorizedPage } from "@/shared/pages/UnauthorizedPage";

import { ProtectedRoute } from "./protected.routes";

import { RoleGuard } from "./guards/RoleGuard";
import { SubscriptionsPage } from "@/modules/subscriptions/pages/SubscriptionsPage";
import { CreateSubscriptionPage } from "@/modules/subscriptions/pages/CreateSubscriptionPage";
import { PatientDetailsPage } from "@/modules/patients/pages/PatientDetailsPage";
import { MedicDetailsPage } from "@/modules/medics/pages/MedicDetailsPage";

export const router = createBrowserRouter([
  /**
   * PUBLIC ROUTES
   */
  {
    path: "/login",

    element: <LoginPage />,
  },

  {
    path: "/unauthorized",

    element: <UnauthorizedPage />,
  },

  /**
   * PROTECTED ROUTES
   */
  {
    element: <ProtectedRoute />,

    children: [
      {
        element: <DashboardLayout />,

        children: [
          /**
           * DASHBOARD
           */
          {
            path: "/",

            element: <DashboardPage />,
          },

          {
            path: "/dashboard",

            element: <DashboardPage />,
          },

          /**
           * PATIENTS
           */
          {
            path: "/patients",

            element: <PatientsPage />,
          },

          {
            path: "/patients/:id",

            element: <PatientDetailsPage />,
          },

          {
            path: "/patients/create",

            element: <CreatePatientPage />,
          },

          /**
           * MEDICS
           */
          {
            path: "/medics",

            element: <MedicsPage />,
          },
          {
            path: "/medics/:id",

            element: <MedicDetailsPage />,
          },

          {
            path: "/medics/create",

            element: <CreateMedicPage />,
          },

          /**
           * SERVICES
           */
          {
            path: "/services",

            element: <ServicesPage />,
          },

          /**
           * APPOINTMENTS
           */
          {
            path: "/appointments",

            element: <AppointmentsPage />,
          },

          {
            path: "/appointments/schedule",

            element: <CreateAppointmentPage />,
          },

          /**
           * PLANS
           */
          {
            path: "/plans",

            element: <PlansRedirectPage />,
          },

          {
            path: "/plans/available",

            element: <PlansPage />,
          },

          {
            path: "/subscriptions",

            element: <SubscriptionsPage />,
          },

          {
            path: "/subscriptions/create",

            element: <CreateSubscriptionPage />,
          },

          /**
           * ADMIN ROUTES
           */
          {
            element: <RoleGuard allowedRoles={["ADMIN"]} />,

            children: [
              /**
               * SERVICES ADMIN
               */
              {
                path: "/services/create",

                element: <CreateServicePage />,
              },

              /**
               * PLANS ADMIN
               */
              {
                path: "/plans/admin",

                element: <AdminPlansPage />,
              },

              {
                path: "/plans/create",

                element: <CreatePlanPage />,
              },
            ],
          },
        ],
      },
    ],
  },
]);
