import React from 'react'
import { Container } from 'react-bootstrap'

const Aboutus = () => {
  return (
    <>
    <Container className='d-flex  my-5'>
        <img src="https://discovernewmarket.co.uk/wp-content/uploads/2020/09/car-journey.jpg" alt=""
        className='img-fluid w-50'  />

        <Container className='mx-5'>
        <h1>Our Story</h1>
        <p className='fs-4'>
        WheelsHub is your trusted partner for premium car rentals, offering a wide selection of vehicles to meet every need and budget. Whether you're planning a weekend getaway or need a reliable ride for your business trip, we provide top-notch service, competitive pricing, and a seamless booking experience.
         Our mission is to make your journey as smooth and enjoyable as possible
        </p>
        </Container>
        
    </Container>
    </>
  )
}

export default Aboutus