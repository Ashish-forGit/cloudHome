import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import { Provider, useSelector } from "react-redux";
import appStore from "./src/store/appStore";
import LoginPage from "./src/pages/loginPage";
import SignupPage from "./src/pages/signupPage";
import HomePage from "./src/pages/homePage";  // Import your HomePage component

const AppRouter = () => {
  const { isAuthorized } = useSelector((e) => e.auth);

  const router = createBrowserRouter([
    {
      path: "/login",
      element: isAuthorized ? <Navigate to="/" /> : <LoginPage/>
    },
    {
      path: "/signup",
      element: isAuthorized ? <Navigate to="/" /> : <SignupPage/>
    },
    {
      path: "/",
      element: isAuthorized ? <HomePage /> : <Navigate to="/login" />
    }
  ]);

  return (
    <>
      <RouterProvider router={router} />
      
    </>
  );
};



export default AppRouter;
