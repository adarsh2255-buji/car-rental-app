import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-bootstrap'
import "react-toastify/dist/ReactToastify.css";
import { Toaster } from 'react-hot-toast'

const Root = () => {
  return (
    <>
    
    <Header />
    <Toaster />
    <Outlet />
    <Footer />
    
    </>
    
  )
}

export default Root