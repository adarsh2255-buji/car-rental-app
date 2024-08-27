import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import api from '../../api';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { CarContext } from '../context/CarContext';
import styles from '../styles/Home.module.css'

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
    <div className={styles.home}>
      <h1 className='text-center'>SELECT YOUR CAR</h1>
      <Container>
        <Row>
      {
        cars.map((car)=>(
          <Col  key={car._id} md={4} sm={6} className="mb-4">
          <Card className='shadow' style={{ background: 'transparent' }}>
            <Card.Body >
              <Card.Title className='text-white'>{car.make}</Card.Title>
              <Card.Subtitle className='text-white'>{car.model}</Card.Subtitle>
              <Card.Img  src={car.image} alt={`${car.make} ${car.model}`}/>
              {/* <Card.Text>Allowed KM : {car.allowedKM}</Card.Text> */}
              <Card.Text className='text-white'>Gear Transmission : {car.gearTransmission}</Card.Text>
              <Card.Text className='text-white'>Km per day : {car.kmPerDay}</Card.Text>
              <Card.Text className='text-white'>Price Per Day: {car.pricePerDay}</Card.Text>
              <Card.Text className='text-white'>Seater : {car.seater}</Card.Text>
              <Card.Text className='text-white'>Availability :{car.availability ? 'Available' : 'Not available'}</Card.Text>
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