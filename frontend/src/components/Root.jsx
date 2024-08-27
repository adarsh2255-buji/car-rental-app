import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-bootstrap'
import "react-toastify/dist/ReactToastify.css";

const Root = () => {
  return (
    <>
    
    <Header />
    <ToastContainer />
    <Outlet />
    <Footer />
    
    </>
    
  )
}

export default Root