// frontend/src/pages/OrderListScreen.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { listOrders } from '../actions/orderActions';

const OrderListScreen = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const orderList = useSelector((state) => state.orderList);
    const { orders, loading, error } = orderList;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(listOrders());
        } else {
            navigate('/login');
        }
    }, [dispatch, navigate, userInfo]);

    const viewDetailsHandler = (id) => {
        navigate(`/order/${id}`);
    };

    return (
        <div>
            <h1>Orders</h1>
            {loading ? (
                <div>Loading...</div>
            ) : error ? (
                <div>Error: {error}</div>
            ) : (
                <div>
                    {orders.length === 0 ? (
                        <p>No orders found.</p>
                    ) : (
                        <div>
                            {orders.map((order) => (
                                <div key={order._id}>
                                    <p>ID: {order._id}</p>
                                    <p>User: {order.user && order.user.name}</p>
                                    <p>Total: ${order.totalPrice}</p>
                                    <p>Paid: {order.isPaid ? 'Yes' : 'No'}</p>
                                    <p>Delivered: {order.isDelivered ? 'Yes' : 'No'}</p>
                                    <button onClick={() => viewDetailsHandler(order._id)}>View Details</button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default OrderListScreen;