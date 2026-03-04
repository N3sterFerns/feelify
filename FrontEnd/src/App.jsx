import React from 'react'
import FaceExpression from './features/Expression/components/FaceExpression'
import "./features/shared/styles/global.scss"
import { RouterProvider } from "react-router";
import { router } from './app.routes';
import { ToastContainer } from 'react-toastify';
import Navbar from './features/home/components/Navbar';
import { useAuth } from './features/auth/hooks/useAuth';

const App = () => {
  const {user} = useAuth()
  return (
    <div style={{position: "relative"}}>
      {user && <Navbar/>}
      <RouterProvider router={router} />
      <ToastContainer />
    </div>
  )
}

export default App