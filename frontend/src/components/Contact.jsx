import { MDBCol, MDBContainer, MDBRow } from 'mdb-react-ui-kit'
import React from 'react'
import { Container } from 'react-bootstrap'

const Contact = () => {
  return (
    <>
    <MDBContainer className='py-5' >
        {/* <h1 className='text-center'>Contact Info</h1> */}
        <MDBRow>
            <MDBCol className='square border shadow me-2'>
            <h2 className='my-2 text-white'>Address</h2>
            <p className='my-2 text-white'>Karunagappally, Kollam,<br /> Kerala, India
            Pincode : 690519</p>
            </MDBCol >

            <MDBCol className='square border shadow me-2'>
            <h2 className='my-2 text-white'>Phone Number</h2>
            <p  className='my-2 text-white'> 9446113765 <br />
                9444756341</p>
            </MDBCol>

            <MDBCol className='square border shadow me-2'>
            <h2 className='my-2 text-white'>Email address</h2>
            <p  className='my-2 text-white'>wheelshub@gmail.com</p>
            </MDBCol>
            

        </MDBRow>
    </MDBContainer>
    </>
  )
}

export default Contact