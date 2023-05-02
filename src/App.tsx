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

function App() {
  return (
    <>
      <ToastContainer />
      <RouterProvider router={MainRouter} />
    </>
  );
}

export default App;
