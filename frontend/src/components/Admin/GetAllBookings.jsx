import React, { useEffect, useState } from 'react'
import api from '../../../api';
import { Card, Container, Row, Col } from 'react-bootstrap';

const GetAllBookings = () => {
    const [allBookings, setAllBookings] = useState([]);

    useEffect(()=>{
        const token = localStorage.getItem('token');
        const fetchallBookings = async() =>{
            const response = await api.get('/getAllBooking', {
                headers : {
                    Authorization: `Bearer ${token}`
                }
            });
            setAllBookings(response.data.booking);
            console.log(response.data.booking)
        }
        fetchallBookings()
    }, [])
  return (
    <>
    <Container>
        <h1>All Bookings</h1>
        <Row>
            {allBookings.map((booking) => (
                 <Col key={booking._id} md={4} sm={6} className="mb-4">
                <Card>
                    <Card.Img />
                    <Card.Title>{`${booking.car.make} ${booking.car.model}`}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">Status: {booking.status}</Card.Subtitle>
                    <Card.Text>
                    <strong>User:</strong> {booking.user.username}<br />
                    <strong>Pick-Up Location:</strong> {booking.pickUpLocation}<br />
                    <strong>Pick-Up Date & Time:</strong> {new Date(booking.pickUpDateAndTime).toLocaleString()}<br />
                    <strong>Drop-Off Location:</strong> {booking.dropOffLocation}<br />
                    <strong>Drop-Off Date & Time:</strong> {new Date(booking.dropOffDateAndTime).toLocaleString()}<br />
                    <strong>Total Duration:</strong> {booking.totalNoOfDays} <br />
                    <strong>Total Price:</strong> ₹{booking.totalPrice}
                    </Card.Text>
                </Card>
                </Col>
            ))}
        </Row>
    </Container>
    </>
  )
}

export default GetAllBookings