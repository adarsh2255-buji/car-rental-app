import React, { useContext, useEffect, useState } from 'react'
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import api from '../../api'


const AllBooking = () => {
    const [allBooking, setAllBooking] = useState([]);

    
    useEffect(()=>{
        const token = localStorage.getItem('token');
        const fetchallBooking = async()=>{
            const response = await api.get('/allBooking',{
                    headers: {
                      Authorization: `Bearer ${token}` // Include the token in the Authorization header
                  }
                }
            )
            setAllBooking(response.data.bookings)
            console.log(response.data.bookings)
        }
        fetchallBooking()
    }, [])

    //cancel booking

    const handleCancelBooking = async (bookingId) =>{ 
        const token = localStorage.getItem('token');
        try {
            const response = await api.put(`/cancel/${bookingId}`,{}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            //update the booking status in the state

            setAllBooking(allBooking.map(booking => 
                booking._id === bookingId ? { ...booking, status: "cancelled", isCancelling : true} : booking
            ));
            console.log(response.data.message)
        } catch (error) {
            console.log("Error cancelling booking", error.response?.data || error.message)
        }
    }
  return (
    <Container>
        <h1>Booking history</h1>
        <Row>
        {allBooking.map((booking)=>(
            <Col key={booking._id} md={4} sm={6} className="mb-4">
            <Card style={{ background: 'transparent' }}>
            <Card.Img variant="top" src={booking.car.image} alt={`${booking.car.make} ${booking.car.model}`} />
                <Card.Body>
                <Card.Title className='text-white'>{`${booking.car.make} ${booking.car.model}`}</Card.Title>
                <Card.Subtitle className="mb-2  text-info">Status: {booking.status}</Card.Subtitle>
                <Card.Text>
                    <strong>Pick-Up Location:</strong> {booking.pickUpLocation}<br />
                    <strong>Pick-Up Date & Time:</strong> {new Date(booking.pickUpDateAndTime).toLocaleString()}<br />
                    <strong>Drop-Off Location:</strong> {booking.dropOffLocation}<br />
                    <strong>Drop-Off Date & Time:</strong> {new Date(booking.dropOffDateAndTime).toLocaleString()}<br />
                    <strong>Total Duration:</strong> {booking.totalNoOfDays} <br />
                    <strong>Total Price:</strong> ₹{booking.totalPrice}
                    <br />
                    {
                        booking.status !== "cancelled" && booking.status !== 'Journey Completed'?  (
                            <Button variant='danger'
                            onClick={()=> handleCancelBooking(booking._id)} 
                            disabled = {booking.isCancelling}>
                                {booking.isCancelling ? 'Booking Cancelled' : 'Cancel Booking'}
                            </Button>
                        ) : (
                            <Button variant="secondary" disabled>
                            {booking.status === 'cancelled' ? 'Booking Cancelled' : "Journey Completed"}
                        </Button>
                        )
                    }
                </Card.Text>
                </Card.Body>
            </Card>
            </Col>
        ))}
        </Row>
    </Container>
  )
}

export default AllBooking