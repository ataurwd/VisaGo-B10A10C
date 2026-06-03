import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../pages/Home";
import WebLayout from "./../layout/WebLayout";
import Login from "./../users/Login";
import SignUp from "./../users/SignUp";
import AllVIsa from "./../pages/AllVIsa";
import AddVisa from "../pages/AddVisa";
import MyVisa from "./../pages/MyVisa";
import VisaApplication from "../pages/VisaApplication";
import PrivateRoute from "./PrivateRoute";
import ErrorPage from "../pages/ErrorPage";
import VisaDetails from "../components/VisaDetails";
import LatestVisa from "../components/LatestVisa";
import Contact from "./../pages/Contact";

const Route = () => {
  const route = createBrowserRouter([
    {
      path: "/",
      element: <WebLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/",
          element: <Home />,
          children: [
            {
              path: "/",
              element: <LatestVisa />,
              loader: () => fetch("https://visago-server.vercel.app/add-visa"),
            },
          ],
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/register",
          element: <SignUp />,
        },
        {
          path: "/add-visa",
          element: (
            <PrivateRoute>
              <AddVisa />
            </PrivateRoute>
          ),
        },
        {
          path: "/all-visa",
          element: <AllVIsa />,
          loader: () => fetch("https://visago-server.vercel.app/add-visa"),
        },
        {
          path: "/my-added-visa",
          element: (
            <PrivateRoute>
              <MyVisa />
            </PrivateRoute>
          ),
          loader: () => fetch("https://visago-server.vercel.app/add-visa"),
        },
        {
          path: "/my-visa-application",
          element: (
            <PrivateRoute>
              <VisaApplication />
            </PrivateRoute>
          ),
          loader: () => fetch("https://visago-server.vercel.app/applied-visa"),
        },
        {
          path: "/all-visa/:id",
          element: (
            <PrivateRoute>
              <VisaDetails />
            </PrivateRoute>
          ),
          loader: ({ params }) =>
            fetch(`https://visago-server.vercel.app/add-visa/${params.id}`),
        },
        {
          path: "/contact",
          element: <Contact></Contact>,
        },
      ],
    },
  ]);
  return <RouterProvider router={route} />;
};

export default Route;
