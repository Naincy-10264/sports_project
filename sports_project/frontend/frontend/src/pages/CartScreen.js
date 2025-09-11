import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { removeFromCart } from '../actions/cartActions'; // It's better to use an action creator here

const CartScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Import useNavigate hook
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id)); // Dispatch the action creator
  };

  const checkoutHandler = () => {
    navigate('/login?redirect=/shipping'); // Redirect to login or shipping
  };

  return (
    <div>
      <h1>Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <div>
          Your cart is empty <Link to='/'>Go Back</Link>
        </div>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div key={item.product}>
              <div>
                <img src={item.image} alt={item.name} />
              </div>
              <div>
                <Link to={`/product/${item.product}`}>{item.name}</Link>
              </div>
              {/* Display quantity and price per item */}
              <div>Qty: {item.qty}</div>
              <div>Price: ${item.price}</div>
              <div>
                <button onClick={() => removeFromCartHandler(item.product)}>
                  Remove
                </button>
              </div>
            </div>
          ))}
          <div>
            <h2>
              Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items
            </h2>
            {/* Correctly calculate total price with quantity */}
            <h3>
              Total Price: $
              {cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
            </h3>
            <button onClick={checkoutHandler} disabled={cartItems.length === 0}>
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartScreen;