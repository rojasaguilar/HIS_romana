import React from "react";
import ReactDOM from "react-dom/client";

import {
  RouterProvider,
} from "react-router-dom";

import { QueryProvider } from "@/app/providers/QueryProvider";

import { router } from "@/app/router";

import "@/modules/auth/services/auth.interceptor";

ReactDOM.createRoot(
  document.getElementById("root")!
).render(
  <React.StrictMode>
    <QueryProvider>
      <RouterProvider
        router={router}
      />
    </QueryProvider>
  </React.StrictMode>
);