import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/esm/Container';
import { useNavigate } from 'react-router-dom';
import api from '../../api';

const SignIn = () => {
  const navigate = useNavigate();
 
  const [ signInData, setSignInData ] = useState({
    email : "",
    password : "",
  })

  const handleChange = (e) =>{
    setSignInData({...signInData, [e.target.name] : e.target.value})
      
  }

  const submitHandler = async(e) =>{
    e.preventDefault();
    try {
      const response = await api.post('/signin', signInData);
      navigate('/home')
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }
 
  return (
    <>
    <h1 className='text-center mt-5'>LOG IN HERE</h1>
    <Container className='d-flex justify-content-center align-items-center'>
    <Form onSubmit={submitHandler}>
     
      <Form.Group className="mb-3">
        <Form.Label>Email</Form.Label>
        <Form.Control type="text" placeholder="email"
        name='email'
        value={signInData.email}
        onChange={handleChange}
        required/>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="password" 
        name='password'
        value={signInData.password}
        onChange={handleChange}
        required />
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
    </Container>
    </>
  )
}

export default SignIn