import { createBrowserRouter } from "react-router-dom";
import { CreatePrescriptionScreen } from "../pages/app/create-prescription";
import { HomeScreen } from "../pages/app/home";
import { LandingPage } from "../pages/landing-page";
import { PrescriptionScreen } from "../pages/app/prescription";

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
]);