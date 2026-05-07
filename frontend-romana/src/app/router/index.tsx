import {
  createBrowserRouter,
} from "react-router-dom";

import { ProtectedRoute } from "./protected.routes";

import { LoginPage } from "@/modules/auth/pages/LoginPage";

import { DashboardPage } from "@/modules/dashboard/pages/DashboardPage";

import { DashboardLayout } from "@/modules/dashboard/layouts/DashboardLayout";

export const router =
  createBrowserRouter([
    {
      path: "/login",
      element: <LoginPage />,
    },

    {
      element: <ProtectedRoute />,

      children: [
        {
          element:
            <DashboardLayout />,

          children: [
            {
              path: "/dashboard",

              element:
                <DashboardPage />,
            },
          ],
        },
      ],
    },
  ]);