import React from 'react'
import FaceExpression from './features/Expression/components/FaceExpression'
import "./features/shared/styles/global.scss"
import { RouterProvider } from "react-router";
import { router } from './app.routes';
import { ToastContainer } from 'react-toastify';

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  )
}

export default App