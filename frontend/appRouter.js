import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import { Provider, useSelector } from "react-redux";
import appStore from "./src/store/appStore";
import LoginPage from "./src/pages/loginPage";
import SignupPage from "./src/pages/signupPage";
import HomePage from "./src/pages/homePage";  // Import your HomePage component
import OtpPage from "./src/pages/otpPage";

const AppRouter = () => {
  const { isAuthorized, isEmailVerified } = useSelector((e) => e.auth);

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
      path: "/otp",
      element: isAuthorized && !isEmailVerified ? <OtpPage/> : <Navigate to="/" />
    },
    {
      path: "/",
      element: isAuthorized ? (isEmailVerified ? <HomePage /> : <Navigate to="/otp" />) : <Navigate to="/login" />,
    }
  ]);

  return (
    <>
      <RouterProvider router={router} />
      
    </>
  );
};



export default AppRouter;
