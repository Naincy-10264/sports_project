// frontend/src/components/CheckoutSteps.js
import React from 'react';
import { Link } from 'react-router-dom';

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <div>
      <div>
        {step1 ? (
          <Link to="/login">Sign In</Link>
        ) : (
          <div>Sign In</div>
        )}
      </div>
      <div>
        {step2 ? (
          <Link to="/shipping">Shipping</Link>
        ) : (
          <div>Shipping</div>
        )}
      </div>
      <div>
        {step3 ? (
          <Link to="/payment">Payment</Link>
        ) : (
          <div>Payment</div>
        )}
      </div>
      <div>
        {step4 ? (
          <Link to="/placeorder">Place Order</Link>
        ) : (
          <div>Place Order</div>
        )}
      </div>
    </div>
  );
};

export default CheckoutSteps;