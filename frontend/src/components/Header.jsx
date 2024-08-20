import React, { useContext } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { LinkContainer} from 'react-router-bootstrap'
import { UserContext } from '../context/UserContext';

const Header = () => {
  const { user, logout } = useContext(UserContext)
  return (
    <>
    <Container><p className='text-end'>{user ? user.username : "Guest"}</p></Container>
     <Navbar expand="lg" className="bg-success bg-gradient">
    
      <Container>
        <Navbar.Brand href="#home" className='text-white fs-2 fw-bold'>Wheels Hub</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {user ? (
              <>
              <LinkContainer to='/home'><Nav.Link >Home</Nav.Link></LinkContainer>
              <LinkContainer to='/about'><Nav.Link >About</Nav.Link></LinkContainer> 
              <LinkContainer to='/contact'><Nav.Link >Contact</Nav.Link></LinkContainer>
              <LinkContainer to='/allBooking'><Nav.Link>Bookings</Nav.Link></LinkContainer>

              {/* if user is admin */}
              {user.isAdmin && (
                <LinkContainer to='/admin'><Nav.Link>Admin Dashboard</Nav.Link></LinkContainer>
              )}
              <LinkContainer to='/signout'><Nav.Link onClick={logout}>Sign out</Nav.Link></LinkContainer>
              
              </>
            ) : (
              <>
                <LinkContainer to='/home'><Nav.Link >Home</Nav.Link></LinkContainer> 
                <LinkContainer to='/about'><Nav.Link >About</Nav.Link></LinkContainer> 
                <LinkContainer to='/contact'><Nav.Link >Contact</Nav.Link></LinkContainer> 
                <LinkContainer to='/signin'><Nav.Link >Sign in</Nav.Link></LinkContainer> 
                <LinkContainer to='/signup'><Nav.Link  >Sign up</Nav.Link></LinkContainer>            
              </>
            )}
          
                      
          </Nav>
        </Navbar.Collapse>
      </Container>
      
    </Navbar>
    </>
  )
}

export default Header