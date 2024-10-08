import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/esm/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row'
import api from '../../api';
import { useNavigate } from 'react-router-dom';

import toast, {Toaster} from 'react-hot-toast';

const SignUp = () => {
  const navigate = useNavigate();
 
  const [ userData, setUserData ] = useState({
    username : "",
    email : "",
    password : "",
    phone : "",
    address : "",
  })

  const handleChange = (e) =>{
    setUserData({...userData, [e.target.name] : e.target.value})
      
  }
  const submitHandler = async(e) =>{
    e.preventDefault();
    try {
      const response = await api.post('/signup', userData);
      toast.success('user registration successful')
      navigate('/signin')
   
    } catch (error) {
      console.log(error)
    }
  }
  
  return (
    <>
    <h1 className='text-center mt-5'>NEW CUSTOMER REGISTER HERE</h1>
    <Container className='d-flex justify-content-center align-items-center'>
    <Form onSubmit={submitHandler}>
      <Row className="mb-3">
      <Form.Group as={Col}>
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" placeholder="Name"
        name='username'
        value={userData.username}
        onChange={handleChange}
        required/>
      </Form.Group>

      <Form.Group as={Col}>
        <Form.Label>Address</Form.Label>
        <Form.Control type="text" placeholder="Address" 
        name='address'
        value={userData.address}
        onChange={handleChange}
        required />
      </Form.Group>
      </Row>

      <Row className='mb-3'>
      <Form.Group as={Col}>
        <Form.Label>Phone</Form.Label>
        <Form.Control type="text" placeholder="Phone"
        name='phone'
        value={userData.phone}
        onChange={handleChange}
        required/>
      </Form.Group>
      
      <Form.Group as={Col}>
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email"
        name='email' 
        value={userData.email}
        onChange={handleChange}
        required/>
      </Form.Group>
      </Row>
      

      <Form.Group className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password"
        name='password' 
        value={userData.password}
        onChange={handleChange}
        required />
      </Form.Group>
      
      
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
    </Container>
    <p className='text-center'>Already have account <a href="/signin" className='text-white'>Click here</a> </p>  
    </>
  )
}

export default SignUp