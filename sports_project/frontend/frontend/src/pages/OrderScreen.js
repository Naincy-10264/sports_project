// frontend/src/pages/OrderScreen.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { getOrderDetails, deliverOrder } from '../actions/orderActions'; // Import deliverOrder
import { ORDER_DELIVER_RESET } from '../constants/orderConstants'; // Import reset constant

const OrderScreen = () => {
    const { id: orderId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const orderDetails = useSelector((state) => state.orderDetails);
    const { order, loading, error } = orderDetails;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const orderDeliver = useSelector((state) => state.orderDeliver);
    const { loading: loadingDeliver, success: successDeliver } = orderDeliver;

    useEffect(() => {
        if (!userInfo) {
            navigate('/login');
        }

        if (!order || order._id !== orderId || successDeliver) {
            dispatch({ type: ORDER_DELIVER_RESET });
            dispatch(getOrderDetails(orderId));
        }
    }, [dispatch, navigate, userInfo, orderId, order, successDeliver]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!order) return <div>Order not found.</div>;

    const deliverHandler = () => {
        dispatch(deliverOrder(orderId));
    };

    return (
        <div>
            <h1>Order {order._id}</h1>
            <div>
                <h2>Shipping</h2>
                <p>Address: {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.postalCode}, {order.shippingAddress.country}</p>
            </div>
            <div>
                <h2>Payment Method</h2>
                <p>Method: {order.paymentMethod}</p>
            </div>
            <div>
                <h2>Order Items</h2>
                {order.orderItems.length === 0 ? (
                    <p>Order is empty</p>
                ) : (
                    <div>
                        {order.orderItems.map((item) => (
                            <div key={item.product}>
                                <p>{item.name} | {item.qty} x ${item.price} = ${item.qty * item.price}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <div>
                <h2>Order Summary</h2>
                <p>Total Price: ${order.totalPrice}</p>
                <p>Status: {order.isDelivered ? `Delivered on ${order.deliveredAt.substring(0, 10)}` : 'Not Delivered'}</p>

                {/* Admin button to mark as delivered */}
                {userInfo && userInfo.isAdmin && !order.isDelivered && (
                    <button onClick={deliverHandler} disabled={loadingDeliver}>
                        {loadingDeliver ? 'Loading...' : 'Mark As Delivered'}
                    </button>
                )}
            </div>
        </div>
    );
};

export default OrderScreen;