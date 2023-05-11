import React from 'react';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import {
  RouterProvider,
} from "react-router-dom";
import { MainRouter } from './presentation/routes';
import { MedicationProvider } from './presentation/context/MedicationContext';

function App() {
  return (
    <MedicationProvider>
      <ToastContainer />
      <RouterProvider router={MainRouter} />
    </MedicationProvider>
  );
}

export default App;
