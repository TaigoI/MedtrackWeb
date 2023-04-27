import { createBrowserRouter } from "react-router-dom";
import { CreatePrescriptionScreen } from "../pages/app/create-prescription";
import { HomeScreen } from "../pages/app/home";
import { LandingPage } from "../pages/landing-page";

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
]);