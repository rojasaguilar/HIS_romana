import React from "react";

import ReactDOM from "react-dom/client";

import { RouterProvider } from "react-router-dom";

import { QueryProvider } from "@/app/providers/QueryProvider";

import { router } from "@/app/router/app.router";

import "@/modules/auth/services/auth.interceptor";
import { ToastProvider } from "./shared/components/feedback/toast/ToastProvider";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ToastProvider>
      <QueryProvider>
        <RouterProvider router={router} />
      </QueryProvider>
    </ToastProvider>
  </React.StrictMode>,
);
