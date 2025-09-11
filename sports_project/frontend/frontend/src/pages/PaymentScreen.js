// frontend/src/pages/PaymentScreen.js (Modified)
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { savePaymentMethod } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';

const PaymentScreen = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  if (!shippingAddress) {
    navigate('/shipping');
  }

  const [paymentMethod, setPaymentMethod] = useState('PayPal'); // Default to PayPal

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate('/placeorder');
  };

  return (
    <div>
      <CheckoutSteps step1 step2 step3 />
      <h1>Payment Method</h1>
      <form onSubmit={submitHandler}>
        <div>
          <input
            type="radio"
            id="PayPal"
            name="paymentMethod"
            value="PayPal"
            checked={paymentMethod === 'PayPal'}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          <label htmlFor="PayPal">PayPal or Credit Card</label>
        </div>
        <div>
          <input
            type="radio"
            id="CashOnDelivery"
            name="paymentMethod"
            value="CashOnDelivery"
            checked={paymentMethod === 'CashOnDelivery'}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          <label htmlFor="CashOnDelivery">Cash On Delivery</label>
        </div>
        <div>
          <input
            type="radio"
            id="UPI"
            name="paymentMethod"
            value="UPI"
            checked={paymentMethod === 'UPI'}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          <label htmlFor="UPI">UPI</label>
          {paymentMethod === 'UPI' && (
            <p>Total Amount: ${cart.totalPrice}</p>
          )}
        </div>
        <button type="submit">Continue</button>
      </form>
    </div>
  );
};

export default PaymentScreen;