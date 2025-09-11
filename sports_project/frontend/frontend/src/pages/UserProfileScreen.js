import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUserDetails, updateUserProfile } from '../actions/userActions';
import { listMyOrders } from '../actions/orderActions';

const UserProfileScreen = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userDetails = useSelector((state) => state.userDetails);
    const { user, loading, error } = userDetails;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    
    const myOrderList = useSelector((state) => state.orderListMy);
    const { loading: loadingOrders, error: errorOrders, orders } = myOrderList;

    useEffect(() => {
        if (!userInfo) {
            navigate('/login');
        } else {
            if (!user || !user.name) {
                dispatch(getUserDetails('profile'));
                dispatch(listMyOrders());
            } else {
                setName(user.name);
                setEmail(user.email);
            }
        }
    }, [dispatch, navigate, userInfo, user]);

    const submitHandler = (e) => {
        e.preventDefault();
        // Dispatch updateUserProfile action to update user info
        // You'll need to create this action in userActions.js
        // dispatch(updateUserProfile({ id: user._id, name, email, password }));
    };

    return (
        <div>
            <h2>User Profile</h2>
            {/* User Details Form */}
            <form onSubmit={submitHandler}>
                <div>
                    <label>Name</label>
                    <input type="text" placeholder="Enter name" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div>
                    <label>Email Address</label>
                    <input type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button type="submit">Update</button>
            </form>
            
            {/* User Orders Table */}
            <div>
                <h2>My Orders</h2>
                {loadingOrders ? (
                    <div>Loading Orders...</div>
                ) : errorOrders ? (
                    <div>{errorOrders}</div>
                ) : (
                    <div>
                        {orders && orders.length === 0 ? (
                            <p>No orders found.</p>
                        ) : (
                            orders && orders.map((order) => (
                                <div key={order._id}>
                                    <h3>Order ID: {order._id}</h3>
                                    <p><strong>Total Price:</strong> ${order.totalPrice}</p>
                                    <p><strong>Status:</strong> {order.isDelivered ? 'Delivered' : 'Not Delivered'}</p>
                                    
                                    <h4>Order Items</h4>
                                    <ul>
                                        {order.orderItems.map((item) => (
                                            <li key={item._id}>
                                                <p><strong>Product:</strong> {item.name}</p>
                                                <p><strong>Quantity:</strong> {item.qty}</p>
                                                <p><strong>Price:</strong> ${item.price}</p>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserProfileScreen;