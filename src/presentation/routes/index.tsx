import { createBrowserRouter } from "react-router-dom";
import { CreatePrescriptionScreen } from "../pages/app/create-prescription";
import { HomeScreen } from "../pages/app/home";
import { LandingPage } from "../pages/landing-page";
import { PrescriptionScreen } from "../pages/app/prescription";
import { SignupPage } from "../pages/auth/signup";
import { LoginPage } from "../pages/auth/login";

export const MainRouter = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/app",
    element: <HomeScreen />,
  },
  {
    path: "/app/receita",
    element: <CreatePrescriptionScreen />,
  },
  {
    path: "/app/receita/pdf",
    element: <PrescriptionScreen />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  }
]);