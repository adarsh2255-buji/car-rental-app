import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../api';
import { Button, Container } from 'react-bootstrap';

const BookingDetails = () => {
    const [bookingDetails, setBookingDetails] = useState(null);
    const navigate = useNavigate() 
    
    useEffect(()=>{
        const token = localStorage.getItem('token');
        const fetchBookingDetails = async()=>{
            try {
                const bookingId = localStorage.getItem('currentBookingId');
                const token = localStorage.getItem('token');
                const response = await api.get(`/bookingById/${bookingId}`,{
                    headers: {
                      Authorization: `Bearer ${token}` // Include the token in the Authorization header
                  }
                }
            )
            setBookingDetails(response.data)
            console.log(response.data)
            } catch (error) {
                console.log('Error fetching booking details:', error.response?.data || error.message);
            }        
        }
        fetchBookingDetails()
    }, [])
    
    if (!bookingDetails) {
        return <div>Loading...</div>; // Render a loading message or spinner while data is being fetched
    }
    
  return (
    <div>
        <h1>Complete your booking</h1>
        <Container>
            <img className='w-50' src={bookingDetails.car.image} alt="car image"/>
            <h5>{bookingDetails.car.make} {bookingDetails.car.model}</h5>
            <h3>YOUR BOOKING DETAILS </h3>
            <p>Car Make & Model : {bookingDetails.car.make} {bookingDetails.car.model}</p>
            <p>Fuel Type : {bookingDetails.car.fuelType}</p>
            <p>Pick Up Date : {new Date(bookingDetails.pickUpDateAndTime).toDateString()}</p>
            <p>Drop Off Date : {new Date(bookingDetails.dropOffDateAndTime).toDateString()}</p>
            <p>Pick Up Location : {bookingDetails.pickUpLocation}</p>
            <p>Drop Off Location : {bookingDetails.dropOffLocation}</p>
            <p>Total duration : {bookingDetails.totalNoOfDays}</p>
            <p className='fw-bold'>TOTAL BOOKING COST : ₹ {bookingDetails.totalPrice}</p>
            <Button onClick={()=>{navigate('/checkout')}}>COMPLETE BOOKING</Button>
        </Container>
    </div>
  )
}

export default BookingDetails