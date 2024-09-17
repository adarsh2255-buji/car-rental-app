import React, { useEffect, useState } from 'react'
import api from '../../../api';
import { Card, Container, Row, Col, Button } from 'react-bootstrap';
import toast from 'react-hot-toast';

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
        }
        fetchallBookings()
    }, [])
    //handle delete booking by id
    const handleDeleteBooking = async(bookingId) => {
        const token = localStorage.getItem('token');
        try {
            const response = await api.delete(`/deleteBooking/${bookingId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setAllBookings(allBookings.filter(booking => booking._id!== bookingId));
            toast.success("Booking deleted")
        } catch (error) {
            console.log('Error deleting booking:', error.response?.data || error.message);
        }
    }
  return (
    <>
    <Container>
                <h1>All Bookings</h1>
                {allBookings.length === 0 ? (
                    <p>Your bookings are empty.</p>
                ) : (
                    <Row>
                        {allBookings.map((booking) => (
                            <Col key={booking._id} md={4} sm={6} className="mb-4">
                                <Card style={{ background: 'transparent' }}>
                                    <Card.Img />
                                    <Card.Title className='text-white '>{`${booking.car.make} ${booking.car.model}`}</Card.Title>
                                    <Card.Subtitle className="mb-2 text-info">
                                        Status: {booking.status}
                                    </Card.Subtitle>
                                    <Card.Text>
                                        <strong>User:</strong> {booking.user && booking.user.username ? booking.user.username : <span className='text-danger fw-bold'>No user found</span>  }
                                        <br />
                                        <strong>Pick-Up Location:</strong> {booking.pickUpLocation}
                                        <br />
                                        <strong>Pick-Up Date & Time:</strong>{' '}
                                        {new Date(booking.pickUpDateAndTime).toLocaleString()}
                                        <br />
                                        <strong>Drop-Off Location:</strong> {booking.dropOffLocation}
                                        <br />
                                        <strong>Drop-Off Date & Time:</strong>{' '}
                                        {new Date(booking.dropOffDateAndTime).toLocaleString()}
                                        <br />
                                        <strong>Total Duration:</strong> {booking.totalNoOfDays} <br />
                                        <strong>Total Price:</strong> ₹{booking.totalPrice}
                                    </Card.Text>
                                    <Button variant='danger'onClick={()=>handleDeleteBooking(booking._id)}>delete</Button>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                )}
            </Container>
    </>
  )
}

export default GetAllBookings