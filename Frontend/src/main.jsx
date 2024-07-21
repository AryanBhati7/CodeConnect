import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store/store.js";
import { Toaster } from "@/components/ui/toaster";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
  LandingPage,
  Home,
  CheckEmail,
  CheckPassword,
  RegisterUser,
} from "./pages/index.js";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/auth/check-email",
        element: <CheckEmail />,
      },
      {
        path: "/auth/check-password",
        element: <CheckPassword />,
      },
      {
        path: "/auth/register",
        element: <RegisterUser />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <RouterProvider router={router} />
        <ReactQueryDevtools />
        <Toaster />
      </Provider>
    </QueryClientProvider>
  </React.StrictMode>
);
