import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import api from '../../api';
import { Button, Card, Col, Container, Row, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { CarContext } from '../context/CarContext';
import styles from '../styles/Home.module.css'
import { UserContext } from '../context/UserContext';
import toast from 'react-hot-toast';

const Home = () => {
  const [cars, setCar] = useState([]);
  const { setSelectedCarId } = useContext(CarContext);

  const { user } = useContext(UserContext)
  const navigate = useNavigate();

  useEffect(()=>{
    const fetchCar = async()=>{
      const response = await api.get('/cars')
      setCar(response.data.cars)
    }
    fetchCar()
  },[])
  
  const handleSelectCar = (carId)=>{
    setSelectedCarId(carId)
    localStorage.setItem('selectedCarId', carId )
    navigate('/booking')
  } 

  //handle car availability
  const handleMakeAvailable = async (carId) => {
    const token = localStorage.getItem('token');
    try {
      const response = await api.patch('/updateCarAvailability', 
      { carId, availability: true }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setCar(cars.map(car => car._id === carId ? { ...car, availability: true } : car));
    } catch (error) {
      console.log('Error updating car availability:', error.response?.data || error.message);
    }
  };

  //handle delete car
  const handleDeleteCar = async (carId) => {
    const token = localStorage.getItem('token');
    try {
      await api.delete(`/deleteCar/${carId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      toast.success('Car deleted successfully');
      setCar(cars.filter((car) => car._id !== carId));
    } catch (error) {
      console.error('Error deleting car:', error.response?.data || error.message);
    }
  };

  const renderTooltip = (message) => (
    <Tooltip id="button-tooltip">
      {message}
    </Tooltip>
  );

  return (
    <div>
      <h1 className='text-center'>SELECT YOUR CAR</h1>
      <Container>
        <Row>
          {cars.map((car) => (
            <Col key={car._id} md={4} sm={6} className="mb-4">
              <Card className='shadow' style={{ background: 'transparent' }}>
                <Card.Body>
                  <Card.Img src={car.image} alt={`${car.make} ${car.model}`} />
                  <Card.Title className='text-white'>{car.make}</Card.Title>
                  {user && user.isAdmin ? (
                    <>
                      <Card.Subtitle className='text-white'>{car.model}</Card.Subtitle>
                      <Card.Text className='text-white'>
                        Availability: {car.availability ? 'Available' : 'Not Available'}
                      </Card.Text>
                      {!car.availability && (
                        <Button onClick={() => handleMakeAvailable(car._id)}>Make Available</Button>
                      )}
                      <Button variant="danger" className='mx-2' onClick={() => handleDeleteCar(car._id) }>Delete</Button>
                    </>
                  ) : (
                    <>
                      <Card.Subtitle className='text-white'>{car.model}</Card.Subtitle>
                      <Card.Text className='text-white'>Gear Transmission: {car.gearTransmission}</Card.Text>
                      <Card.Text className='text-white'>Km per day: {car.kmPerDay}</Card.Text>
                      <Card.Text className='text-white'>Price Per Day: {car.pricePerDay}</Card.Text>
                      <Card.Text className='text-white'>Seater: {car.seater}</Card.Text>
                      <Card.Text className='text-white'>
                        {user && (
                          <Card.Text className='text-white'>
                            Availability: {car.availability ? 'Available' : 'Not available'}
                          </Card.Text>
                        )}
                      </Card.Text>
                      <OverlayTrigger
                        placement="top"
                        overlay={renderTooltip(car.availability ? '' : 'This car is not available')}>
                        <span className="d-inline-block">
                          <Button 
                            onClick={() => handleSelectCar(car._id)} 
                            disabled={!car.availability}  // Disable button if car is not available
                            style={{ pointerEvents: car.availability ? 'auto' : 'none' }}  // Disable hover interaction when disabled
                          >
                            Select
                          </Button>
                        </span>
                      </OverlayTrigger>
                    </>
                  )}
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  )
}

export default Home;
