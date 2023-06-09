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
import { createGlobalStyle } from "styled-components";
import { AuthenticationProvider } from './presentation/context/AuthenticationContext';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`;

function App() {
  return (
    <AuthenticationProvider>
      <MedicationProvider>
        <ToastContainer />
        <RouterProvider router={MainRouter} />
      </MedicationProvider>
    </AuthenticationProvider>
  );
}

export default App;
