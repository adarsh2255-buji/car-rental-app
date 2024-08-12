import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { LinkContainer} from 'react-router-bootstrap'




const Header = () => {
  return (
    <>
     <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">Car rental</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
          <LinkContainer to='/home'><Nav.Link >Home</Nav.Link></LinkContainer> 
          <LinkContainer to='/about'><Nav.Link >About</Nav.Link></LinkContainer> 
          <LinkContainer to='/contact'><Nav.Link >Contact</Nav.Link></LinkContainer> 
          <LinkContainer to='/signin'><Nav.Link >Sign in</Nav.Link></LinkContainer> 
          <LinkContainer to='/signup'><Nav.Link >Sign up</Nav.Link></LinkContainer> 
            
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </>
  )
}

export default Header