import React, { useEffect, useState } from 'react'
import dropin from 'braintree-web-drop-in'

import api from '../../api';
import { Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';


const Checkout = () => {
  const [clientToken, setClientToken] = useState(null);
  const [instance, setInstance] = useState(null);
  const [totalPrice, setTotalPrice] = useState(null);
  const [receipt , setReceipt] = useState(null);
  const [isPaid, setIsPaid] = useState(false);

  const navigate = useNavigate()

  useEffect(() =>{
    const fetchClientToken = async() =>{
      try {
        const response = await api.get('/clientToken');
        setClientToken(response.data.clientToken);
      } catch (error) {
          console.log('Error fetching booking details:', error.response?.data || error.message); 
      }
    };
    fetchClientToken()
  },[]);

  useEffect(()=>{
    if(clientToken) {
        dropin.create({
          authorization : clientToken,
          container: '#dropin-container'
        }, (err, dropinInstance) =>{
          if(err) {
            console.log(err);
            return;
          }
          setInstance(dropinInstance)
          console.log(dropinInstance)
        });
      }
  }, [clientToken]);

  useEffect(() => {
    const storedTotalPrice = localStorage.getItem('totalPrice');
    if (storedTotalPrice) {
      setTotalPrice(storedTotalPrice);
    }
    const paymentStatus = localStorage.getItem('isPaid');
    if(paymentStatus === 'true'){
      setIsPaid(true)
    }
  }, []);
  //handlepayment
  const handlePayment = async () =>{
    if(instance) {
      try {
        const { nonce } = await instance.requestPaymentMethod();
        const totalPrice = localStorage.getItem('totalPrice');
        const response = await api.post('/payment/process', {
          paymentMethodNonce : nonce,
          amount : totalPrice
        });

        const receiptData = {
          message : response.data.message,
          transactionId : response.data.transaction.id,
          amountPaid : response.data.transaction.amount,
          date : response.data.transaction.createdAt
        };
        setReceipt(receiptData);
        setIsPaid(true);
        localStorage.setItem('isPaid', 'true')
        alert('payment successfull')
        
      } catch (error) {
        console.log(error);
        alert('payment failed')      
      }
    }
  };

  const handleBookingRedirect = ()=>{
    navigate('/allBooking')
  }
  return (
    <>
    <Container>
    <p>Total Amount: ₹{totalPrice}</p> 
    {!isPaid && (
      <>
      <div id='dropin-container'></div>
      <Button onClick={handlePayment}>Pay</Button>
      </>
    )}
      {receipt && (
        <div className="receipt">
          <p>{receipt.message}</p>
          <h3>Payment Receipt</h3>
          <p>Transaction ID: {receipt.transactionId}</p>
          <p>Amount Paid: ₹{receipt.amountPaid}</p>
          <p>Date: {new Date(receipt.date).toLocaleString()}</p>
        </div>
      )}

      {isPaid && (
        <Button onClick={handleBookingRedirect}>Got to bookings</Button>
      )}
    </Container>
    </>
  )
}

export default Checkout