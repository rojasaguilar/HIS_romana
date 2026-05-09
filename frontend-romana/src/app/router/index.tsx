import { createBrowserRouter } from "react-router-dom";

import { ProtectedRoute } from "./protected.routes";

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

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },

  {
    element: <ProtectedRoute />,

    children: [
      {
        element: <DashboardLayout />,

        children: [
          {
            path: "/dashboard",

            element: <DashboardPage />,
          },
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
            path: "/services/create",
            element: <CreateServicePage />,
          },
          {
            path: "/appointments",
            element: <AppointmentsPage />,
          },
          {
            path: "/appointments/schedule",
            element: <CreateAppointmentPage />,
          },
        ],
      },
    ],
  },
]);
