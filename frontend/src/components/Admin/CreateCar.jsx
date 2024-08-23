import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import api from '../../../api';


const CreateCar = () => {
  const [formData, setFormData] = useState({
    make: '',
    model: '',
    image: '',
    fuelType: '',
    gearTransmission: '',
    kmPerDay: '',
    seater: '',
    pricePerDay: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0]
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      const formDataWithImage = new FormData();
      Object.keys(formData).forEach(key => {
        formDataWithImage.append(key, formData[key]);
      });

      const response = await api.post('/createCar', formDataWithImage, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      });

      console.log(response.data.message);
      // Reset form after successful submission
      setFormData({
        make: '',
        model: '',
        image: '',
        fuelType: '',
        gearTransmission: '',
        kmPerDay: '',
        seater: '',
        pricePerDay: ''
      });
    } catch (error) {
      console.error("Error creating car:", error.response?.data || error.message);
    }
  };

  return (
    <Container>
      <h2>Create a New Car</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formMake">
          <Form.Label>Make</Form.Label>
          <Form.Control
            type="text"
            name="make"
            value={formData.make}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formModel">
          <Form.Label>Model</Form.Label>
          <Form.Control
            type="text"
            name="model"
            value={formData.model}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formImage">
          <Form.Label>Image</Form.Label>
          <Form.Control
            type="file"
            name="image"
            onChange={handleFileChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formFuelType">
          <Form.Label>Fuel Type</Form.Label>
          <Form.Control
            type="text"
            name="fuelType"
            value={formData.fuelType}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formGearTransmission">
          <Form.Label>Gear Transmission</Form.Label>
          <Form.Control
            type="text"
            name="gearTransmission"
            value={formData.gearTransmission}
            onChange={handleChange}
            required
          />
        </Form.Group>
        
        <Form.Group controlId="formKMPerDay">
          <Form.Label>KM Per Day</Form.Label>
          <Form.Control
            type="number"
            name="kmPerDay"
            value={formData.kmPerDay}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formSeater">
          <Form.Label>Seater</Form.Label>
          <Form.Control
            type="number"
            name="seater"
            value={formData.seater}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formPricePerDay">
          <Form.Label>Price Per Day</Form.Label>
          <Form.Control
            type="number"
            name="pricePerDay"
            value={formData.pricePerDay}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Create Car
        </Button>
      </Form>
    </Container>
  );
};

export default CreateCar;
