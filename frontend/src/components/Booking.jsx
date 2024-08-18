import React, { useContext, useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/esm/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row'
import api from '../../api';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const Booking = () => {
  const [bookingData, setBookingData] = useState({
    pickUpLocation : "",
    pickUpDateAndTime : "",
    dropOffLocation : "",
    dropOffDateAndTime:"",
  })
  const { user } = useContext(UserContext)
  const navigate = useNavigate();
  
  const handleChange = (e)=>{
    setBookingData({...bookingData,[ e.target.name] : e.target.value })
  }

  const submitHandler = async(e)=>{
    e.preventDefault();  
    try {
      const token = localStorage.getItem('token');
      const selectedCarId = localStorage.getItem('selectedCarId')
      const completeBookingData = {
        ...bookingData,
        car : selectedCarId,
        user: user.userId, 
      }
      const response = await api.post('/booking', completeBookingData,
        
        {
          headers: {
            Authorization: `Bearer ${token}` // Include the token in the Authorization header
        }
      }, 
      
    );
    
    const id = response.data.booking._id;

    navigate(`/BookingDetails/${id}`)
    localStorage.setItem('currentBookingId', id);
      console.log(response.data)
    } catch (error) {
      console.log(error)  
      console.error(error.response?.data || error.message);
    }
  }
  return (
    <div>
      <Container>
        <h1 className='m-4'>Choose your wheel</h1>
        <Container className='d-flex justify-content-center align-items-center'>
    <Form onSubmit={submitHandler} >
      <Row className="mb-3">
      <Form.Group as={Col}>
        <Form.Label>PICKUP-LOCATION</Form.Label>
        <Form.Control type="text" placeholder="Pickup location"
        name='pickUpLocation'
        value={bookingData.pickUpLocation}
        onChange={handleChange}
        required/>
      </Form.Group>

      <Form.Group as={Col}>
        <Form.Label>PICK-UP DATE AND TIME</Form.Label>
        <Form.Control type="Date"
        name='pickUpDateAndTime'
        value={bookingData.pickUpDateAndTime}
        onChange={handleChange}
        required />
      </Form.Group>
      </Row>

      <Row className='mb-3'>
      <Form.Group as={Col}>
        <Form.Label>DROP-OFF LOCATION</Form.Label>
        <Form.Control type="text" placeholder="Drop off location"
        name='dropOffLocation'
        value={bookingData.dropOffLocation}
        onChange={handleChange}
        required/>
      </Form.Group>
      
      <Form.Group as={Col}>
        <Form.Label>DROP OF DATE AND TIME</Form.Label>
        <Form.Control type="Date"
        name='dropOffDateAndTime'
        value={bookingData.dropOffDateAndTime}
        onChange={handleChange}
        required/>
      </Form.Group>
      </Row>      
      <Button variant="primary" type="submit">
        Confirm Booking
      </Button>
    </Form>
    </Container>
      </Container>
    </div>
  )
}

export default Booking