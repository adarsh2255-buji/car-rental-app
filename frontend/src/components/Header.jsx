import React, { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { LinkContainer } from 'react-router-bootstrap';
import { UserContext } from '../context/UserContext';
import { Dropdown } from 'react-bootstrap';
import styles from '../styles/Header.module.css';


const Header = () => {
  const { user, logout } = useContext(UserContext);

  return (
    <>
      <Container>
        <p
          className='text-end'
          style={{
            fontSize: '23px',
            fontWeight: '600',
            textTransform: 'uppercase',
            fontFamily: 'initial'
          }}
        >
          {user ? user.username : "Guest"}
        </p>
      </Container>
      <Navbar expand="lg" className='bg-primary bg-gradient shadow' style={{ marginTop: '-1rem' }}>
        <Container>
          <Navbar.Brand href="#home" className='text-white fs-2 fw-bold' style={{ fontFamily: "cursive" }}>
            Wheels Hub
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {user ? (
                <>
                  <LinkContainer to='/home'>
                    <Nav.Link className={styles.navLink}>Home</Nav.Link>
                  </LinkContainer>
                  {/* user is an admin */}
                  {user.isAdmin ? (
                    <Dropdown>
                      <Dropdown.Toggle>
                        Admin Dashboard
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <LinkContainer to='/admin'>
                          <Dropdown.Item>Add Car</Dropdown.Item>
                        </LinkContainer>
                        <LinkContainer to='/allBookings'>
                          <Dropdown.Item>All Bookings</Dropdown.Item>
                        </LinkContainer>
                        <LinkContainer to='/allUsers'>
                          <Dropdown.Item>All Users</Dropdown.Item>
                        </LinkContainer>
                      </Dropdown.Menu>
                    </Dropdown>
                  ) : (
                    <>
                      <LinkContainer to='/aboutus'>
                        <Nav.Link className={styles.navLink}>About</Nav.Link>
                      </LinkContainer>
                      <LinkContainer to='/contact'>
                        <Nav.Link className={styles.navLink}>Contact</Nav.Link>
                      </LinkContainer>
                      <LinkContainer to='/allBooking'>
                        <Nav.Link className={styles.navLink}>Bookings</Nav.Link>
                      </LinkContainer>
                    </>
                  )}
                  <LinkContainer to='/signout'>
                    <Nav.Link onClick={logout} className='text-white'>Sign out</Nav.Link>
                  </LinkContainer>
                </>
              ) : (
                <>
                  <LinkContainer to='/home'>
                    <Nav.Link className={styles.navLink}>Home</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to='/aboutus'>
                    <Nav.Link className={styles.navLink}>About</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to='/contact'>
                    <Nav.Link className={styles.navLink}>Contact</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to='/signin'>
                    <Nav.Link className={styles.navLink}>Sign in</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to='/signup'>
                    <Nav.Link className={styles.navLink}>Sign up</Nav.Link>
                  </LinkContainer>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
