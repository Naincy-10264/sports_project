import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createOrder } from '../actions/orderActions';
import CheckoutSteps from '../components/CheckoutSteps';

const PlaceOrderScreen = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cart = useSelector((state) => state.cart);

    const addDecimals = (num) => {
        return (Math.round(num * 100) / 100).toFixed(2);
    };

    cart.itemsPrice = addDecimals(
        cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    );
    cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 10);
    cart.taxPrice = addDecimals(Number((0.15 * cart.itemsPrice).toFixed(2)));
    cart.totalPrice = (
        Number(cart.itemsPrice) +
        Number(cart.shippingPrice) +
        Number(cart.taxPrice)
    ).toFixed(2);

    const orderCreate = useSelector((state) => state.orderCreate);
    const { order, success, error } = orderCreate;

    useEffect(() => {
        if (success) {
            navigate(`/order/${order._id}`);
        }
    }, [navigate, success, order]);

    const placeOrderHandler = () => {
        dispatch(
            createOrder({
                orderItems: cart.cartItems,
                shippingAddress: cart.shippingAddress,
                paymentMethod: cart.paymentMethod,
                itemsPrice: cart.itemsPrice,
                shippingPrice: cart.shippingPrice,
                taxPrice: cart.taxPrice,
                totalPrice: cart.totalPrice,
            })
        );
    };

    return (
        <div>
            <CheckoutSteps step1 step2 step3 step4 />
            <div>
                <h2>Shipping</h2>
                <p>
                    Address: {cart.shippingAddress.address}, {cart.shippingAddress.city},{' '}
                    {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}
                </p>
            </div>
            <div>
                <h2>Payment Method</h2>
                <p>Method: {cart.paymentMethod}</p>
                {/* Conditional message based on payment method */}
                {cart.paymentMethod === 'CashOnDelivery' && (
                    <p>Your order will be placed, and you will pay upon delivery.</p>
                )}
                {cart.paymentMethod === 'UPI' && (
                    <p>Total amount to pay via UPI: ${cart.totalPrice}</p>
                )}
            </div>
            <div>
                <h2>Order Items</h2>
                {cart.cartItems.length === 0 ? (
                    <p>Your cart is empty</p>
                ) : (
                    <div>
                        {cart.cartItems.map((item) => (
                            <div key={item.product}>
                                <p>
                                    {item.name} | {item.qty} x ${item.price} = ${item.qty * item.price}
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <div>
                <h2>Order Summary</h2>
                <div>
                    <p>Items: ${cart.itemsPrice}</p>
                </div>
                <div>
                    <p>Shipping: ${cart.shippingPrice}</p>
                </div>
                <div>
                    <p>Tax: ${cart.taxPrice}</p>
                </div>
                <div>
                    <p>Total: ${cart.totalPrice}</p>
                </div>
                {error && <div>{error}</div>}
                <button
                    type="button"
                    onClick={placeOrderHandler}
                    disabled={cart.cartItems.length === 0}
                >
                    Place Order
                </button>
            </div>
        </div>
    );
};

export default PlaceOrderScreen;