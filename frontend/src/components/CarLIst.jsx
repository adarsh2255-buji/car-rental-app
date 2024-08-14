import React, { useEffect, useState } from 'react'
import api from '../../api';
import { Button, Card, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const CarLIst = () => {
    const [cars, setCars] = useState([]);
    const bookingDate = JSON.parse(localStorage.getItem('bookingDate'));

    const navigate = useNavigate();
    useEffect(() =>{
        const fetchCar = async() => {
            const response = await api.get('/cars',{
                params: {
                    pickUpLocation : bookingDate.pickUpLocation,
                    pickUpDateAndTime: bookingDate.pickUpDateAndTime
                },
            });
            setCars(response.data.cars)
        };
        fetchCar()
    }, [bookingDate])

    const handleCarSelect = (car) =>{
        localStorage.setItem('selelctCar', JSON.stringify(car));
        navigate('/confirmBooking')
    }
  return (
    <div>
        <Container>
        <h1>Select your car</h1>
        {
            cars.map((car)=>(
                <Card key={car._id} >
                    <Card.Body>
                        <Card.Title>{car.make}</Card.Title>
                        <Card.Subtitle>{car.model}</Card.Subtitle>
                        <Card.Img src={car.image}/>
                        <Card.Text>Allowed KM : {car.allowedKM}</Card.Text>
                        <Card.Text>Gear Transmission : {car.gearTransmission}</Card.Text>
                        <Card.Text>Km per day : {car.kmPerDay}</Card.Text>
                        <Card.Text>price Per Day: {car.pricePerDay}</Card.Text>
                        <Card.Text>seater : {car.seater}</Card.Text>
                        <Button onClick={()=> handleCarSelect(car)}>Select</Button>
                    </Card.Body>
                </Card>
            
            ))
        }
        </Container>
    </div>
  )
}

export default CarLIst