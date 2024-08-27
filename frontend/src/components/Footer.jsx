import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon} from 'mdb-react-ui-kit'
import React from 'react'
import Nav from 'react-bootstrap/Nav';
import { LinkContainer } from 'react-router-bootstrap'

const Footer = () => {
  return (
    <>
   <MDBFooter className=' bg-primary bg-gradient text-white'>
      <section className='d-flex justify-content-center justify-content-lg-between p-4 border-bottom'>
        <div className='me-5 d-none d-lg-block'>
          <span>Get connected with us on social networks:</span>
        </div>

        <div>
          <a href='' className='me-4 text-reset'>
            <MDBIcon fab icon="facebook-f" />
          </a>
          <a href='' className='me-4 text-reset'>
            <MDBIcon fab icon="twitter" />
          </a>
          <a href='' className='me-4 text-reset'>
            <MDBIcon fab icon="google" />
          </a>
          <a href='' className='me-4 text-reset'>
            <MDBIcon fab icon="instagram" />
          </a>
          <a href='' className='me-4 text-reset'>
            <MDBIcon fab icon="linkedin" />
          </a>
          <a href='' className='me-4 text-reset'>
            <MDBIcon fab icon="github" />
          </a>
        </div>
      </section>

      <section className=''>
        <MDBContainer className='text-center text-md-start mt-5'>
          <MDBRow className='mt-3'>
            <MDBCol md="3" lg="4" xl="3" className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>
                <MDBIcon icon="gem" className="me-3" />
                WHEELS HUB
              </h6>
              <p>
              WheelsHub is your trusted partner for premium car rentals, offering a wide selection of vehicles to meet every need and budget. Whether you're planning a weekend getaway or need a reliable ride for your business trip, we provide top-notch service,
              competitive pricing, and a seamless booking experience. Our mission is to make your journey as smooth and enjoyable as possible
              </p>
            </MDBCol>

            <MDBCol md="2" lg="2" xl="2" className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Information</h6>
    
              <p><LinkContainer to='/aboutus'><Nav.Link>About</Nav.Link></LinkContainer></p>
              <p><LinkContainer to='/termsAndConditions'><Nav.Link>Terms and Conditions</Nav.Link></LinkContainer></p>
              <p><LinkContainer to='/privacyAndPolicy'><Nav.Link>Privacy & Cookies Policy</Nav.Link></LinkContainer></p>
            </MDBCol>

            <MDBCol md="3" lg="2" xl="2" className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Customer Support</h6>
              
              <p><LinkContainer to='/aboutus'><Nav.Link>FAQ</Nav.Link></LinkContainer></p>
              <p><LinkContainer to='/termsAndConditions'><Nav.Link>How it works ?</Nav.Link></LinkContainer></p>
              <p><LinkContainer to='/privacyAndPolicy'><Nav.Link>Contact Us</Nav.Link></LinkContainer></p>
            </MDBCol>

            <MDBCol md="4" lg="3" xl="3" className='mx-auto mb-md-0 mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Contact</h6>
              <p>
                <MDBIcon icon="home" className="me-2" />
                New York, NY 10012, US
              </p>
              <p>
                <MDBIcon icon="envelope" className="me-3" />
                wheelshub@gmail.com
              </p>
              <p>
                <MDBIcon icon="phone" className="me-3" /> + 01 234 567 88
              </p>
              <p>
                <MDBIcon icon="print" className="me-3" /> + 01 234 567 89
              </p>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>

      <div className='text-center p-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
        © 2021 Copyright:
        <a className='text-reset fw-bold' href='https://mdbootstrap.com/'>
          wheelshub.com
        </a>
      </div>
    </MDBFooter>
    </>
  )
}

export default Footer