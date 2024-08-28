import React, { useContext, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/esm/Container';
import { useNavigate } from 'react-router-dom';
import api from '../../api';
import { UserContext } from '../context/UserContext';
import toast from 'react-hot-toast';


const SignIn = () => {
  const navigate = useNavigate();
  const { login } = useContext(UserContext)
 
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
      const data = response.data
      if(data){
        login(response.data)
        
        navigate('/home')
      }
      toast.success('user logged in successful')
      console.log(data)
    } catch (error) {
      console.log(error)
      toast.error('Failed to sign in. Please check your credentials.');
    } 
  }
 
  return (
    <>
    <h1 className='text-center mt-5'>SIGN IN HERE</h1>
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
    <p className='text-center'>New user <a href="/signup" className='text-white'>Click here</a> </p>
    </>
  )
}

export default SignIn