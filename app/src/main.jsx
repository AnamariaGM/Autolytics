import React from "react";
import ReactDOM from "react-dom/client";
import Cars from "./Cars.jsx";
import { ChakraProvider, Text } from "@chakra-ui/react";
import { createStandaloneToast } from "@chakra-ui/toast";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "../src/Components/login/Login.jsx";
import Signup from "../src/Components/signup/SignUp.jsx";
import AuthProvider from "../src/Components/context/AuthContext.jsx";
import ProtectedRoute from "../src/Components/shared/ProtectedRoute.jsx";
import "../src/index.css";
import Home from "../src/Home.jsx";

const { ToastContainer } = createStandaloneToast();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "dashboard",
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    ),
  },
  {
    path: "dashboard/customers",
    element: (
      <ProtectedRoute>
        <Cars />
      </ProtectedRoute>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
      <ToastContainer />
    </ChakraProvider>
  </React.StrictMode>
);
