import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import api from '../../api';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { CarContext } from '../context/CarContext';

const Home = () => {
  const [cars, setCar] = useState([]);
  const { setSelectedCarId } = useContext(CarContext);
  const navigate = useNavigate();

  useEffect(()=>{
    const fetchCar = async()=>{
      const response = await api.get('/cars')
      setCar(response.data.cars)
      console.log(response.data.cars)
    }
    fetchCar()
  },[])
  
  const HandleSelectCar = (carId)=>{
    setSelectedCarId(carId)
    localStorage.setItem('selectedCarId', carId )
    navigate('/booking')
    console.log(carId)
  }  
  return (
    <div>
      <h1>Select your car</h1>
      <Container>
        <Row>
      {
        cars.map((car)=>(
          <Col  key={car._id} md={4} sm={6} className="mb-4">
          <Card>
            <Card.Body>
              <Card.Title>{car.make}</Card.Title>
              <Card.Subtitle>{car.model}</Card.Subtitle>
              <Card.Img  src={car.image}/>
              <Card.Text>Allowed KM : {car.allowedKM}</Card.Text>
              <Card.Text>Gear Transmission : {car.gearTransmission}</Card.Text>
              <Card.Text>Km per day : {car.kmPerDay}</Card.Text>
              <Card.Text>price Per Day: {car.pricePerDay}</Card.Text>
              <Card.Text>Seater : {car.seater}</Card.Text>
              <Card.Text>Availability :{car.availability ? 'Available' : 'Not available'}</Card.Text>
              <Button onClick={()=>{HandleSelectCar(car._id)}}>Select</Button>
            </Card.Body>
          </Card>
          </Col>
        ))
        
      }
      </Row>
      </Container>
    </div>
  )
}

export default Home